@extends('site.layouts.app')
@section('title', $manga->title)

@section('content')
    <div class="novel-hero">
        <div class="novel-hero__bg"
             style="background-image: url('{{ $manga->getCoverUrl() ?? asset('assets/images/img.png') }}')">
        </div>
        <div class="novel-hero__inner">
            {{-- Kapak --}}
            <div class="novel-hero__cover">
                <img src="{{ $manga->getCoverUrl() ?? asset('assets/images/img.png') }}"
                     alt="{{ $manga->title }}"
                     class="novel-hero__cover-img">

                @php
                    $firstChapter = $chapters->sortBy('chapter_number')->first();
                    $lastChapter  = $chapters->sortByDesc('chapter_number')->first();
                @endphp

                <a class="novel-hero__start-btn"
                   href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $firstChapter->chapter_number]) }}">
                    <span><img src="{{ asset('assets/icons/book-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:20px"></span>
                    İlk Bölümü Oku
                </a>
                @if($chapters->count() > 1)
                    <a class="novel-hero__start-btn novel-hero__start-btn--last"
                       href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $lastChapter->chapter_number]) }}">
                        <span><img src="{{ asset('assets/icons/book-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:20px"></span>
                        Son Bölümü Oku
                    </a>
                @endif

                {{-- Takip butonu --}}
                @auth
                    <button class="novel-hero__follow-btn {{ $isFollowing ? 'novel-hero__follow-btn--active' : '' }}"
                            id="followBtn"
                            data-url="{{ route('follow.toggle', ['type' => 'manga', 'id' => $manga->id]) }}"
                            data-check-icon="{{ asset('assets/icons/check-solid-full.svg') }}"
                            data-plus-icon="{{ asset('assets/icons/plus-solid-full.svg') }}">
                    <span><img src="{{ $isFollowing ? asset('assets/icons/check-solid-full.svg') : asset('assets/icons/plus-solid-full.svg') }}"
                               alt="" style="width:100%;height:100%;max-width:20px"></span>
                        <span id="followBtnText">{{ $isFollowing ? 'Takip Ediliyor' : 'Takip Et' }}</span>
                    </button>
                @else
                    <a href="javascript:;" data-open="#login-form" class="novel-hero__follow-btn">
                        <span><img src="{{ asset('assets/icons/plus-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:20px"></span>
                        Takip Et
                    </a>
                @endauth
            </div>

            {{-- Bilgiler --}}
            <div class="novel-hero__info">
                <h1 class="novel-hero__title">{{ $manga->title }}</h1>
                <div class="novel-hero__meta">
                <span class="novel-meta-pill novel-meta-pill--chapters">
                        <span>
                            <img src="{{ asset('assets/icons/list-check-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:15px">
                        </span>
                    {{ $chapters->count() }} Bölüm
                </span>
                    @if($manga->scraped_at)
                        <span class="novel-meta-pill">
                        <span>
                            <img src="{{ asset('assets/icons/clock-regular-full.svg') }}" alt="" style="width:100%; height:100%; max-width:15px">
                        </span>
                        {{ $manga->scraped_at->diffForHumans() }}
                    </span>
                    @endif
                    <span class="novel-meta-pill novel-meta-pill--manga">
                        <span>
                            <img src="{{ asset('assets/icons/image-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:15px">
                        </span> Manga
                    </span>
                    <span class="novel-meta-pill novel-meta-pill--status">
                        <span>
                            <img src="{{ asset('assets/icons/spinner-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:15px">
                        </span>
                        Devam Ediyor
                    </span>
                </div>

                {{-- Yıldız --}}
                <div class="novel-hero__rating">
                    <div class="novel-stars" id="novelStars"
                         data-url="{{ route('rate', ['type' => 'manga', 'id' => $manga->id]) }}"
                         data-user-rating="{{ $userRating ?? 0 }}"
                         data-guest="{{ auth()->guest() ? '1' : '0' }}">
                        @for($i = 1; $i <= 5; $i++)
                            <span class="novel-star" data-value="{{ $i }}">
                                <span class="novel-star__half novel-star__half--left"  data-value="{{ $i - 0.5 }}">☆</span>
                                <span class="novel-star__half novel-star__half--right" data-value="{{ $i }}">★</span>
                            </span>
                        @endfor
                    </div>
                    <span class="novel-rating-text">
                    <strong id="ratingAvg">{{ $ratingAvg ? number_format($ratingAvg, 1) : '—' }}</strong>
                    / 5.0
                    <span class="novel-rating-count" id="ratingCount">
                        ({{ $ratingCount > 0 ? $ratingCount . ' oy' : 'Henüz oylanmadı' }})
                    </span>
                </span>
                    @auth
                        <span class="novel-rating-yours" id="ratingYours" style="{{ $userRating ? '' : 'display:none' }}">
                        Puanın: <strong>{{ $userRating ?? '' }}</strong>
                    </span>
                    @endauth
                </div>

                {{-- Türler --}}
                <div class="novel-hero__genres">
                    <span class="novel-genre-label">Türler:</span>
                    <span class="novel-genre-tag novel-genre-tag--placeholder">
                        Eklenecek
                    </span>
                </div>

                {{-- Açıklama --}}
                <div class="novel-hero__desc">
                    <div class="novel-desc-content">
                        @if(!empty($manga->description))
                            <p>{{ $manga->description }}</p>
                        @else
                            <p class="novel-desc-placeholder">
                                <span class="fa fa-pencil"></span>
                                Bu manga için henüz bir açıklama eklenmemiş.
                            </p>
                        @endif
                    </div>
                </div>

                @guest
                    <div class="novel-auth-notice">
                        <span><img src="{{ asset('assets/icons/lock-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:20px"></span>
                        <span>Takip etmek için <a href="javascript:;" data-open="#login-form">giriş yapın</a>.</span>
                    </div>
                @endguest

                {{-- Okuma ilerlemesi + Kaldığın Yerden Devam Et --}}
                @auth
                    @if(!empty($readingProgress) && $chapters->count() > 0)
                        @php
                            $maxChapter = $chapters->max('chapter_number');
                            $percent    = $maxChapter > 0 ? round(($readingProgress / $maxChapter) * 100) : 0;
                            $percent    = min($percent, 100);
                        @endphp
                        <div class="reading-progress">
                            <div class="reading-progress__bar">
                                <div class="reading-progress__fill" style="width: {{ $percent }}%"></div>
                            </div>
                            <div class="reading-progress__footer">
                                <span class="reading-progress__label">
                                    <img src="{{ asset('assets/icons/bookmark-solid-full-blue.svg') }}" alt="" style="width:11px;height:11px;vertical-align:middle;margin-right:3px">
                                    Bölüm #{{ $readingProgress }} okundu · %{{ $percent }}
                                </span>
                                <a class="reading-progress__continue-btn"
                                   href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $readingProgress]) }}">
                                    <img src="{{ asset('assets/icons/bookmark-solid-full.svg') }}" alt="" style="width:11px;height:11px;vertical-align:middle;margin-right:4px">
                                    Kaldığın Yerden Devam Et
                                </a>
                            </div>
                        </div>
                    @endif
                @endauth
            </div>
        </div>
    </div>

    {{-- Bölüm listesi --}}
    <div class="novel-section" style="margin-top:20px;">
        <div class="novel-section-header">
            <h2>Bölümler <span class="chapter-count">({{ $chapters->count() }})</span></h2>
        </div>
        @php $sortedChapters = $chapters->sortByDesc('chapter_number')->values(); @endphp
        <ul class="chapter-list" id="chapterList">
            @foreach($sortedChapters as $ch)
                @php
                    $isNew      = optional($manga->scraped_at)->gt(now()->subDay()) && optional($ch->created_at)->gt(now()->subDay());
                    $isLastRead = isset($readingProgress) && $readingProgress == $ch->chapter_number;
                @endphp
                <li class="chapter-list__item {{ $loop->index >= 20 ? 'chapter-list__item--hidden' : '' }} {{ $isLastRead ? 'chapter-list__item--last-read' : '' }}">
                    <a href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $ch->chapter_number]) }}">
                        <span class="chapter-list__num">Bölüm #{{ $ch->chapter_number }}</span>
                        <span class="chapter-list__title">
                            {{ \Illuminate\Support\Str::limit($ch->title ?: 'Bölüm', 80) }}
                        </span>
                        @if($isLastRead)
                            <span class="chapter-list__read-badge">kaldığın yer</span>
                        @elseif($isNew)
                            <span class="chapter-list__new-badge">yeni</span>
                        @endif
                    </a>
                </li>
            @endforeach
        </ul>

        @if($chapters->count() > 20)
            <button class="chapter-show-more-btn" id="chapterShowMore">
                <span><img src="{{ asset('assets/icons/chevron-down-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
                Daha Fazla Göster
                <span class="chapter-show-more-btn__count">({{ $chapters->count() - 20 }} bölüm daha)</span>
            </button>
            <script>
                (function () {
                    var btn   = document.getElementById('chapterShowMore');
                    var total = {{ $chapters->count() }};
                    var shown = 20;
                    if (!btn) return;
                    btn.addEventListener('click', function () {
                        var hidden = document.querySelectorAll('.chapter-list__item--hidden');
                        if (hidden.length > 0) {
                            hidden.forEach(function (li) {
                                li.classList.remove('chapter-list__item--hidden');
                                li.dataset.collapsible = '1';
                            });
                            btn.innerHTML = '<span class="fa fa-chevron-up"></span> Daha Az Göster';
                        } else {
                            document.querySelectorAll('.chapter-list__item[data-collapsible="1"]').forEach(function (li) {
                                li.classList.add('chapter-list__item--hidden');
                            });
                            btn.innerHTML = '<span class="fa fa-chevron-down"></span> Daha Fazla Göster <span class="chapter-show-more-btn__count">(' + (total - shown) + ' bölüm daha)</span>';
                        }
                    });
                })();
            </script>
        @endif
    </div>

    <div style="color:red">
        DEBUG MANGA ID: {{ $manga->id }}
    </div>

    @include('site.partials.comments', [
        'comments'            => $comments,
        'contentReactions'    => $contentReactions,
        'userContentReaction' => $userContentReaction,
        'commentableType'     => 'manga',
        'commentableId'       => $manga->id,
    ])

