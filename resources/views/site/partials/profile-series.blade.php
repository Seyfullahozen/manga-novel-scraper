@forelse($followedSeries as $follow)
    @php
        $model = $follow->subject;
        if (!$model) continue;
        $isManga   = $follow->subject_type === \App\Models\Manga::class;
        $url       = $isManga ? route('site.manga.show', $model) : route('site.novel.show', $model);
        $typeClass = $isManga ? 'manga' : 'novel';
    @endphp
    <div class="uprofile-series-card">
        <img src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
             alt="{{ $model->title }}" class="uprofile-series-card__cover">
        <div class="uprofile-series-card__info">
            <span class="az-type-badge az-type-badge--{{ $typeClass }}">{{ $isManga ? 'Manga' : 'Novel' }}</span>
            <a href="{{ $url }}" class="uprofile-series-card__title">
                {{ \Illuminate\Support\Str::limit($model->title, 40) }}
            </a>
        </div>
    </div>
@empty
    <div class="comment-empty">
        <span><img src="{{ asset('assets/icons/bookmark-solid-white-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
        Henüz seri takip etmiyor.
    </div>
@endforelse
