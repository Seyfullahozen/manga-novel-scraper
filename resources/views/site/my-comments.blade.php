@extends('site.layouts.app')
@section('title', 'Yorumlarım')

@section('content')
    <div class="novel-section">

        <div class="my-comments-header">
            <h2 class="my-comments-header__title">
                <span class="fa fa-comment"></span> Yorumlarım
            </h2>
            <div class="my-comments-tabs">
                <a href="{{ route('site.my.comments') }}"
                   class="my-comments-tab my-comments-tab--active">
                    Yorumlarım
                    <span class="my-comments-tab__count">{{ $comments->total() }}</span>
                </a>
                <a href="{{ route('site.comment.notifications') }}"
                   class="my-comments-tab" id="notifTabLink">
                    Bildirimler
                    @php $unread = \App\Models\CommentNotification::where('user_id', auth()->id())->whereNull('read_at')->count(); @endphp
                    @if($unread > 0)
                        <span class="my-comments-tab__badge">{{ $unread }}</span>
                    @endif
                </a>
            </div>
        </div>

        @forelse($comments as $comment)
            @php
                $content = $comment->commentable;
                $contentTitle = $content?->title ?? '(Silinmiş içerik)';
                $contentUrl = null;
                if ($content instanceof \App\Models\Novel) $contentUrl = route('site.novel.show', $content);
                elseif ($content instanceof \App\Models\Manga) $contentUrl = route('site.manga.show', $content);
                $type = $comment->commentable_type === \App\Models\Novel::class ? 'Novel' : 'Manga';
                $typeClass = $type === 'Novel' ? 'novel' : 'manga';
            @endphp
            <div class="my-comment-card">
                <div class="my-comment-card__source">
                    <span class="az-type-badge az-type-badge--{{ $typeClass }}">{{ $type }}</span>
                    @if($contentUrl)
                        <a href="{{ $contentUrl }}" class="my-comment-card__series-link">{{ $contentTitle }}</a>
                    @else
                        <span class="my-comment-card__series-link--dead">{{ $contentTitle }}</span>
                    @endif
                    @if($comment->parent_id)
                        <span class="my-comment-card__reply-badge">
                        <span class="fa fa-reply"></span> Yanıt
                    </span>
                    @endif
                </div>

                <div class="my-comment-card__body">{{ $comment->body }}</div>

                <div class="my-comment-card__footer">
                <span class="my-comment-card__date" title="{{ $comment->created_at->format('d.m.Y H:i') }}">
                    {{ $comment->created_at->diffForHumans() }}
                </span>
                    <span class="my-comment-card__stats">
                    <span class="my-comment-card__stat my-comment-card__stat--like">
                        <span class="fa fa-thumbs-up"></span>
                        {{ $comment->reactions->where('type','like')->count() }}
                    </span>
                    <span class="my-comment-card__stat my-comment-card__stat--dislike">
                        <span class="fa fa-thumbs-down"></span>
                        {{ $comment->reactions->where('type','dislike')->count() }}
                    </span>
                    <span class="my-comment-card__stat">
                        <span class="fa fa-reply"></span>
                        {{ $comment->replies_count }} yanıt
                    </span>
                </span>
                </div>
            </div>
        @empty
            <div class="comment-empty">
                <span class="fa fa-comment-o"></span>
                Henüz hiç yorum yapmadınız.
            </div>
        @endforelse

        {{ $comments->links() }}
    </div>
@endsection