@endsection

@push('scripts')
    <script>
        (function () {
            var starsWrap = document.getElementById('novelStars');
            if (!starsWrap) return;
            var url = starsWrap.dataset.url, isGuest = starsWrap.dataset.guest === '1';
            var userRating = parseFloat(starsWrap.dataset.userRating) || 0;
            var avgEl = document.getElementById('ratingAvg');
            var countEl = document.getElementById('ratingCount');
            var yoursEl = document.getElementById('ratingYours');

            function renderStars(value, isHover) {
                starsWrap.querySelectorAll('.novel-star__half').forEach(function (half) {
                    var v = parseFloat(half.dataset.value);
                    var filled = v <= value;
                    half.classList.toggle('novel-star__half--filled', filled);
                    half.classList.toggle('novel-star__half--hover',  filled && isHover);
                });
            }
            renderStars(userRating, false);
            if (isGuest) return;

            starsWrap.querySelectorAll('.novel-star__half').forEach(function (half) {
                half.addEventListener('mouseenter', function () {
                    renderStars(parseFloat(this.dataset.value), true);
                });
            });
            starsWrap.addEventListener('mouseleave', function () {
                renderStars(userRating, false);
            });
            starsWrap.querySelectorAll('.novel-star__half').forEach(function (half) {
                half.addEventListener('click', function () {
                    var value = parseFloat(this.dataset.value);
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Accept':       'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ rating: value }),
                    })
                        .then(function (r) { return r.json(); })
                        .then(function (data) {
                            userRating = data.yours;
                            renderStars(userRating, false);
                            avgEl.textContent   = data.average.toFixed(1);
                            countEl.textContent = '(' + data.count + ' oy)';
                            if (yoursEl) {
                                yoursEl.style.display = '';
                                yoursEl.querySelector('strong').textContent = data.yours;
                            }
                        });
                });
            });

            var followBtn = document.getElementById('followBtn');
            if (followBtn) {
                followBtn.addEventListener('click', function () {
                    var btn = this, text = document.getElementById('followBtnText');
                    var icon = btn.querySelector('img');
                    var checkIcon = btn.dataset.checkIcon, plusIcon = btn.dataset.plusIcon;
                    btn.disabled = true;
                    fetch(btn.dataset.url, { method:'POST', headers:{'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content,'Accept':'application/json','Content-Type':'application/json'} })
                        .then(function(r){return r.json();})
                        .then(function(data){
                            btn.classList.toggle('novel-hero__follow-btn--active', data.following);
                            icon.src = data.following ? checkIcon : plusIcon;
                            text.textContent = data.following ? 'Takip Ediliyor' : 'Takip Et';
                        })
                        .finally(function(){btn.disabled=false;});
                });
            }
        })();
    </script>
@endpush
