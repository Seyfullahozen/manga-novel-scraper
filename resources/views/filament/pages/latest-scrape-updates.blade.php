<x-filament-panels::page>
    @php
        $cards = $this->newChapterCards();
    @endphp

    <div class="updates-page max-w-7xl mx-auto">

        <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Son Otomatik Scrape
            </h2>
            <br>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($cards as $c)
                <a href="{{ $c['reader_url'] }}" class="update-card group">

                    <div class="grid grid-cols-12 gap-4 items-center">

                        {{-- Sol: Site logo / fallback badge --}}
                        <div class="col-span-4 flex justify-center">
                            @if(!empty($c['site_logo']))
                                <div class="site-logo-wrap">
                                    <img src="{{ $c['site_logo'] }}" alt="site logo" class="site-logo">
                                </div>
                            @else
                                @if($c['type'] === 'manga')
                                    <div class="site-badge site-badge-manga">
                                        <x-heroicon-o-book-open class="w-8 h-8" />
                                    </div>
                                @else
                                    <div class="site-badge site-badge-novel">
                                        <x-heroicon-o-document-text class="w-8 h-8" />
                                    </div>
                                @endif
                            @endif
                        </div>

                        {{-- Sağ: Manga/Novel adı + bölüm --}}
                        <div class="col-span-8">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {{ $c['subject_title'] }}
                            </h3>

                            <span class="site-type site-type-{{ $c['type'] }} mb-3">
                                {{ $c['type'] === 'manga' ? 'Manga' : 'Novel' }}
                            </span>

                            <p class="text-sm text-gray-700 dark:text-gray-200 mt-3">
                                Bölüm {{ $c['chapter_number'] }}
                                <span class="text-gray-500 dark:text-gray-400">
                                    — {{ $c['chapter_title'] ?: ($c['type'] === 'manga' ? "Bölüm ".$c['chapter_number'] : "Chapter ".$c['chapter_number']) }}
                                </span>
                            </p>

                            <p class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-2">
                                {{ $c['site_domain'] }}
                                <span class="ml-2 text-gray-400">•</span>
                                <span class="ml-2">Run #{{ $c['run_id'] }}</span>
                            </p>

                            <div class="mt-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span class="text-xs text-primary-500 mr-1">
                                    İçeriği Aç
                                </span>
                                <x-heroicon-o-arrow-right
                                    class="text-primary-500"
                                    style="width:12px !important; height:12px !important;"
                                />
                            </div>
                        </div>

                    </div>
                </a>
                <br>
            @empty
                <div class="empty-card col-span-full">
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        Bu aralıkta yeni bölüm yok.
                    </div>
                </div>
            @endforelse
        </div>

    </div>

    <style>
        .update-card {
            display: block;
            padding: 1.5rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            border: 1px solid rgb(229 231 235);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .dark .update-card {
            background: rgb(17 24 39);
            border-color: rgb(55 65 81);
        }
        .update-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border-color: rgb(59 130 246);
        }
        .dark .update-card:hover {
            border-color: rgb(96 165 250);
        }

        /* LOGO */
        .site-logo-wrap{
            width: 72px;
            height: 72px;
            border-radius: 16px;
            display:flex;
            align-items:center;
            justify-content:center;
            background: rgba(0,0,0,.03);
            border: 1px solid rgb(229 231 235);
            transition: transform 0.3s ease;
            overflow:hidden;
        }
        .dark .site-logo-wrap{
            background: rgba(255,255,255,.04);
            border-color: rgb(55 65 81);
        }
        .update-card:hover .site-logo-wrap{
            transform: scale(1.08) rotate(3deg);
        }
        .site-logo{
            width: 56px;
            height: 56px;
            object-fit: contain;
        }

        /* Badge */
        .site-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
            border-radius: 16px;
            transition: transform 0.3s ease;
        }
        .update-card:hover .site-badge {
            transform: scale(1.1) rotate(5deg);
        }
        .site-badge-manga {
            background: rgb(219 234 254);
            color: rgb(29 78 216);
        }
        .dark .site-badge-manga {
            background: rgb(30 58 138);
            color: rgb(191 219 254);
        }
        .site-badge-novel {
            background: rgb(254 226 226);
            color: rgb(185 28 28);
        }
        .dark .site-badge-novel {
            background: rgb(127 29 29);
            color: rgb(254 202 202);
        }

        .site-type {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .site-type-manga {
            background: rgb(219 234 254);
            color: rgb(29 78 216);
        }
        .dark .site-type-manga {
            background: rgb(30 58 138);
            color: rgb(191 219 254);
        }
        .site-type-novel {
            background: rgb(254 226 226);
            color: rgb(185 28 28);
        }
        .dark .site-type-novel {
            background: rgb(127 29 29);
            color: rgb(254 202 202);
        }

        .empty-card{
            padding: 1.25rem;
            border-radius: 1rem;
            border: 1px dashed rgb(229 231 235);
            background: rgba(0,0,0,.02);
        }
        .dark .empty-card{
            border-color: rgb(55 65 81);
            background: rgba(255,255,255,.03);
        }
    </style>
</x-filament-panels::page>
