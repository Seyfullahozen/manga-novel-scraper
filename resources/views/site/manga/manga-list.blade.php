@extends('site.layouts.app')
@section('title', 'Manga Listesi')

@section('content')
    <div class="novel-section">
        <div class="section-header">
            @php
                $newMangas
            @endphp
            <h1>Manga Listesi <span class="chapter-count">({{ $newMangas->count() }})</span></h1>
        </div>
        <div class="grid">
            @forelse($newMangas as $manga)
                @php
                    $latest = $manga->latestChapters->first() ?? null;
                @endphp

                <div id="manga-{{ $manga->id }}"
                     class="card {{ optional($manga->scraped_at)->gt(now()->subDay()) ? 'new-episode' : '' }}">

                    <a class="card__inner novel-link"
                       href="{{ route('site.manga.show', $manga) }}"
                       title="{{ e($manga->title) }}">
                        @if(optional($manga->scraped_at)->gt(now()->subDay()))
                            <span class="badge badge--new">yeni</span>
                        @endif
                        <img width="40" height="40" src="{{ $manga->getCoverUrl() }}" alt="{{ e($manga->title) }}"/>
                        <span class="card__title">{{ \Illuminate\Support\Str::limit($manga->title, 38) }}</span>
                    </a>

                    @if($latest)
                        <a class="card__chapter chapter-link"
                           href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $latest->chapter_number]) }}">
                            Son Bölüm: #{{ $latest->chapter_number }}
                            @if($latest->title)
                                — {{ \Illuminate\Support\Str::limit($latest->title, 40) }}
                            @endif
                            <i class="fa fa-angle-right" style="float:right; opacity:.6;"></i>
                        </a>
                    @else
                        <span class="card__chapter">Henüz bölüm yok</span>
                    @endif
                </div>
            @empty
                <div class="card card--empty">
                    <span class="card__title" style="opacity:.8;">Henüz hiç manga yok</span>
                </div>
            @endforelse
        </div>

        <div style="margin-top:16px;">
{{--            {{ $newMangas->links() }}--}}
        </div>
    </div>
@endsection

@push('styles')
    <style>
        .section-header h1 {
            font-size: 15px;
        }
    </style>
@endpush
