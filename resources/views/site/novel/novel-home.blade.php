@extends('site.layouts.app')
@section('title', 'Noveller — Son Eklenenler')

@section('content')
    <div class="novel-section">
        <div class="novel-section-header">
            <h2>Son Eklenen Noveller</h2>
        </div>
        <div class="grid">
            @forelse($novels as $novel)
                @php $latest = $novel->latestChapters->first() ?? null; @endphp
                <div class="card {{ optional($novel->scraped_at)->gt(now()->subDay()) ? 'new-episode' : '' }}">
                    <a class="card__inner novel-link"
                       href="{{ route('site.novel.show', $novel) }}"
                       title="{{ e($novel->title) }}">
                        @if(optional($novel->scraped_at)->gt(now()->subDay()))
                            <span class="badge badge--new">yeni</span>
                        @endif
                        <img width="40" height="40"
                             src="{{ $novel->getCoverUrl() ?? asset('assets/images/img.png') }}"
                             alt="{{ e($novel->title) }}"/>
                        <span class="card__title">{{ \Illuminate\Support\Str::limit($novel->title, 38) }}</span>
                    </a>
                    @if($latest)
                        <a class="card__chapter chapter-link"
                           href="{{ route('site.novel.chapter', ['novel' => $novel, 'chapter' => $latest->chapter_number]) }}">
                            Son Bölüm: #{{ $latest->chapter_number }}
                            <i class="fa fa-angle-right" style="float:right;opacity:.6;"></i>
                        </a>
                    @else
                        <span class="card__chapter">Henüz bölüm yok</span>
                    @endif
                </div>
            @empty
                <div class="card card--empty">
                    <span class="card__title">Henüz novel yok</span>
                </div>
            @endforelse
        </div>
        <div style="margin-top:16px;">{{ $novels->links() }}</div>
    </div>


    @include('site.partials.popular-content')
@endsection
