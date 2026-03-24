@extends('site.layouts.app')
@section('title', $manga->title . ' — Bölüm #' . $selected->chapter_number)

@section('content')
    <div class="reader-section">

        <div class="novel-section-header">
            <h1>
                <a href="{{ route('site.manga.show', $manga) }}">{{ $manga->title }}</a>
                <span class="chapter-sub-title">Bölüm #{{ $selected->chapter_number }}
                    @if($selected->title)
                        — {{ $selected->title }}
                    @endif
            </span>
            </h1>
        </div>

        {{-- Navigasyon --}}
        <div class="reader-nav">
            @if($prev)
                <a class="btn-nav"
                   href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $prev->chapter_number]) }}">
                    ← Önceki
                </a>
            @else
                <span class="btn-nav disabled">← Önceki</span>
            @endif

            <form class="reader-chapter-select-form" method="GET">
                <select class="reader-chapter-select"
                        onchange="window.location='{{ route('site.manga.chapter', ['manga'=>$manga,'chapter'=>'__N__']) }}'.replace('__N__', this.value)">
                    @foreach($manga->chapters as $ch)
                        <option value="{{ $ch->chapter_number }}"
                            {{ $ch->chapter_number == $selected->chapter_number ? 'selected' : '' }}>
                            Bölüm #{{ $ch->chapter_number }}
                            @if($ch->title)
                                — {{ Str::limit($ch->title, 30) }}
                            @endif
                        </option>
                    @endforeach
                </select>
            </form>

            @if($next)
                <a class="btn-nav"
                   href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $next->chapter_number]) }}">
                    Sonraki →
                </a>
            @else
                <span class="btn-nav disabled">Sonraki →</span>
            @endif
        </div>

        {{-- Manga görselleri --}}
        <div class="manga-reader">
            @forelse($images as $image)
                <div class="manga-reader__page">
                    <img src="{{ $image->getUrl() }}"
                         alt="Sayfa {{ $image->getCustomProperty('order') }}"
                         class="manga-reader__img"
                         loading="lazy">
                </div>
            @empty
                <div class="manga-reader__empty">
                    <span class="fa fa-image"></span>
                    Bu bölüm için görsel bulunamadı.
                </div>
            @endforelse
        </div>

        {{-- Alt navigasyon --}}
        <div class="reader-nav" style="margin-top:20px;">
            @if($prev)
                <a class="btn-nav"
                   href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $prev->chapter_number]) }}">←
                    Önceki</a>
            @else
                <span class="btn-nav disabled">← Önceki</span>
            @endif

            <a class="btn-nav" href="{{ route('site.manga.show', $manga) }}">Bölüm Listesi</a>

            @if($next)
                <a class="btn-nav"
                   href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $next->chapter_number]) }}">Sonraki
                    →</a>
            @else
                <span class="btn-nav disabled">Sonraki →</span>
            @endif
        </div>
    </div>

    @include('site.partials.comments', [
        'comments'            => $comments,
        'contentReactions'    => $contentReactions,
        'userContentReaction' => $userContentReaction,
        'commentableType'     => $commentableType,
        'commentableId'       => $commentableId,
        'reactableType'       => 'manga',
        'reactableId'         => $manga->id,
    ])

@endsection
