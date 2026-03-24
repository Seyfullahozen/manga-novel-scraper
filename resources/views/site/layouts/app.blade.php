<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Novel')</title>

    <link rel="icon" href="{{ asset('assets/images/favico_.png') }}" type="image/x-icon">
    <link rel="shortcut icon" href="{{ asset('assets/images/favico_.png') }}" type="image/x-icon">

    <link rel="stylesheet" href="{{ asset('assets/styles/auth.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/az.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/comments.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/dropdown.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/list.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/main.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/novel.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/profile.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/reader.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/show.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/styles/social.css') }}">
    @stack('styles')
</head>
<body>

<div class="container" id="container">
    <div class="header-top">
        <div class="quote">
            &quot;Yeni yetiştirdiğim İlkbahar ve Sonbahar Ağustos Böceği işe yararsa, bir sonraki hayatımda da iblis
            olmaya devam edeceğim !.&quot; - Fang Yuan
        </div>
    </div>
    @include('site.partials.auth-modals')

    <div class="content">
        {{-- SOL: Sidebar --}}
        @include('site.partials.left-sidebar')

        {{-- SAĞ: Main --}}
        <div class="right">
            @include('site.partials.header-menu')

            @isset($showAzFilter)
                @include('site.partials.az-filter')
            @endisset

            @yield('content')

            <div class="clear"></div>
        </div>
        @include('site.partials.footer')
    </div>

</div>

<div class="yukari-cik">
    <img src="{{ asset('assets/icons/up-long-solid-full.svg') }}" alt="">
    <span class="yukari-cik-yazi">Yukarı Çık</span>
</div>

@include('site.partials.scripts')
@stack('scripts')
</body>
</html>
