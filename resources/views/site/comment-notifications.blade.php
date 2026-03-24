@extends('site.layouts.app')
@section('title', 'Bildirimler')

@section('content')
    <div class="novel-section">

        <div class="my-comments-header">
            <h2 class="my-comments-header__title">
                <span class="fa fa-bell"></span> Bildirimler
            </h2>
            <div class="my-comments-tabs">
                <a href="{{ route('site.my.comments') }}" class="my-comments-tab">
                    Yorumlarım
                </a>
                <a href="{{ route('site.comment.notifications') }}"
                   class="my-comments-tab my-comments-tab--active">
                    Bildirimler
                </a>
            </div>
        </div>

        @forelse($notifications as $notif)
            @php
                $comment = $notif->comment;
                $content = $comment?->commentable;
                $contentUrl = null;
                if ($content instanceof \App\Models\Novel) $contentUrl = route('site.novel.show', $content);
                elseif ($content instanceof \App\Models\Manga) $contentUrl = route('site.manga.show', $content);

                $icons = ['like' => 'fa-thumbs-up', 'dislike' => 'fa-thumbs-down', 'reply' => 'fa-reply', 'mention' => 'fa-at'];
                $labels = ['like' => 'beğendi', 'dislike' => 'beğenmedi', 'reply' => 'yanıtladı', 'mention' => 'sizi etiketledi'];
                $colors = ['like' => 'like', 'dislike' => 'dislike', 'reply' => 'reply', 'mention' => 'mention'];
            @endphp
            <div class="notif-card {{ $notif->isUnread() ? 'notif-card--unread' : '' }}">
                <div class="notif-card__icon notif-card__icon--{{ $colors[$notif->type] ?? '' }}">
                    <span class="fa {{ $icons[$notif->type] ?? 'fa-bell' }}"></span>
                </div>
                <div class="notif-card__body">
                    <div class="notif-card__text">
                        @if($notif->actor)
                            <strong>{{ $notif->actor->display_name ?? $notif->actor->name }}</strong>
                            <span class="notif-card__at">@{{ $notif->actor->username }}</span>
                        @else
                            <strong>Biri</strong>
                        @endif
                        @if($notif->type === 'mention')
                            bir yorumda <span class="notif-card__action notif-card__action--mention">sizi etiketledi</span>
                        @else
                            yorumunuzu <span class="notif-card__action notif-card__action--{{ $colors[$notif->type] }}">{{ $labels[$notif->type] ?? '' }}</span>
                        @endif

                        @if($notif->type === 'reply' && $notif->reply)
                            <blockquote class="notif-card__reply-preview">
                                {{ \Illuminate\Support\Str::limit($notif->reply->body, 100) }}
                            </blockquote>
                        @elseif($notif->type === 'mention' && $notif->comment)
                            <blockquote class="notif-card__reply-preview">
                                {{ \Illuminate\Support\Str::limit($notif->comment->body, 100) }}
                            </blockquote>
                        @endif
                    </div>
                    @if($comment)
                        <blockquote class="notif-card__comment-preview">
                            {{ \Illuminate\Support\Str::limit($comment->body, 80) }}
                        </blockquote>
                    @endif
                    <div class="notif-card__footer">
                        <span class="notif-card__date">{{ $notif->created_at->diffForHumans() }}</span>
                        @if($contentUrl)
                            <a href="{{ $contentUrl }}" class="notif-card__link">Seriye git →</a>
                        @endif
                    </div>
                </div>
            </div>
        @empty
            <div class="comment-empty">
                <span class="fa fa-bell-o"></span>
                Henüz hiç bildiriminiz yok.
            </div>
        @endforelse

        {{ $notifications->links() }}
    </div>
@endsection
