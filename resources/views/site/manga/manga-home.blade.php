@extends('site.layouts.app')
@section('title', 'Mangalar — Son Eklenenler')

@section('content')
    <div class="novel-section">
        <div class="novel-section-header">
            <h2>Son Eklenen Mangalar</h2>
        </div>
        <div class="grid">
            @forelse($mangas as $manga)
                @php $latest = $manga->latestChapters->first() ?? null; @endphp
                <div class="card {{ optional($manga->scraped_at)->gt(now()->subDay()) ? 'new-episode' : '' }}">
                    <a class="card__inner novel-link"
                       href="{{ route('site.manga.show', $manga) }}"
                       title="{{ e($manga->title) }}">
                        @if(optional($manga->scraped_at)->gt(now()->subDay()))
                            <span class="badge badge--new">yeni</span>
                        @endif
                        <img width="40" height="40"
                             src="{{ $manga->getCoverUrl() ?? asset('assets/images/img.png') }}"
                             alt="{{ e($manga->title) }}"/>
                        <span class="card__title">{{ \Illuminate\Support\Str::limit($manga->title, 38) }}</span>
                    </a>
                    @if($latest)
                        <a class="card__chapter chapter-link"
                           href="{{ route('site.manga.chapter', ['manga' => $manga, 'chapter' => $latest->chapter_number]) }}">
                            Son Bölüm: #{{ $latest->chapter_number }}
                            <i class="fa fa-angle-right" style="float:right;opacity:.6;"></i>
                        </a>
                    @else
                        <span class="card__chapter">Henüz bölüm yok</span>
                    @endif
                </div>
            @empty
                <div class="card card--empty">
                    <span class="card__title">Henüz manga yok</span>
                </div>
            @endforelse
        </div>
        <div style="margin-top:16px;">{{ $mangas->links() }}</div>
    </div>
    @include('site.partials.popular-content')
@endsection
