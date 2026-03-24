@extends('site.layouts.app')
@section('title', 'Novel Listesi')

@section('content')
    <div class="novel-section">
        <div class="section-header">
            @php
                $newNovels
            @endphp
            <h1>Novel Listesi <span class="chapter-count">({{ $newNovels->count() }})</span></h1>
        </div>
        <div class="grid">
            @forelse($newNovels as $novel)
                @php
                    $latest = $novel->latestChapters->first() ?? null;
                @endphp

                <div id="novel-{{ $novel->id }}"
                     class="card {{ optional($novel->scraped_at)->gt(now()->subDay()) ? 'new-episode' : '' }}">

                    <a class="card__inner novel-link"
                       href="{{ route('site.novel.show', $novel) }}"
                       title="{{ e($novel->title) }}">
                        @if(optional($novel->scraped_at)->gt(now()->subDay()))
                            <span class="badge badge--new">yeni</span>
                        @endif
                        <img width="40" height="40" src="{{ $novel->getCoverUrl() }}" alt="{{ e($novel->title) }}"/>
                        <span class="card__title">{{ \Illuminate\Support\Str::limit($novel->title, 38) }}</span>
                    </a>

                    @if($latest)
                        <a class="card__chapter chapter-link"
                           href="{{ route('site.novel.chapter', ['novel' => $novel, 'chapter' => $latest->chapter_number]) }}">
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
                    <span class="card__title" style="opacity:.8;">Henüz hiç novel yok</span>
                </div>
            @endforelse
        </div>
    </div>
{{--    @include('site.partials.popular-content')--}}
@endsection

@push('styles')
    <style>
        .section-header h1 {
            font-size: 15px;
        }
    </style>
@endpush
