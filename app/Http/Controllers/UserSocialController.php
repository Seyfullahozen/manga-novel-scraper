<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserSocialController extends Controller
{
    // Herkese açık profil sayfası
    public function profile(string $username)
    {
        $user = User::where('username', $username)->firstOrFail();
        $authUser = Auth::user();

        $isOwn       = $authUser && $authUser->id === $user->id;
        $isFollowing = $authUser && !$isOwn && $authUser->isFollowing($user);
        $isBlocking  = $authUser && !$isOwn && $authUser->isBlocking($user);

        $stats = [
            'comments'        => \App\Models\Comment::where('user_id', $user->id)->count(),
            'followed_series' => $user->followedSeries()->count(),
            'followers'       => $user->followers()->count(),
            'following'       => $user->following()->count(),
        ];

        // İlk sayfa verileri
        $comments = \App\Models\Comment::where('user_id', $user->id)
            ->with(['commentable', 'replies'])
            ->latest()
            ->paginate(10, ['*'], 'comments_page');

        $followedSeries = $user->followedSeries()
            ->with('subject')
            ->latest()
            ->paginate(12, ['*'], 'series_page');

        $followers = $user->followers()
            ->select('users.id', 'username', 'display_name', 'avatar_url')
            ->paginate(12, ['*'], 'followers_page');

        $followings = $user->following()
            ->select('users.id', 'username', 'display_name', 'avatar_url')
            ->paginate(12, ['*'], 'following_page');

        return view('site.user-profile', compact(
            'user', 'isOwn', 'isFollowing', 'isBlocking',
            'stats', 'comments', 'followedSeries', 'followers', 'followings'
        ));
    }

    // AJAX — yorumlar sayfası
    public function profileComments(string $username, Request $request)
    {
        $user = User::where('username', $username)->firstOrFail();

        $comments = \App\Models\Comment::where('user_id', $user->id)
            ->with(['commentable', 'replies'])
            ->latest()
            ->paginate(10, ['*'], 'comments_page', $request->get('page', 1));

        return response()->json([
            'html'     => view('site.partials.profile-comments', compact('comments', 'user'))->render(),
            'has_more' => $comments->hasMorePages(),
            'next'     => $comments->currentPage() + 1,
        ]);
    }

    // AJAX — seriler sayfası
    public function profileSeries(string $username, Request $request)
    {
        $user = User::where('username', $username)->firstOrFail();

        $followedSeries = $user->followedSeries()
            ->with('subject')
            ->latest()
            ->paginate(12, ['*'], 'series_page', $request->get('page', 1));

        return response()->json([
            'html'     => view('site.partials.profile-series', compact('followedSeries'))->render(),
            'has_more' => $followedSeries->hasMorePages(),
            'next'     => $followedSeries->currentPage() + 1,
        ]);
    }

    // AJAX — takipçiler sayfası
    public function profileFollowers(string $username, Request $request)
    {
        $user = User::where('username', $username)->firstOrFail();

        $followers = $user->followers()
            ->select('users.id', 'username', 'display_name', 'avatar_url')
            ->paginate(12, ['*'], 'followers_page', $request->get('page', 1));

        return response()->json([
            'html'     => view('site.partials.profile-users', ['users' => $followers])->render(),
            'has_more' => $followers->hasMorePages(),
            'next'     => $followers->currentPage() + 1,
        ]);
    }

    // AJAX — takip ettikleri sayfası
    public function profileFollowing(string $username, Request $request)
    {
        $user = User::where('username', $username)->firstOrFail();

        $followings = $user->following()
            ->select('users.id', 'username', 'display_name', 'avatar_url')
            ->paginate(12, ['*'], 'following_page', $request->get('page', 1));

        return response()->json([
            'html'     => view('site.partials.profile-users', ['users' => $followings])->render(),
            'has_more' => $followings->hasMorePages(),
            'next'     => $followings->currentPage() + 1,
        ]);
    }

    // Takip et / bırak
    public function follow(string $username)
    {
        $target = User::where('username', $username)->firstOrFail();
        $me = Auth::user();

        abort_if($me->id === $target->id, 422, 'Kendinizi takip edemezsiniz.');

        if ($me->isFollowing($target)) {
            $me->following()->detach($target->id);
            $following = false;
        } else {
            // Engel varsa takip ettirme
            abort_if($me->isBlocking($target), 422, 'Engellediğiniz kullanıcıyı takip edemezsiniz.');
            $me->following()->attach($target->id);
            $following = true;
        }

        return response()->json([
            'following'       => $following,
            'followers_count' => $target->followers()->count(),
        ]);
    }

    // Engelle / kaldır
    public function block(string $username)
    {
        $target = User::where('username', $username)->firstOrFail();
        $me = Auth::user();

        abort_if($me->id === $target->id, 422, 'Kendinizi engelleyemezsiniz.');

        if ($me->isBlocking($target)) {
            $me->blocking()->detach($target->id);
            $blocking = false;
        } else {
            // Engelliyorsan takipten de çıkar
            $me->following()->detach($target->id);
            $me->followers()->detach($target->id); // karşı taraf da takipten çıksın
            $me->blocking()->attach($target->id);
            $blocking = true;
        }

        return response()->json([
            'blocking' => $blocking,
            'message'  => $blocking ? 'Kullanıcı engellendi.' : 'Engel kaldırıldı.',
        ]);
    }

    // Kullanıcı arama (AJAX)
    public function search(Request $request)
    {
        $q = trim($request->query('q', ''));

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $me = Auth::id();

        $users = User::where('id', '!=', $me)
            ->where(function ($query) use ($q) {
                $query->where('username', 'like', "%{$q}%")
                    ->orWhere('display_name', 'like', "%{$q}%")
                    ->orWhere('name', 'like', "%{$q}%");
            })
            ->select('id', 'username', 'display_name', 'name', 'avatar_url')
            ->limit(8)
            ->get()
            ->map(fn($u) => [
                'username'     => $u->username,
                'display_name' => $u->display_name ?? $u->name,
                'avatar_url'   => $u->avatar_url,
                'url'          => route('user.profile', $u->username),
            ]);

        return response()->json($users);
    }

    // Arkadaşlarım sayfası
    public function friends()
    {
        $me = Auth::user();

        $following = $me->following()
            ->select('users.id','username','display_name','name','avatar_url')
            ->withPivot('created_at')
            ->orderByPivot('created_at', 'desc')
            ->get();

        $followers = $me->followers()
            ->select('users.id','username','display_name','name','avatar_url')
            ->withPivot('created_at')
            ->orderByPivot('created_at', 'desc')
            ->get();

        $blocked = $me->blocking()
            ->select('users.id','username','display_name','name','avatar_url')
            ->withPivot('created_at')
            ->orderByPivot('created_at', 'desc')
            ->get();

        return view('site.friends', compact('following', 'followers', 'blocked'));
    }
}
