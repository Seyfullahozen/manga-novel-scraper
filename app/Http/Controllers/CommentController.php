<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\CommentNotification;
use App\Models\CommentReaction;
use App\Models\ContentReaction;
use App\Models\Novel;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\Manga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\ContentInteractionService;

class CommentController extends Controller
{
    public function __construct(
        private ContentInteractionService $contentInteractionService,
    ) {
    }

    public function store(Request $request)
    {
        $request->validate([
            'body'             => ['required', 'string', 'max:2000'],
            'commentable_type' => ['required', 'in:novel,manga,chapter,novel_chapter'],
            'commentable_id'   => ['required', 'integer'],
            'parent_id'        => ['nullable', 'integer', 'exists:comments,id'],
        ]);

        $type = match ($request->commentable_type) {
            'manga' => \App\Models\Manga::class,
            'novel' => \App\Models\Novel::class,
            'chapter' => \App\Models\Chapter::class,
            'novel_chapter' => \App\Models\NovelChapter::class,
            default => abort(422, 'Geçersiz commentable type'),
        };
        $model = $type::findOrFail($request->commentable_id);

        // parent varsa doğrula
        $parent = null;
        if ($request->parent_id) {
            $parent = Comment::findOrFail($request->parent_id);
            abort_if(
                $parent->commentable_type !== $type || $parent->commentable_id != $model->id,
                422, 'Geçersiz yanıt.'
            );

            // Engelleme kontrolü — parent sahibi beni engellediyse reply yapamam
            $isBlocked = DB::table('user_blocks')
                ->where('blocker_id', $parent->user_id)
                ->where('blocked_id', Auth::id())
                ->exists();
            abort_if($isBlocked, 403, 'Bu kullanıcı sizi engellediği için yanıt veremezsiniz.');
        }

        $comment = Comment::create([
            'user_id'          => Auth::id(),
            'commentable_type' => $type,
            'commentable_id'   => $model->id,
            'parent_id'        => $request->parent_id,
            'body'             => $request->body,
        ]);

        // @mention bildirimleri — body'de geçen @username'leri bul
        preg_match_all('/@([a-zA-Z0-9_]+)/', $comment->body, $matches);
        if (!empty($matches[1])) {
            $mentionedUsernames = array_unique($matches[1]);
            $mentionedUsers = User::whereIn('username', $mentionedUsernames)
                ->where('id', '!=', Auth::id()) // kendin değil
                ->pluck('id');

            foreach ($mentionedUsers as $mentionedUserId) {
                // Parent sahibine zaten reply bildirimi gidecekse mention gönderme
                if ($parent && $parent->user_id === $mentionedUserId) continue;

                // Etiketlenen kişi beni engellediyse bildirim gönderme
                $isMentionBlocked = DB::table('user_blocks')
                    ->where('blocker_id', $mentionedUserId)
                    ->where('blocked_id', Auth::id())
                    ->exists();
                if ($isMentionBlocked) continue;

                CommentNotification::notify(
                    userId:    $mentionedUserId,
                    actorId:   Auth::id(),
                    commentId: $comment->id,
                    type:      'mention',
                    replyId:   null,
                );
            }
        }

        // Yanıt bildirimi — parent yorum sahibine
        if ($parent) {
            Log::debug('[Comment] reply notification', [
                'to'         => $parent->user_id,
                'from'       => Auth::id(),
                'comment_id' => $parent->id,
                'reply_id'   => $comment->id,
            ]);
            CommentNotification::notify(
                userId:    $parent->user_id,
                actorId:   Auth::id(),
                commentId: $parent->id,
                type:      'reply',
                replyId:   $comment->id,
            );
        }

        $comment->load('user', 'reactions');

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'comment' => $this->formatComment($comment),
            ]);
        }

        return back();
    }

    public function destroy(Comment $comment)
    {
        abort_if($comment->user_id !== Auth::id(), 403);
        $comment->delete();
        return response()->json(['success' => true]);
    }

    public function react(Request $request, Comment $comment)
    {
        $request->validate(['type' => ['required', 'in:like,dislike']]);

        $commentOwnerId = $comment->user_id;

        Log::debug('[Comment] react', [
            'comment_id'      => $comment->id,
            'comment_owner'   => $commentOwnerId,
            'actor'           => Auth::id(),
            'type'            => $request->type,
        ]);

        $existing = CommentReaction::where('user_id', Auth::id())
            ->where('comment_id', $comment->id)
            ->first();

        if ($existing) {
            if ($existing->type === $request->type) {
                $existing->delete();
                CommentNotification::where('user_id', $commentOwnerId)
                    ->where('actor_id', Auth::id())
                    ->where('comment_id', $comment->id)
                    ->where('type', $request->type)
                    ->delete();
                $userReaction = null;
            } else {
                CommentNotification::where('user_id', $commentOwnerId)
                    ->where('actor_id', Auth::id())
                    ->where('comment_id', $comment->id)
                    ->whereIn('type', ['like', 'dislike'])
                    ->delete();
                $existing->update(['type' => $request->type]);
                $userReaction = $request->type;
                CommentNotification::notify($commentOwnerId, Auth::id(), $comment->id, $request->type);
            }
        } else {
            CommentReaction::create([
                'user_id'    => Auth::id(),
                'comment_id' => $comment->id,
                'type'       => $request->type,
            ]);
            $userReaction = $request->type;
            CommentNotification::notify($commentOwnerId, Auth::id(), $comment->id, $request->type);
        }

        $comment->load('reactions');

        return response()->json([
            'likes'    => $comment->likesCount(),
            'dislikes' => $comment->dislikesCount(),
            'yours'    => $userReaction,
        ]);
    }

    public function contentReact(Request $request)
    {
        $request->validate([
            'type'           => ['required', 'in:love,super,sad,shocked,angry'],
            'reactable_type' => ['required', 'in:novel,manga'],
            'reactable_id'   => ['required', 'integer'],
        ]);

        $type = $request->reactable_type === 'novel' ? Novel::class : Manga::class;
        $model = $type::findOrFail($request->reactable_id);

        $existing = ContentReaction::where('user_id', Auth::id())
            ->where('reactable_type', $type)
            ->where('reactable_id', $request->reactable_id)
            ->first();

        if ($existing) {
            if ($existing->type === $request->type) {
                $existing->delete();
                $userReaction = null;
            } else {
                $existing->update(['type' => $request->type]);
                $userReaction = $request->type;
            }
        } else {
            ContentReaction::create([
                'user_id'        => Auth::id(),
                'reactable_type' => $type,
                'reactable_id'   => $request->reactable_id,
                'type'           => $request->type,
            ]);
            $userReaction = $request->type;
        }

        $counts = $this->contentInteractionService->reactionSummaryFor($model);

        return response()->json([
            'counts' => $counts,
            'yours'  => $userReaction,
        ]);
    }

    public function myComments()
    {
        $comments = Comment::where('user_id', Auth::id())
            ->with(['commentable', 'reactions', 'replies'])
            ->withCount('replies')
            ->latest()
            ->paginate(20);

        return view('site.my-comments', compact('comments'));
    }

    public function notifications()
    {
        $notifications = CommentNotification::where('user_id', Auth::id())
            ->with(['actor', 'comment.commentable', 'reply'])
            ->latest()
            ->paginate(30);

        CommentNotification::where('user_id', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return view('site.comment-notifications', compact('notifications'));
    }

    public function unreadCount()
    {
        $count = CommentNotification::where('user_id', Auth::id())
            ->whereNull('read_at')
            ->count();
        return response()->json(['count' => $count]);
    }

    private function formatComment(Comment $comment): array
    {
        return [
            'id'         => $comment->id,
            'body'       => e($comment->body),
            'parent_id'  => $comment->parent_id,
            'likes'      => 0,
            'dislikes'   => 0,
            'yours'      => null,
            'created_at' => $comment->created_at->diffForHumans(),
            'user'       => [
                'username'     => $comment->user->username ?? $comment->user->name,
                'display_name' => $comment->user->display_name ?? $comment->user->name,
                'avatar_url'   => $comment->user->avatar_url,
            ],
        ];
    }

    public function notificationsPreview()
    {
        $items = CommentNotification::where('user_id', Auth::id())
            ->with(['actor', 'comment', 'reply'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($n) {
                return [
                    'type'            => $n->type,
                    'read_at'         => $n->read_at,
                    'created_at'      => $n->created_at->diffForHumans(),
                    'actor'           => $n->actor ? [
                        'name'         => $n->actor->name,
                        'display_name' => $n->actor->display_name,
                    ] : null,
                    'comment_preview' => $n->comment
                        ? \Illuminate\Support\Str::limit($n->comment->body, 60)
                        : null,
                    'reply_preview'   => ($n->type === 'reply' && $n->reply)
                        ? \Illuminate\Support\Str::limit($n->reply->body, 60)
                        : null,
                ];
            });

        $unread = CommentNotification::where('user_id', Auth::id())
            ->whereNull('read_at')
            ->count();

        return response()->json([
            'notifications' => $items,
            'unread_count'  => $unread,
        ]);
    }
}
