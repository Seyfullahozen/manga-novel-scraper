@php $popType = $popType ?? 'novel'; @endphp

<div class="section-right" style="margin-top: 22px">
    <div class="most-tab">
        <div class="most-tab__header">
            <h3>En Popülerler</h3>
            @if($popType === 'mixed')
                <div class="pop-type-toggle">
                    <button class="pop-type-btn pop-type-btn--active" data-pop="novel">Novel</button>
                    <button class="pop-type-btn" data-pop="manga">Manga</button>
                </div>
            @endif
        </div>
        <ul class="most-tab__tabs">
            <li class="most-tab__tab active" data-tab="views">
                <a href="javascript:;">Görüntülenme</a>
            </li>
            <li class="most-tab__tab" data-tab="rating">
                <a href="javascript:;">Puan</a>
            </li>
            <li class="most-tab__tab" data-tab="follows">
                <a href="javascript:;">Takip</a>
            </li>
        </ul>
    </div>

    {{-- ==================== NOVEL BLOK ==================== --}}
    @if($popType === 'mixed' || $popType === 'novel')
        <div class="pop-block pop-block--novel">

            {{-- Görüntülenme --}}
            <div class="most-tab-list most-tab__content" id="novel-tab-views">
                <ul>
                    @forelse($novelpopularByViews as $item)
                        @php $model = isset($item['_model']) ? $item['_model'] : $item; @endphp
                        <li>
                            <a href="{{ route('site.novel.show', $model) }}" title="{{ e($model->title) }}">
                                <span class="position">{{ $loop->iteration }}</span>
                                <span class="points">
                                <img src="{{ asset('assets/icons/eye-solid-full.svg') }}" alt=""
                                     style="width:100%;height:100%;max-width:15px">
                                {{ number_format($model->click_count) }}
                            </span>
                                <span class="info">
                                <img width="34" height="34"
                                     src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                     alt="{{ e($model->title) }}"/>
                                <span class="title">{{ \Illuminate\Support\Str::limit($model->title, 30) }}</span>
                            </span>
                            </a>
                        </li>
                    @empty
                        <li class="most-tab__empty">Henüz veri yok.</li>
                    @endforelse
                </ul>
            </div>

            {{-- Puan --}}
            <div class="most-tab-list most-tab__content most-tab__content--hidden" id="novel-tab-rating">
                <ul>
                    @forelse($novelpopularByRating as $item)
                        @php $model = isset($item['_model']) ? $item['_model'] : $item; @endphp
                        <li>
                            <a href="{{ route('site.novel.show', $model) }}" title="{{ e($model->title) }}">
                                <span class="position">{{ $loop->iteration }}</span>
                                <span class="points">★ {{ number_format($model->ratings_avg_rating, 1) }}</span>
                                <span class="info">
                                <img width="34" height="34"
                                     src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                     alt="{{ e($model->title) }}"/>
                                <span class="title">{{ \Illuminate\Support\Str::limit($model->title, 30) }}</span>
                                <span class="category">{{ $model->ratings_count }} oy</span>
                            </span>
                            </a>
                        </li>
                    @empty
                        <li class="most-tab__empty">Henüz yeterli oy yok.</li>
                    @endforelse
                </ul>
            </div>

            {{-- Takip --}}
            <div class="most-tab-list most-tab__content most-tab__content--hidden" id="novel-tab-follows">
                <ul>
                    @forelse($novelpopularByFollows as $item)
                        @php $model = isset($item['_model']) ? $item['_model'] : $item; @endphp
                        <li>
                            <a href="{{ route('site.novel.show', $model) }}" title="{{ e($model->title) }}">
                                <span class="position">{{ $loop->iteration }}</span>
                                <span class="points">
                                <img src="{{ asset('assets/icons/bookmark-solid-full.svg') }}" alt=""
                                     style="width:100%;height:100%;max-width:15px">
                                {{ number_format($model->follows_count) }}
                            </span>
                                <span class="info">
                                <img width="34" height="34"
                                     src="{{ $model->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                     alt="{{ e($model->title) }}"/>
                                <span class="title">{{ \Illuminate\Support\Str::limit($model->title, 30) }}</span>
                            </span>
                            </a>
                        </li>
                    @empty
                        <li class="most-tab__empty">Henüz takip eden yok.</li>
                    @endforelse
                </ul>
            </div>
        </div>
    @endif

    {{-- ==================== MANGA BLOK ==================== --}}
    @if($popType === 'mixed' || $popType === 'manga')
        <div class="pop-block pop-block--manga" style="{{ $popType === 'manga' ? '' : 'display:none' }}">

            {{-- Görüntülenme --}}
            <div class="most-tab-list most-tab__content" id="manga-tab-views">
                <ul>
                    @forelse($mangaPopularByViews as $manga)
                        <li>
                            <a href="{{ route('site.manga.show', $manga) }}" title="{{ e($manga->title) }}">
                                <span class="position">{{ $loop->iteration }}</span>
                                <span class="points">
                                <img src="{{ asset('assets/icons/eye-solid-full.svg') }}" alt=""
                                     style="width:100%;height:100%;max-width:15px">
                                {{ number_format($manga->click_count) }}
                            </span>
                                <span class="info">
                                <img width="34" height="34"
                                     src="{{ $manga->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                     alt="{{ e($manga->title) }}"/>
                                <span class="title">{{ \Illuminate\Support\Str::limit($manga->title, 30) }}</span>
                            </span>
                            </a>
                        </li>
                    @empty
                        <li class="most-tab__empty">Henüz veri yok.</li>
                    @endforelse
                </ul>
            </div>

            {{-- Puan --}}
            <div class="most-tab-list most-tab__content most-tab__content--hidden" id="manga-tab-rating">
                <ul>
                    @forelse($mangaPopularByRating as $manga)
                        <li>
                            <a href="{{ route('site.manga.show', $manga) }}" title="{{ e($manga->title) }}">
                                <span class="position">{{ $loop->iteration }}</span>
                                <span class="points">★ {{ number_format($manga->ratings_avg_rating, 1) }}</span>
                                <span class="info">
                                <img width="34" height="34"
                                     src="{{ $manga->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                     alt="{{ e($manga->title) }}"/>
                                <span class="title">{{ \Illuminate\Support\Str::limit($manga->title, 30) }}</span>
                                <span class="category">{{ $manga->ratings_count }} oy</span>
                            </span>
                            </a>
                        </li>
                    @empty
                        <li class="most-tab__empty">Henüz yeterli oy yok.</li>
                    @endforelse
                </ul>
            </div>

            {{-- Takip --}}
            <div class="most-tab-list most-tab__content most-tab__content--hidden" id="manga-tab-follows">
                <ul>
                    @forelse($mangaPopularByFollows as $manga)
                        <li>
                            <a href="{{ route('site.manga.show', $manga) }}" title="{{ e($manga->title) }}">
                                <span class="position">{{ $loop->iteration }}</span>
                                <span class="points">
                                <img src="{{ asset('assets/icons/bookmark-solid-full.svg') }}" alt=""
                                     style="width:100%;height:100%;max-width:15px">
                                {{ number_format($manga->follows_count) }}
                            </span>
                                <span class="info">
                                <img width="34" height="34"
                                     src="{{ $manga->getCoverUrl() ?? asset('assets/images/img.png') }}"
                                     alt="{{ e($manga->title) }}"/>
                                <span class="title">{{ \Illuminate\Support\Str::limit($manga->title, 30) }}</span>
                            </span>
                            </a>
                        </li>
                    @empty
                        <li class="most-tab__empty">Henüz takip eden yok.</li>
                    @endforelse
                </ul>
            </div>
        </div>
    @endif

