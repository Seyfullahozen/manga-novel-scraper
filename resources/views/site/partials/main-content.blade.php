{{-- ÜST: Dikkat Çeken Seriler --}}
<div class="section-tab" style="text-align:unset; padding:10px; height:240px; clear:both;">
    <h3 class="title"><span class="blue">Dikkat Çeken Seriler</span></h3>
    <div id="dikkat-ceken-diziler">
        <div id="dlab-diziler-main">
            <div class="dlab-img">
                <a href="#" title="">
                    <img src="{{ asset('assets/images/img.png') }}">
                </a>
            </div>
            <div class="dlab-dizi-main">
                <a href="#">
                    <div class="dlab-title">Yakında</div>
                    <div class="dlab-imdb"><i class="fa fa-star"></i> —</div>
                    <div class="dlab-yil"><i class="fa fa-calendar"></i> 2025</div>
                </a>
            </div>
        </div>
    </div>
    <div class="bosluk"></div>
</div>

<br style="clear:both"/>

{{-- Bu haftanın popülerleri --}}
<div class="novel-section">
    <div class="novel-section-header">
        <h2>
            Bu Haftanın Popülerleri
            <span class="novel-section-header__sub">
                <span>★</span> Yıldız puanına göre
            </span>
        </h2>
    </div>

    @if($weeklyPopular->isEmpty())
        <div class="weekly-empty">
            <span class="fa fa-star-o"></span>
            Bu hafta henüz oy kullanılmadı.
        </div>
    @else
        <div class="grid">
            @foreach($weeklyPopular as $item)
                @php
                    $model = $item['_model'];
                    $type  = $item['_type'];
                    $route = $type === 'novel'
                        ? route('site.novel.show', $model)
                        : route('site.manga.show', $model);
                @endphp
                <div class="card">
                    <a class="card__inner novel-link"
                       href="{{ $route }}"
                       title="{{ e($model->title) }}">
                        <span class="badge badge--rating">★ {{ number_format($item['weekly_avg'], 1) }}</span>
                        <span class="badge badge--type badge--type-{{ $type }}">
                            {{ $type === 'novel' ? 'Novel' : 'Manga' }}
                        </span>
                        <img width="40" height="40"
                             src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                             alt="{{ e($model->title) }}"/>
                        <span class="card__title">
                            {{ \Illuminate\Support\Str::limit($model->title, 38) }}
                        </span>
                    </a>
                    <span class="card__chapter">{{ $item['weekly_count'] }} oy</span>
                </div>
            @endforeach
        </div>
    @endif
</div>

{{-- Son eklenenler — Novel + Manga karışık --}}
<div class="novel-section">
    <div class="novel-section-header">
        <h2>Son Eklenenler</h2>
        <div class="content-type-tabs">
            <button class="content-type-tab content-type-tab--active" data-filter="all">Tümü</button>
            <button class="content-type-tab" data-filter="novel">Novel</button>
            <button class="content-type-tab" data-filter="manga">Manga</button>
        </div>
    </div>

    <div class="grid" id="combinedGrid">
        @forelse($combined as $item)
            @php
                $model  = $item['_model'];
                $type   = $item['_type'];
                $latest = $model->latestChapters->first() ?? null;
                $showRoute = $type === 'novel'
                    ? route('site.novel.show', $model)
                    : route('site.manga.show', $model);
                $chapterRoute = $latest
                    ? ($type === 'novel'
                        ? route('site.novel.chapter', ['novel' => $model, 'chapter' => $latest->chapter_number])
                        : route('site.manga.chapter', ['manga' => $model, 'chapter' => $latest->chapter_number]))
                    : null;
            @endphp

            <div class="card {{ optional($model->scraped_at)->gt(now()->subDay()) ? 'new-episode' : '' }}"
                 data-type="{{ $type }}">
                <a class="card__inner novel-link"
                   href="{{ $showRoute }}"
                   title="{{ e($model->title) }}">
                    @if(optional($model->scraped_at)->gt(now()->subDay()))
                        <span class="badge badge--new">yeni</span>
                    @endif
                    <span class="badge badge--type badge--type-{{ $type }}">{{ $type === 'novel' ? 'Novel' : 'Manga' }}</span>
                    <img width="40" height="40"
                         src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                         alt="{{ e($model->title) }}"/>
                    <span class="card__title">{{ \Illuminate\Support\Str::limit($model->title, 38) }}</span>
                </a>

                @if($latest && $chapterRoute)
                    <a class="card__chapter chapter-link" href="{{ $chapterRoute }}">
                        Son Bölüm: #{{ $latest->chapter_number }}
                        <i class="fa fa-angle-right" style="float:right;opacity:.6;"></i>
                    </a>
                @else
                    <span class="card__chapter">Henüz bölüm yok</span>
                @endif
            </div>
        @empty
            <div class="card card--empty">
                <span class="card__title">Henüz içerik yok</span>
            </div>
        @endforelse
    </div>
</div>

@include('site.partials.popular-content')

@push('scripts')
    <script>
        (function () {
            var tabs  = document.querySelectorAll('.content-type-tab');
            var cards = document.querySelectorAll('#combinedGrid .card[data-type]');

            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    tabs.forEach(function (t) { t.classList.remove('content-type-tab--active'); });
                    tab.classList.add('content-type-tab--active');

                    var filter = tab.dataset.filter;
                    cards.forEach(function (card) {
                        if (filter === 'all' || card.dataset.type === filter) {
                            card.style.display = '';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        })();
    </script>
@endpush
