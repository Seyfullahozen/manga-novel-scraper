@extends('site.layouts.app')

@section('title', 'Anasayfa')

@section('content')
    @include('site.partials.main-content')

    <div class="section-left" style="margin-top: 22px;">
        <div class="archives">
            <h2>Yeni Noveller mi keşfetmek istiyorsun?</h2>
            <p>Günden güne yenilenen Novel arşivimize göz atabilir, yeni Noveller keşfedebilirsin.</p>
            <div class="tags">
                {{-- buraya tag'ler gelecek --}}
            </div>
        </div>
    </div>

    <div class="clear"></div>
@endsection
