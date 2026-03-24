@extends('site.layouts.app')

@section('title', $novel->title . ' - Bölüm ' . $selectedChapter->chapter_number)

@section('content')
    @php
        $qs = [];
        if (($srcLang ?? 'en') !== 'en')             $qs['src'] = $srcLang;
        if (($tgtLang ?? 'original') !== 'original') $qs['tgt'] = $tgtLang;
        $qsStr = $qs ? ('?' . http_build_query($qs)) : '';

        $currentIndex = $chapters->search(fn($c) => $c->chapter_number === $selectedChapter->chapter_number);
        $prev = $currentIndex > 0 ? $chapters[$currentIndex - 1] : null;
        $next = ($currentIndex !== false && $currentIndex < $chapters->count() - 1)
                    ? $chapters[$currentIndex + 1]
                    : null;

        $safeContent = $readerContent ?? '';
    @endphp

    {{-- ÜST: Başlık + Meta + Dil Seçimi --}}
    <div class="section-tab" style="text-align:unset; padding:10px; clear:both;">
        <h3 class="title">
            <span class="blue">{{ \Illuminate\Support\Str::limit($novel->title, 80) }}</span>
        </h3>

        <div class="reader-meta">
            <a href="{{ route('site.novel.show', $novel) }}">← Detay sayfasına dön</a>
            <span class="sep">|</span>
            <span class="chapter-info">
                Bölüm: <b>#{{ $selectedChapter->chapter_number }}</b>
                <span>({{ $chapters->count() }} bölüm)</span>
            </span>
            <span class="sep">|</span>
            <span class="updated-at">
                Son güncelleme: {{ optional($novel->scraped_at)->format('d.m.Y H:i') ?? '-' }}
            </span>
        </div>

        {{-- Dil seçim formu --}}
        <form method="GET"
              action="{{ route('site.novel.chapter', ['novel' => $novel, 'chapter' => $selectedChapter->chapter_number]) }}"
              class="reader-lang-form">
            <label>Kaynak</label>
            <select name="src">
                @foreach($languages as $code => $label)
                    <option value="{{ $code }}" @selected($srcLang === $code)>{{ $label }}</option>
                @endforeach
            </select>

            <span class="reader-lang-arrow">→</span>

            <label>Hedef</label>
            <select name="tgt">
                @foreach($tgtOptions as $code => $label)
                    <option value="{{ $code }}" @selected($tgtLang === $code)>{{ $label }}</option>
                @endforeach
            </select>

            <button type="submit" class="btn-apply">Uygula</button>

            @if(($tgtLang ?? 'original') !== 'original')
                <span class="reader-lang-info">
                    {{ $languages[$srcLang] ?? $srcLang }} → {{ $languages[$tgtLang] ?? $tgtLang }}
                </span>
            @endif
        </form>

        @if(($translationPending ?? false) === true)
            <div class="reader-translation-pending">
                Çeviri hazırlanıyor… (şimdilik orijinal metin gösteriliyor)
            </div>
        @endif
    </div>

    <br style="clear:both"/>

    {{-- TAB MENÜ --}}
    <div class="section-tab">
        <ul>
            <li class="active">
                <a href="javascript:;">
                    <span class="fa fa-book"></span> BÖLÜM İÇERİĞİ
                </a>
            </li>
            <li>
                <a href="{{ route('site.novel.show', $novel) }}">
                    <span class="fa fa-info-circle"></span> NOVEL DETAY
                </a>
            </li>
        </ul>
    </div>

    {{-- OKUMA ALANI --}}
    <div class="reader-section">

        {{-- Bölüm başlığı --}}
        <div class="novel-section-header">
            <h2>
                Bölüm #{{ $selectedChapter->chapter_number }}
                @if($selectedChapter->title)
                    <span
                        class="chapter-sub-title">— {{ \Illuminate\Support\Str::limit($selectedChapter->title, 80) }}</span>
                @endif
            </h2>
        </div>

        {{-- NAV BAR (üst) --}}
        <div class="reader-nav">
            <a href="{{ $prev ? route('site.novel.chapter', ['novel' => $novel, 'chapter' => $prev->chapter_number]) . $qsStr : '#' }}"
               class="btn-nav {{ $prev ? '' : 'disabled' }}">← Önceki</a>

            {{-- Bölüm select --}}
            <form method="GET"
                  action="#"
                  id="chapter-select-form-top"
                  class="reader-chapter-select-form">
                <select name="_chapter_redirect"
                        class="reader-chapter-select"
                        onchange="chapterSelectGo(this, '{{ $qsStr }}')">
                    @foreach($chapters as $ch)
                        <option
                            value="{{ route('site.novel.chapter', ['novel' => $novel, 'chapter' => $ch->chapter_number]) }}"
                            @selected($ch->chapter_number === $selectedChapter->chapter_number)>
                            Bölüm
                            #{{ $ch->chapter_number }}{{ $ch->title ? ' — ' . \Illuminate\Support\Str::limit($ch->title, 40) : '' }}
                        </option>
                    @endforeach
                </select>
            </form>

            <a href="{{ $next ? route('site.novel.chapter', ['novel' => $novel, 'chapter' => $next->chapter_number]) . $qsStr : '#' }}"
               class="btn-nav {{ $next ? '' : 'disabled' }}">Sonraki →</a>
        </div>

        {{-- İçerik --}}
        <div class="reader-content">
            {!! nl2br(e($safeContent)) !!}
        </div>

        {{-- NAV BAR (alt) --}}
        <div class="reader-nav">
            <a href="{{ $prev ? route('site.novel.chapter', ['novel' => $novel, 'chapter' => $prev->chapter_number]) . $qsStr : '#' }}"
               class="btn-nav {{ $prev ? '' : 'disabled' }}">← Önceki</a>

            <form method="GET"
                  action="#"
                  id="chapter-select-form-bottom"
                  class="reader-chapter-select-form">
                <select name="_chapter_redirect"
                        class="reader-chapter-select"
                        onchange="chapterSelectGo(this, '{{ $qsStr }}')">
                    @foreach($chapters as $ch)
                        <option
                            value="{{ route('site.novel.chapter', ['novel' => $novel, 'chapter' => $ch->chapter_number]) }}"
                            @selected($ch->chapter_number === $selectedChapter->chapter_number)>
                            Bölüm
                            #{{ $ch->chapter_number }}{{ $ch->title ? ' — ' . \Illuminate\Support\Str::limit($ch->title, 40) : '' }}
                        </option>
                    @endforeach
                </select>
            </form>

            <a href="{{ $next ? route('site.novel.chapter', ['novel' => $novel, 'chapter' => $next->chapter_number]) . $qsStr : '#' }}"
               class="btn-nav {{ $next ? '' : 'disabled' }}">Sonraki →</a>
        </div>
    </div>

    @include('site.partials.comments', [
        'comments'            => $comments,
        'contentReactions'    => $contentReactions,
        'userContentReaction' => $userContentReaction,
        'commentableType'     => $commentableType,
        'commentableId'       => $commentableId,
        'reactableType'       => 'novel',
        'reactableId'         => $novel->id,
    ])
@endsection

@push('scripts')
    <script>
        function chapterSelectGo(select, qsStr) {
            var url = select.value;
            if (url) window.location.href = url + qsStr;
        }
    </script>
    @if(($translationPending ?? false) === true)
        <script>
            setTimeout(() => window.location.reload(), 3000);
        </script>
    @endif
@endpush
