@extends('site.layouts.app')

@section('title', $query ? '"' . $query . '" — Arama Sonuçları' : 'Arama')

@section('content')
    <div class="search-page">

        <div class="search-page__header">
            <h1 class="search-page__title">
                @if($query)
                    "<span>{{ $query }}</span>" için sonuçlar
                @else
                    Arama
                @endif
            </h1>

            <form class="search-page__form" action="{{ route('site.search') }}" method="get">
                <input
                    type="text"
                    name="q"
                    value="{{ $query }}"
                    placeholder="Novel veya manga ara..."
                    autocomplete="off"
                    autofocus
                >
                <button type="submit"><span class="fa fa-search"></span></button>
            </form>
        </div>

        @if($query && strlen($query) < 2)
            <p class="search-page__notice">En az 2 karakter girin.</p>
        @elseif($query && $novels->isEmpty() && $mangas->isEmpty())
            <p class="search-page__notice">
                "<strong>{{ $query }}</strong>" için sonuç bulunamadı.
            </p>
        @elseif($query)

            {{-- NOVELLER --}}
            @if($novels->isNotEmpty())
                <section class="search-section">
                    <h2 class="search-section__title">
                        Noveller
                        <span class="search-section__count">{{ $novels->count() }} sonuç</span>
                    </h2>
                    <div class="search-results-grid">
                        @foreach($novels as $novel)
                            <a class="search-card" href="{{ route('site.novel.show', $novel->slug) }}">
                                <div class="search-card__cover">
                                    @if($novel->getCoverUrl())
                                        <img src="{{ $novel->getCoverUrl() }}" alt="{{ $novel->title }}" loading="lazy">
                                    @else
                                        <div class="search-card__no-cover">N</div>
                                    @endif
                                </div>
                                <div class="search-card__info">
                                    <span class="search-card__type search-card__type--novel">Novel</span>
                                    <span class="search-card__name">{{ $novel->title }}</span>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </section>
            @endif

            {{-- MANGALAR --}}
            @if($mangas->isNotEmpty())
                <section class="search-section">
                    <h2 class="search-section__title">
                        Mangalar
                        <span class="search-section__count">{{ $mangas->count() }} sonuç</span>
                    </h2>
                    <div class="search-results-grid">
                        @foreach($mangas as $manga)
                            <a class="search-card" href="{{ route('site.manga.show', $manga->slug) }}">
                                <div class="search-card__cover">
                                    @if($manga->getCoverUrl())
                                        <img src="{{ $manga->getCoverUrl() }}" alt="{{ $manga->title }}" loading="lazy">
                                    @else
                                        <div class="search-card__no-cover">M</div>
                                    @endif
                                </div>
                                <div class="search-card__info">
                                    <span class="search-card__type search-card__type--manga">Manga</span>
                                    <span class="search-card__name">{{ $manga->title }}</span>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </section>
            @endif

        @endif

    </div>

    <style>
        .search-page {
            max-width: 960px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        .search-page__header {
            margin-bottom: 2rem;
        }
        .search-page__title {
            font-size: 1.4rem;
            margin-bottom: 1rem;
            color: var(--text, #eee);
        }
        .search-page__title span {
            color: var(--accent, #7c6af7);
        }
        .search-page__form {
            display: flex;
            gap: .5rem;
        }
        .search-page__form input {
            flex: 1;
            padding: .6rem 1rem;
            border-radius: 6px;
            border: 1px solid #333;
            background: #1a1a2e;
            color: #eee;
            font-size: 1rem;
        }
        .search-page__form button {
            padding: .6rem 1.2rem;
            border-radius: 6px;
            background: var(--accent, #7c6af7);
            color: #fff;
            border: none;
            cursor: pointer;
        }
        .search-page__notice {
            color: #aaa;
            margin-top: 2rem;
            font-size: 1rem;
        }
        .search-section {
            margin-bottom: 2.5rem;
        }
        .search-section__title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: #ccc;
            display: flex;
            align-items: center;
            gap: .6rem;
            border-bottom: 1px solid #2a2a3e;
            padding-bottom: .5rem;
        }
        .search-section__count {
            font-size: .8rem;
            color: #777;
            font-weight: normal;
        }
        .search-results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
        }
        .search-card {
            display: flex;
            flex-direction: column;
            background: #16161e;
            border-radius: 8px;
            overflow: hidden;
            text-decoration: none;
            transition: transform .15s, box-shadow .15s;
            border: 1px solid #2a2a3e;
        }
        .search-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 16px rgba(0,0,0,.4);
        }
        .search-card__cover {
            aspect-ratio: 2/3;
            background: #1f1f2e;
            overflow: hidden;
        }
        .search-card__cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .search-card__no-cover {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #555;
        }
        .search-card__info {
            padding: .5rem .6rem .6rem;
            display: flex;
            flex-direction: column;
            gap: .25rem;
        }
        .search-card__type {
            font-size: .65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .05em;
            padding: .1rem .35rem;
            border-radius: 3px;
            width: fit-content;
        }
        .search-card__type--novel  { background: #2d1f5e; color: #a78bfa; }
        .search-card__type--manga  { background: #1f3a2d; color: #6ee7b7; }
        .search-card__name {
            font-size: .85rem;
            color: #ddd;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    </style>
@endsection
