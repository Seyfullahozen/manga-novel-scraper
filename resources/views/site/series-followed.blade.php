@extends('site.layouts.app')
@section('title', 'Takip Ettiklerim')

@section('content')
    <div class="novel-section">

        @php
            $newSeriesCount = $followed->filter(function($follow) {
                $model = $follow->subject;
                return $model && optional($model->scraped_at)->gt(now()->subDay());
            })->count();
        @endphp

        <div class="novel-section-header">
            <h2>
                Takip Ettiklerim
                <span class="chapter-count">({{ $followed->count() }})</span>
                @if($newSeriesCount > 0)
                    <span class="series-notif-badge">{{ $newSeriesCount }} seride yeni bölüm</span>
                @endif
            </h2>
            <div class="content-type-tabs">
                <button class="content-type-tab content-type-tab--active" data-filter="all">Tümü</button>
                <button class="content-type-tab" data-filter="novel">Novel</button>
                <button class="content-type-tab" data-filter="manga">Manga</button>
            </div>
        </div>

        @if($followed->isEmpty())
            <div class="followed-empty">
                <span class="fa fa-bookmark-o followed-empty__icon"></span>
                <p>Henüz hiçbir içerik takip etmiyorsunuz.</p>
                <a href="{{ route('site.novel.home') }}" class="followed-empty__btn">
                    <span class="fa fa-list"></span> Novel Listesine Git
                </a>
            </div>
        @else
            <div class="novel-list-grid" id="followedGrid">
                @foreach($followed as $follow)
                    @php
                        $model   = $follow->subject;
                        if (!$model) continue;
                        $isManga     = $follow->subject_type === \App\Models\Manga::class;
                        $type        = $isManga ? 'manga' : 'novel';
                        $showRoute   = $isManga
                            ? route('site.manga.show', $model)
                            : route('site.novel.show', $model);
                        $unfollowUrl = route('follow.toggle', [
                            'type' => $isManga ? 'manga' : 'novel',
                            'id' => $model->id,
                        ]);

                        // Okuma ilerlemesi
                        $progressKey     = $follow->subject_type . ':' . $follow->subject_id;
                        $progressEntry   = $progressMap[$progressKey] ?? null;
                        $readChapter     = $progressEntry?->chapter_number ?? null;
                        $totalChapters   = $model->chapters()->count();
                        $maxChapterNum   = $model->chapters()->max('chapter_number') ?? 0;
                        $progressPercent = ($readChapter && $maxChapterNum > 0)
                            ? min(100, round(($readChapter / $maxChapterNum) * 100))
                            : 0;
                    @endphp

                    @php $isNew = optional($model->scraped_at)->gt(now()->subDay()); @endphp
                    <div class="novel-list-card {{ $isNew ? 'new-episode' : '' }}" data-type="{{ $type }}">
                        <a class="novel-list-card__link"
                           href="{{ $showRoute }}"
                           title="{{ e($model->title) }}">
                            <img class="novel-list-card__cover"
                                 src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                 alt="{{ e($model->title) }}">
                            @if($isNew)
                                <span class="badge badge--new">yeni</span>
                            @endif
                            <span class="badge badge--type badge--type-{{ $type }}">
                                {{ $isManga ? 'Manga' : 'Novel' }}
                            </span>
                            <span class="novel-list-card__title">
                                {{ \Illuminate\Support\Str::limit($model->title, 40) }}
                            </span>
                        </a>

                        {{-- Okuma ilerlemesi progress bar --}}
                        @if($readChapter)
                            <div class="follow-progress">
                                <div class="follow-progress__bar">
                                    <div class="follow-progress__fill" style="width: {{ $progressPercent }}%"></div>
                                </div>
                                <span class="follow-progress__text">
                                    B#{{ $readChapter }} / {{ $totalChapters }} · %{{ $progressPercent }}
                                </span>
                            </div>
                        @endif

                        <div class="novel-list-card__meta">
                            <span>{{ $totalChapters }} bölüm</span>
                            <button class="followed-unfollow-btn"
                                    data-url="{{ $unfollowUrl }}"
                                    title="Takibi bırak">
                                <span>
                                    <img src="{{ asset('assets/icons/xmark-solid-full.svg') }}"
                                         alt="" style="width:100%;height:100%;max-width:15px">
                                </span>
                            </button>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif

    </div>

    <style>
        .follow-progress {
            padding: 0 8px 4px;
        }
        .follow-progress__bar {
            height: 3px;
            background: rgba(255,255,255,.08);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 3px;
        }
        .follow-progress__fill {
            height: 100%;
            background: #088fe1;
            border-radius: 2px;
            transition: width .3s ease;
        }
        .follow-progress__text {
            font-size: 10px;
            color: #555;
        }
    </style>

@endsection

@push('scripts')
    <script>
        (function () {
            fetch('{{ route('series.notif.mark-read') }}', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json',
                }
            }).catch(function(){});

            var tabs  = document.querySelectorAll('.content-type-tab');
            var cards = document.querySelectorAll('#followedGrid .novel-list-card[data-type]');

            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    tabs.forEach(function (t) { t.classList.remove('content-type-tab--active'); });
                    tab.classList.add('content-type-tab--active');
                    var filter = tab.dataset.filter;
                    cards.forEach(function (card) {
                        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
                    });
                });
            });

            document.querySelectorAll('.followed-unfollow-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var url  = this.dataset.url;
                    var card = this.closest('.novel-list-card');
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Accept': 'application/json',
                        },
                    })
                        .then(function (r) { return r.json(); })
                        .then(function (data) {
                            if (!data.following) {
                                card.style.transition = 'opacity .3s, transform .3s';
                                card.style.opacity    = '0';
                                card.style.transform  = 'scale(.95)';
                                setTimeout(function () { card.remove(); }, 300);
                            }
                        });
                });
            });
        })();
    </script>
@endpush
