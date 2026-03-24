@extends('site.layouts.app')
@section('title', 'Son Okuduklarım')

@section('content')
    <div class="novel-section">

        <div class="novel-section-header">
            <h2>Son Okuduklarım <span class="chapter-count">({{ $history->count() }})</span></h2>
            <div class="content-type-tabs">
                <button class="content-type-tab content-type-tab--active" data-filter="all">Tümü</button>
                <button class="content-type-tab" data-filter="novel">Novel</button>
                <button class="content-type-tab" data-filter="manga">Manga</button>
            </div>
        </div>

        @if($history->isEmpty())
            <div class="followed-empty">
                <span class="fa fa-book followed-empty__icon"></span>
                <p>Henüz hiç içerik okumadınız.</p>
                <a href="{{ route('site.novel.home') }}" class="followed-empty__btn">
                    <span class="fa fa-list"></span> Novel Listesine Git
                </a>
            </div>
        @else
            <div class="novel-list-grid" id="historyGrid">
                @foreach($history as $entry)
                    @php
                        $model = $entry->readable;
                        if (!$model) continue;

                        $isManga  = $entry->readable_type === \App\Models\Manga::class;
                        $type     = $isManga ? 'manga' : 'novel';
                        $showRoute = $isManga
                            ? route('site.manga.show', $model)
                            : route('site.novel.show', $model);
                        $chapterRoute = $isManga
                            ? route('site.manga.chapter', ['manga' => $model, 'chapter' => $entry->chapter_number])
                            : route('site.novel.chapter', ['novel' => $model, 'chapter' => $entry->chapter_number]);
                    @endphp

                    <div class="novel-list-card" data-type="{{ $type }}">
                        <a class="novel-list-card__link"
                           href="{{ $chapterRoute }}"
                           title="{{ e($model->title) }}">
                            <img class="novel-list-card__cover"
                                 src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                 alt="{{ e($model->title) }}">
                            <span class="badge badge--type badge--type-{{ $type }}">
                            {{ $isManga ? 'Manga' : 'Novel' }}
                        </span>
                            <span class="novel-list-card__title">
                            {{ \Illuminate\Support\Str::limit($model->title, 40) }}
                        </span>
                        </a>
                        <div class="novel-list-card__meta">
                            <a href="{{ $chapterRoute }}" class="history-chapter-link">
                            <span>
                                <img src="{{ asset('assets/icons/bookmark-solid-full-blue.svg') }}"
                                     alt="" style="width:100%;height:100%;max-width:15px;">
                            </span>
                                Bölüm #{{ $entry->chapter_number }}
                            </a>
                            <span class="history-time" title="{{ $entry->read_at->format('d.m.Y H:i') }}">
                            {{ $entry->read_at->diffForHumans() }}
                        </span>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif

    </div>
@endsection

@push('scripts')
    <script>
        (function () {
            var tabs  = document.querySelectorAll('.content-type-tab');
            var cards = document.querySelectorAll('#historyGrid .novel-list-card[data-type]');

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
        })();
    </script>
@endpush