</div>

@push('scripts')
    <script>
        (function () {
            var tabs = document.querySelectorAll('.most-tab__tab');
            var activeBlock = @json($popType === 'manga' ? 'manga' : 'novel');

            function switchTab(tabName) {
                document.querySelectorAll('.most-tab__content').forEach(function (c) {
                    c.classList.add('most-tab__content--hidden');
                });

                var el = document.getElementById(activeBlock + '-tab-' + tabName);
                if (el) el.classList.remove('most-tab__content--hidden');
            }

            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    tabs.forEach(function (t) {
                        t.classList.remove('active');
                    });

                    tab.classList.add('active');
                    switchTab(tab.dataset.tab);
                });
            });

            var popBtns = document.querySelectorAll('.pop-type-btn');
            if (popBtns.length) {
                popBtns.forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        popBtns.forEach(function (b) {
                            b.classList.remove('pop-type-btn--active');
                        });

                        btn.classList.add('pop-type-btn--active');
                        activeBlock = btn.dataset.pop;

                        document.querySelectorAll('.pop-block').forEach(function (b) {
                            b.style.display = 'none';
                        });

                        var targetBlock = document.querySelector('.pop-block--' + activeBlock);
                        if (targetBlock) targetBlock.style.display = '';

                        var activeTab = document.querySelector('.most-tab__tab.active');
                        if (activeTab) switchTab(activeTab.dataset.tab);
                    });
                });
            }

            var activeTab = document.querySelector('.most-tab__tab.active');
            if (activeTab) switchTab(activeTab.dataset.tab);
        })();
    </script>
@endpush
