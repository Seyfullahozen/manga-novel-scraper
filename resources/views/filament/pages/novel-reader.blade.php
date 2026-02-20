<x-filament-panels::page>
    <div class="nreader mx-auto max-w-3xl">
        <div class="rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 p-6">

            <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Novel Okuyucu
            </h1>

            @php($selectedNovel = $this->selectedNovel)

            @if($selectedNovel)
                <div class="nreader-meta mb-6">
                    <div class="nreader-meta-left">
                        <div class="nreader-meta-icon">
                            <x-heroicon-o-clock class="w-5 h-5" />
                        </div>

                        <div>
                            <div class="nreader-meta-title">
                                {{ $selectedNovel->title }}
                            </div>
                            <div class="nreader-meta-sub">
                                Novel bilgileri
                            </div>
                        </div>
                    </div>

                    <div class="nreader-meta-right">
                        <div class="nreader-chip">
                            <span class="nreader-chip-label">Eklenme</span>
                            <span class="nreader-chip-value">
                    {{ $selectedNovel->created_at?->format('d.m.Y H:i') ?? '-' }}
                </span>
                        </div>

                        <div class="nreader-chip">
                            <span class="nreader-chip-label">Son Scrape</span>
                            <span class="nreader-chip-value">
                    {{ $selectedNovel->scraped_at?->format('d.m.Y H:i') ?? '-' }}
                </span>
                        </div>
                    </div>
                </div>
            @endif


            {{-- Arama --}}
            <div class="nreader-box mb-4">
                <label class="nreader-label">Novel Ara:</label>
                <input wire:model.live.debounce.300ms="search"
                       placeholder="Novel ara..."
                       class="nreader-input w-full" />
            </div>

            {{-- Novel Seç --}}
            <div class="nreader-box mb-4">
                <label class="nreader-label">Novel Seçin:</label>
                <select wire:model.live="novelId" class="nreader-select">
                    <option value="">-- Bir novel seçin --</option>
                    @foreach($this->novels as $n)
                        <option value="{{ $n->id }}">{{ $n->title }}</option>
                    @endforeach
                </select>
            </div>

            @if($this->novels->isEmpty())
                <div class="nreader-warning">
                    Henüz hiç novel eklenmemiş. Terminal'den novel eklemek için:<br>
                    <code>php artisan novel:scrape "NOVEL_URL_BURAYA"</code>
                </div>
            @endif

            @if(!$novelId)
                <div class="nreader-info">
                    Bir novel seçince bölümler görünecek.
                </div>
            @else
                {{-- Bölüm Kontrolleri --}}
                <div class="flex flex-wrap gap-3 items-center mb-4">
                    <input type="number"
                           wire:model.live="chapterNumber"
                           placeholder="Bölüm numarası"
                           min="{{ $this->minChapter ?? 1 }}"
                           max="{{ $this->maxChapter ?? 999999 }}"
                           class="nreader-input">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Min: {{ $this->minChapter ?? '-' }} | Max: {{ $this->maxChapter ?? '-' }}
                    </div>
                    <br>
                </div>

                {{-- Navigasyon Butonları --}}
                <div class="flex gap-3 mb-4">
                    <button wire:click="goPrev"
                            @if($this->chapterNumber === null || $this->minChapter === null || $this->chapterNumber <= $this->minChapter) disabled @endif
                            class="nreader-btn w-full">
                        ← Önceki Bölüm
                    </button>
                    <button wire:click="goNext"
                            @if($this->chapterNumber >= $this->maxChapter) disabled @endif
                            class="nreader-btn w-full">
                        Sonraki Bölüm →
                    </button>
                </div>
            <br>

                {{-- İçerik --}}
                @php($chapter = $this->chapter)

                @if(!$chapter)
                    <div class="nreader-error">
                        Bu bölüm bulunamadı.
                    </div>
                @else
                    <div class="nreader-info">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {{ $chapter->title ?? ('Chapter ' . $chapter->chapter_number) }}
                        </h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Bölüm {{ $chapter->chapter_number }}
                        </p>
                    </div>

                    <div class="nreader-content">
                        {!! nl2br(e($chapter->content ?? '')) !!}
                    </div>
                @endif
            @endif
        </div>
    </div>

    <style>
        /* SADECE bu sayfayı etkilesin diye her şeyi .nreader altına aldım */
        .nreader .nreader-box{
            padding: 12px;
            border-radius: 10px;
            background: rgba(0,0,0,.03);
        }
        .dark .nreader .nreader-box{
            background: rgba(255,255,255,.03);
        }
        .nreader .nreader-label{
            display:block;
            margin-bottom: 6px;
            font-weight: 600;
            color: inherit;
        }
        .nreader .nreader-select{
            width: 100%;
            padding: 10px 12px;
            border: 1px solid rgba(0,0,0,.15);
            border-radius: 10px;
            background: white;
        }
        .dark .nreader .nreader-select{
            background: rgb(17 24 39);
            border-color: rgb(55 65 81);
            color: rgb(243 244 246);
        }
        .nreader .nreader-input{
            padding: 10px 12px;
            border: 1px solid rgba(0,0,0,.15);
            border-radius: 10px;
            background: white;
        }
        .dark .nreader .nreader-input{
            background: rgb(17 24 39);
            border-color: rgb(55 65 81);
            color: rgb(243 244 246);
        }
        .nreader .nreader-btn{
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid rgba(0,0,0,.15);
            background: rgb(31 41 55);
            color: white;
            cursor: pointer;
            transition: all 0.2s;
        }
        .nreader .nreader-btn:hover:not(:disabled){
            filter: brightness(1.1);
        }
        .nreader .nreader-btn:disabled{
            opacity: .5;
            cursor: not-allowed;
        }
        .nreader .nreader-warning{
            padding: 12px;
            border-radius: 10px;
            background: rgb(255 243 205);
            color: rgb(133 100 4);
            margin-bottom: 16px;
        }
        .dark .nreader .nreader-warning{
            background: rgb(113 63 18);
            color: rgb(254 240 138);
        }
        .nreader .nreader-error{
            padding: 12px;
            border-radius: 10px;
            background: rgb(255 235 238);
            color: rgb(198 40 40);
            margin-bottom: 16px;
        }
        .dark .nreader .nreader-error{
            background: rgb(127 29 29);
            color: rgb(254 202 202);
        }
        .nreader .nreader-info{
            padding: 12px;
            border-radius: 10px;
            background: rgba(0,0,0,.03);
            border-left: 4px solid rgb(31 41 55);
            margin-bottom: 12px;
        }
        .dark .nreader .nreader-info{
            background: rgba(255,255,255,.03);
            border-left-color: rgb(75 85 99);
        }
        .nreader .nreader-content{
            padding: 20px;
            border-radius: 10px;
            background: rgba(0,0,0,.02);
            border: 1px solid rgba(0,0,0,.08);
            line-height: 1.8;
            font-size: 16px;
            color: rgb(31 41 55);
        }
        .dark .nreader .nreader-content{
            background: rgba(255,255,255,.02);
            border-color: rgba(255,255,255,.08);
            color: rgb(229 231 235);
        }
        .nreader .nreader-meta{
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap: 14px;
            padding: 14px 14px;
            border-radius: 14px;
            background: rgba(0,0,0,.03);
            border: 1px solid rgba(0,0,0,.08);
        }
        .dark .nreader .nreader-meta{
            background: rgba(255,255,255,.03);
            border-color: rgb(55 65 81);
        }

        .nreader .nreader-meta-left{
            display:flex;
            align-items:center;
            gap: 12px;
            min-width: 0;
        }
        .nreader .nreader-meta-icon{
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display:flex;
            align-items:center;
            justify-content:center;
            background: rgba(31,41,55,.12);
            color: rgb(31 41 55);
        }
        .dark .nreader .nreader-meta-icon{
            background: rgba(255,255,255,.08);
            color: rgb(243 244 246);
        }

        .nreader .nreader-meta-title{
            font-weight: 700;
            color: rgb(17 24 39);
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 360px;
        }
        .dark .nreader .nreader-meta-title{
            color: rgb(243 244 246);
        }
        .nreader .nreader-meta-sub{
            font-size: 12px;
            color: rgb(107 114 128);
        }
        .dark .nreader .nreader-meta-sub{
            color: rgb(156 163 175);
        }

        .nreader .nreader-meta-right{
            display:flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content:flex-end;
        }
        .nreader .nreader-chip{
            padding: 8px 10px;
            border-radius: 12px;
            background: rgba(255,255,255,.9);
            border: 1px solid rgba(0,0,0,.08);
            display:flex;
            flex-direction:column;
            min-width: 160px;
        }
        .dark .nreader .nreader-chip{
            background: rgba(17,24,39,.6);
            border-color: rgb(55 65 81);
        }
        .nreader .nreader-chip-label{
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .4px;
            text-transform: uppercase;
            color: rgb(107 114 128);
        }
        .dark .nreader .nreader-chip-label{
            color: rgb(156 163 175);
        }
        .nreader .nreader-chip-value{
            font-size: 13px;
            font-weight: 600;
            color: rgb(17 24 39);
        }
        .dark .nreader .nreader-chip-value{
            color: rgb(243 244 246);
        }

        @media (max-width: 640px){
            .nreader .nreader-meta{
                flex-direction: column;
                align-items: stretch;
            }
            .nreader .nreader-meta-right{
                justify-content:flex-start;
            }
            .nreader .nreader-chip{
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
