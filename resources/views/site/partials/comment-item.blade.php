@php
    $userId = auth()->id();
    $isOwn  = $userId && $comment->user_id === $userId;
    $userReaction = $comment->userReaction($userId);
@endphp

<div class="comment-item {{ $depth > 0 ? 'comment-item--reply' : '' }}" data-id="{{ $comment->id }}">
    <div class="comment-item__head">
        @if($comment->user->avatar_url)
            <img src="{{ $comment->user->avatar_url }}" class="comment-avatar comment-avatar--sm" alt="">
        @else
            <div class="comment-avatar comment-avatar--sm comment-avatar--placeholder">
                {{ mb_substr($comment->user->display_name ?? $comment->user->name, 0, 1) }}
            </div>
        @endif
        <div class="comment-item__meta">
            @if($comment->user->username)
                <a href="{{ route('user.profile', $comment->user->username) }}" class="comment-username">{{ $comment->user->username }}</a>
            @else
                <span class="comment-username">{{ $comment->user->display_name ?? $comment->user->name }}</span>
            @endif
            <span class="comment-date" title="{{ $comment->created_at->format('d.m.Y H:i') }}">
                {{ $comment->created_at->diffForHumans() }}
            </span>
        </div>
        @if($isOwn)
            <button class="comment-delete-btn" title="Sil">
                <span><img src="{{ asset('assets/icons/trash-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
            </button>
        @endif
    </div>

    {{-- Kime yanıt verdiği (reply ise) --}}
    @if($depth > 0 && isset($comment->replyToUser) && $comment->replyToUser)
        <span class="comment-reply-to">@{{ $comment->replyToUser }}</span>
    @endif

    <div class="comment-body">{{ $comment->body }}</div>

    <div class="comment-actions">
        <button class="comment-like-btn {{ $userReaction === 'like' ? 'comment-like-btn--active' : '' }}"
                @guest data-guest="1" @endguest>
            <span><img src="{{ asset('assets/icons/thumbs-up-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
            <span class="comment-like-count">{{ $comment->likesCount() }}</span>
        </button>
        <button class="comment-dislike-btn {{ $userReaction === 'dislike' ? 'comment-dislike-btn--active' : '' }}"
                @guest data-guest="1" @endguest>
            <span><img src="{{ asset('assets/icons/thumbs-down-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
            <span class="comment-dislike-count">{{ $comment->dislikesCount() }}</span>
        </button>
        {{-- Yanıtla butonu her yorum için (depth fark etmez) --}}
        @auth
            <button class="comment-reply-btn">
                <span><img src="{{ asset('assets/icons/reply-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span> Yanıtla
            </button>
        @endauth
    </div>

    {{-- Yanıtlar (sadece ana yorumda render edilir, flat liste) --}}
    @if($depth === 0)
        <div class="comment-replies" data-parent-id="{{ $comment->id }}">
            @foreach($comment->replies as $reply)
                @if(isset($blockedUserIds) && in_array($reply->user_id, $blockedUserIds))
                    <div class="comment-blocked-wrap">
                        <div class="comment-blocked-notice comment-blocked-notice--reply">
                            <span><img src="{{ asset('assets/icons/ban-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
                            Bu kullanıcıyı engellediniz.
                            <button class="comment-blocked-show-btn" type="button">Göster</button>
                        </div>
                        <div class="comment-blocked-content" style="display:none">
                            @include('site.partials.comment-item', ['comment' => $reply, 'depth' => 1])
                        </div>
                    </div>
                @else
                    @include('site.partials.comment-item', ['comment' => $reply, 'depth' => 1])
                @endif
            @endforeach
        </div>
    @endif
</div>
