<x-filament-panels::page>
    <div class="mreader mx-auto max-w-3xl">
        <div class="rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 p-6">

            <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Manga Okuyucu
            </h1>

            @php($selectedManga = $this->selectedManga)

            @if($selectedManga)
                <div class="mreader-meta mb-6">
                    <div class="mreader-meta-left">
                        <div class="mreader-meta-icon">
                            <x-heroicon-o-clock class="w-5 h-5" />
                        </div>

                        <div>
                            <div class="mreader-meta-title">
                                {{ $selectedManga->title }}
                            </div>
                            <div class="mreader-meta-sub">
                                Manga bilgileri
                            </div>
                        </div>
                    </div>

                    <div class="mreader-meta-right">
                        <div class="mreader-chip">
                            <span class="mreader-chip-label">Eklenme</span>
                            <span class="mreader-chip-value">
                    {{ $selectedManga->created_at?->format('d.m.Y H:i') ?? '-' }}
                </span>
                        </div>

                        <div class="mreader-chip">
                            <span class="mreader-chip-label">Son Scrape</span>
                            <span class="mreader-chip-value">
                    {{ $selectedManga->scraped_at?->format('d.m.Y H:i') ?? '-' }}
                </span>
                        </div>
                    </div>
                </div>
            @endif

            {{-- Arama --}}
            <div class="mreader-box mb-4">
                <label class="mreader-label">Manga Ara:</label>
                <input wire:model.live.debounce.300ms="search"
                       placeholder="Manga ara..."
                       class="mreader-input w-full" />
            </div>

            {{-- Manga Seç --}}
            <div class="mreader-box mb-4">
                <label class="mreader-label">Manga Seçin:</label>
                <select wire:model.live="mangaId" class="mreader-select">
                    <option value="">-- Bir manga seçin --</option>
                    @foreach($this->mangas as $manga)
                        <option value="{{ $manga->id }}">{{ $manga->title }}</option>
                    @endforeach
                </select>
            </div>

            @if($this->mangas->isEmpty())
                <div class="mreader-warning">
                    Henüz hiç manga eklenmemiş. Terminal'den manga eklemek için:<br>
                    <code>php artisan manga:scrape "MANGA_URL_BURAYA"</code>
                </div>
            @endif

            @if(!$mangaId)
                <div class="mreader-info">
                    Bir manga seçince bölümler görünecek.
                </div>
            @else
                {{-- Bölüm Kontrolleri --}}
                <div class="flex flex-wrap gap-3 items-center mb-4">
                    <input type="number"
                           wire:model.live="chapterNumber"
                           placeholder="Bölüm numarası"
                           min="{{ $this->minChapter ?? 1 }}"
                           max="{{ $this->maxChapter ?? 999999 }}"
                           class="mreader-input">

                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Min: {{ $this->minChapter ?? '-' }} | Max: {{ $this->maxChapter ?? '-' }}
                    </div>
                </div>

                {{-- Navigasyon Butonları --}}
                <div class="flex gap-3 mb-4">
                    <button wire:click="goPrev"
                            @if($this->chapterNumber <= $this->minChapter) disabled @endif
                            class="mreader-btn w-full">
                        ← Önceki Bölüm
                    </button>
                    <button wire:click="goNext"
                            @if($this->chapterNumber >= $this->maxChapter) disabled @endif
                            class="mreader-btn w-full">
                        Sonraki Bölüm →
                    </button>
                </div>

                {{-- İçerik --}}
                @php($chapter = $this->chapter)

                @if(!$chapter)
                    <div class="mreader-info">
                        Bu bölüm bulunamadı.
                    </div>
                @else
                    <div class="mreader-info">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {{ $chapter->title ?? ('Chapter ' . $chapter->chapter_number) }}
                        </h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ $chapter->images->count() }} görsel
                        </p>
                    </div>

                    <div class="space-y-3" id="imagesContainer">
                        @foreach($chapter->images as $image)
                            <img src="{{ $image->url }}"
                                 alt="{{ $image->title }}"
                                 loading="lazy"
                                 class="w-full block rounded-lg">
                        @endforeach
                    </div>
                @endif
            @endif
        </div>
    </div>

    <style>
        /* SADECE bu sayfayı etkilesin diye her şeyi .mreader altına aldım */
        .mreader .mreader-box{
            padding: 12px;
            border-radius: 10px;
            background: rgba(0,0,0,.03);
        }
        .dark .mreader .mreader-box{
            background: rgba(255,255,255,.03);
        }
        .mreader .mreader-label{
            display:block;
            margin-bottom: 6px;
            font-weight: 600;
            color: inherit;
        }
        .mreader .mreader-select{
            width: 100%;
            padding: 10px 12px;
            border: 1px solid rgba(0,0,0,.15);
            border-radius: 10px;
            background: white;
        }
        .dark .mreader .mreader-select{
            background: rgb(17 24 39);
            border-color: rgb(55 65 81);
            color: rgb(243 244 246);
        }
        .mreader .mreader-input{
            padding: 10px 12px;
            border: 1px solid rgba(0,0,0,.15);
            border-radius: 10px;
            background: white;
        }
        .dark .mreader .mreader-input{
            background: rgb(17 24 39);
            border-color: rgb(55 65 81);
            color: rgb(243 244 246);
        }
        .mreader .mreader-btn{
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,.15);
            background: rgb(31 41 55);
            color: white;
            cursor: pointer;
            transition: all 0.2s;
        }
        .mreader .mreader-btn:hover:not(:disabled){
            filter: brightness(1.1);
        }
        .mreader .mreader-btn:disabled{
            opacity: .5;
            cursor: not-allowed;
        }
        .mreader .mreader-warning{
            padding: 12px;
            border-radius: 10px;
            background: rgb(255 243 205);
            color: rgb(133 100 4);
            margin-bottom: 16px;
        }
        .dark .mreader .mreader-warning{
            background: rgb(113 63 18);
            color: rgb(254 240 138);
        }
        .mreader .mreader-info{
            padding: 12px;
            border-radius: 10px;
            background: rgba(0,0,0,.03);
            border-left: 4px solid rgb(31 41 55);
            margin-bottom: 12px;
        }
        .dark .mreader .mreader-info{
            background: rgba(255,255,255,.03);
            border-left-color: rgb(75 85 99);
        }
        .mreader .mreader-meta{
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap: 14px;
            padding: 14px 14px;
            border-radius: 14px;
            background: rgba(0,0,0,.03);
            border: 1px solid rgba(0,0,0,.08);
        }
        .dark .mreader .mreader-meta{
            background: rgba(255,255,255,.03);
            border-color: rgb(55 65 81);
        }

        .mreader .mreader-meta-left{
            display:flex;
            align-items:center;
            gap: 12px;
            min-width: 0;
        }
        .mreader .mreader-meta-icon{
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display:flex;
            align-items:center;
            justify-content:center;
            background: rgba(31,41,55,.12);
            color: rgb(31 41 55);
        }
        .dark .mreader .mreader-meta-icon{
            background: rgba(255,255,255,.08);
            color: rgb(243 244 246);
        }

        .mreader .mreader-meta-title{
            font-weight: 700;
            color: rgb(17 24 39);
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 360px;
        }
        .dark .mreader .mreader-meta-title{
            color: rgb(243 244 246);
        }
        .mreader .mreader-meta-sub{
            font-size: 12px;
            color: rgb(107 114 128);
        }
        .dark .mreader .mreader-meta-sub{
            color: rgb(156 163 175);
        }

        .mreader .mreader-meta-right{
            display:flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content:flex-end;
        }
        .mreader .mreader-chip{
            padding: 8px 10px;
            border-radius: 12px;
            background: rgba(255,255,255,.9);
            border: 1px solid rgba(0,0,0,.08);
            display:flex;
            flex-direction:column;
            min-width: 160px;
        }
        .dark .mreader .mreader-chip{
            background: rgba(17,24,39,.6);
            border-color: rgb(55 65 81);
        }
        .mreader .mreader-chip-label{
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .4px;
            text-transform: uppercase;
            color: rgb(107 114 128);
        }
        .dark .mreader .mreader-chip-label{
            color: rgb(156 163 175);
        }
        .mreader .mreader-chip-value{
            font-size: 13px;
            font-weight: 600;
            color: rgb(17 24 39);
        }
        .dark .mreader .mreader-chip-value{
            color: rgb(243 244 246);
        }

        @media (max-width: 640px){
            .mreader .mreader-meta{
                flex-direction: column;
                align-items: stretch;
            }
            .mreader .mreader-meta-right{
                justify-content:flex-start;
            }
            .mreader .mreader-chip{
                min-width: unset;
                width: 100%;
            }
        }
    </style>

    @script
    <script>
        $wire.on('url-update', (params) => {
            const qs = new URLSearchParams(params).toString();
            const newUrl = window.location.pathname + (qs ? ('?' + qs) : '');
            window.history.pushState({}, '', newUrl);
        });
    </script>
    @endscript
</x-filament-panels::page>
