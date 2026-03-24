@forelse($comments as $comment)
    @php
        $content    = $comment->commentable;
        $isManga    = $content instanceof \App\Models\Manga;
        $contentUrl = $content
            ? ($isManga ? route('site.manga.show', $content) : route('site.novel.show', $content))
            : null;
        $typeClass = $isManga ? 'manga' : 'novel';
    @endphp

    @auth
        @if(Auth::user()->isBlocking($user))
            <div class="uprofile-blocked-comment">
                <span><img src="{{ asset('assets/icons/lock-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
                Bu kullanıcıyı engellediniz.
                <button class="uprofile-blocked-show"
                        onclick="this.closest('.uprofile-blocked-comment').nextElementSibling.style.display='';this.closest('.uprofile-blocked-comment').style.display='none'">
                    Yorumu göster
                </button>
            </div>
            <div style="display:none">
                @endif
                @endauth

                <div class="uprofile-comment-card">
                    <div class="uprofile-comment-card__source">
                        @if($content)
                            <span class="az-type-badge az-type-badge--{{ $typeClass }}">{{ $isManga ? 'Manga' : 'Novel' }}</span>
                            <a href="{{ $contentUrl }}" class="uprofile-comment-card__series">{{ $content->title }}</a>
                        @else
                            <span class="uprofile-comment-card__series--dead">Silinmiş içerik</span>
                        @endif
                        <span class="uprofile-comment-card__date">{{ $comment->created_at->diffForHumans() }}</span>
                    </div>
                    <div class="uprofile-comment-card__body">{{ $comment->body }}</div>
                    <div class="uprofile-comment-card__stats">
            <span>
                <img src="{{ asset('assets/icons/thumbs-up-solid-full.svg') }}" alt="" style="width:12px;height:12px;vertical-align:middle">
                {{ $comment->reactions->where('type','like')->count() }}
            </span>
                        <span>
                <img src="{{ asset('assets/icons/thumbs-down-solid-full.svg') }}" alt="" style="width:12px;height:12px;vertical-align:middle">
                {{ $comment->reactions->where('type','dislike')->count() }}
            </span>
                        <span>
                <img src="{{ asset('assets/icons/reply-solid-full.svg') }}" alt="" style="width:12px;height:12px;vertical-align:middle">
                {{ $comment->replies_count ?? $comment->replies->count() }}
            </span>
                    </div>
                </div>

                @auth
                    @if(Auth::user()->isBlocking($user))
            </div>
        @endif
    @endauth

@empty
    <div class="comment-empty">
        <span><img src="{{ asset('assets/icons/comment-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
        Henüz yorum yok.
    </div>
@endforelse
