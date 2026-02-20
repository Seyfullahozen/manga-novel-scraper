<x-filament-panels::page>
    <div class="sites-page max-w-7xl mx-auto">

        <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Desteklenen Siteler
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Aşağıdaki sitelerden manga ve novel içeriklerini kolayca scrape edebilirsiniz.
            </p>
            <br>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($this->sites as $site)
                <a href="{{ $site['url'] }}"
                   target="_blank"
                   class="site-card group">

                    <!-- Grid yapısı: Sol 4 kolon (logo), Sağ 8 kolon (detaylar) -->
                    <div class="grid grid-cols-12 gap-4 items-center">

                        <!-- Sol: Logo (4 kolon) -->
                        <div class="col-span-4 flex justify-center">
                            @if(!empty($site['logo']))
                                <div class="site-logo-wrap">
                                    <img src="{{ $site['logo'] }}" alt="{{ $site['name'] }} logo" class="site-logo">
                                </div>
                            @else
                                @if($site['type'] === 'manga')
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

                        <!-- Sağ: Detaylar (8 kolon) -->
                        <div class="col-span-8">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {{ $site['name'] }}
                            </h3>

                            <span class="site-type site-type-{{ $site['type'] }} mb-3">
                                {{ $site['type'] === 'manga' ? 'Manga' : 'Novel' }}
                            </span>

                            <p class="text-sm text-gray-500 dark:text-gray-400 font-mono mt-3">
                                {{ $site['domain'] }}
                            </p>

                            <div class="mt-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <span class="text-xs text-primary-500 mr-1">Siteye Git</span>
                                <x-heroicon-o-arrow-right
                                    class="text-primary-500"
                                    style="width:12px !important; height:12px !important;"
                                />
                            </div>
                        </div>

                    </div>
                </a>
                <br>
            @endforeach
        </div>
    </div>

    <style>
        .site-card {
            display: block;
            padding: 1.5rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            border: 1px solid rgb(229 231 235);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .dark .site-card {
            background: rgb(17 24 39);
            border-color: rgb(55 65 81);
        }

        .site-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border-color: rgb(59 130 246);
        }

        .dark .site-card:hover {
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
        .site-card:hover .site-logo-wrap{
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

        .site-card:hover .site-badge {
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
    </style>
</x-filament-panels::page>
