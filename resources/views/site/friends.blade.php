@extends('site.layouts.app')
@section('title', 'Arkadaşlarım')

@section('content')
    <div class="novel-section">

        <div class="my-comments-header">
            <h2 class="my-comments-header__title">
                <span class="fa fa-users"></span> Arkadaşlarım
            </h2>
            <div class="my-comments-tabs">
                <button class="my-comments-tab my-comments-tab--active" data-tab="following">
                    Takip Ettiklerim
                    <span class="my-comments-tab__count">{{ $following->count() }}</span>
                </button>
                <button class="my-comments-tab" data-tab="followers">
                    Takipçilerim
                    <span class="my-comments-tab__count">{{ $followers->count() }}</span>
                </button>
                <button class="my-comments-tab" data-tab="blocked">
                    Engellediklerim
                    <span class="my-comments-tab__count">{{ $blocked->count() }}</span>
                </button>
            </div>
        </div>

        {{-- Arama --}}
        <div class="friends-search-wrap">
            <input type="text" id="userSearchInput" class="friends-search-input"
                   placeholder="Kullanıcı ara..." autocomplete="off">
            <div class="friends-search-results" id="userSearchResults" style="display:none"></div>
        </div>

        {{-- Takip Ettiklerim --}}
        <div class="friends-panel" id="tab-following">
            @forelse($following as $u)
                @include('site.partials.user-card', ['u' => $u])
            @empty
                <div class="comment-empty"><span class="fa fa-user-plus"></span> Henüz kimseyi takip etmiyorsunuz.</div>
            @endforelse
        </div>

        {{-- Takipçilerim --}}
        <div class="friends-panel friends-panel--hidden" id="tab-followers">
            @forelse($followers as $u)
                @include('site.partials.user-card', ['u' => $u])
            @empty
                <div class="comment-empty"><span class="fa fa-users"></span> Henüz takipçiniz yok.</div>
            @endforelse
        </div>

        {{-- Engellediklerim --}}
        <div class="friends-panel friends-panel--hidden" id="tab-blocked">
            @forelse($blocked as $u)
                @include('site.partials.user-card', ['u' => $u])
            @empty
                <div class="comment-empty"><span class="fa fa-ban"></span> Engellediğiniz kullanıcı yok.</div>
            @endforelse
        </div>

    </div>
@endsection

@push('scripts')
    <script>
        (function () {
            // Sekmeler
            document.querySelectorAll('.my-comments-tab[data-tab]').forEach(function(tab) {
                tab.addEventListener('click', function() {
                    document.querySelectorAll('.my-comments-tab').forEach(function(t){ t.classList.remove('my-comments-tab--active'); });
                    document.querySelectorAll('.friends-panel').forEach(function(p){ p.classList.add('friends-panel--hidden'); });
                    tab.classList.add('my-comments-tab--active');
                    document.getElementById('tab-' + tab.dataset.tab).classList.remove('friends-panel--hidden');
                });
            });

            // Kullanıcı arama
            var searchInput   = document.getElementById('userSearchInput');
            var searchResults = document.getElementById('userSearchResults');
            var searchTimer   = null;

            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimer);
                var q = this.value.trim();
                if (q.length < 2) { searchResults.style.display = 'none'; return; }

                searchTimer = setTimeout(function() {
                    fetch('{{ route('user.search') }}?q=' + encodeURIComponent(q), {
                        headers: { 'Accept': 'application/json' }
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(users) {
                            if (!users.length) {
                                searchResults.innerHTML = '<div class="friends-search-empty">Kullanıcı bulunamadı.</div>';
                            } else {
                                searchResults.innerHTML = users.map(function(u) {
                                    var avatar = u.avatar_url
                                        ? '<img src="' + u.avatar_url + '" class="friends-search-result__avatar">'
                                        : '<div class="friends-search-result__avatar friends-search-result__avatar--placeholder">' + u.display_name[0] + '</div>';
                                    return '<a href="' + u.url + '" class="friends-search-result">' +
                                        avatar +
                                        '<div>' +
                                        '<span class="friends-search-result__name">' + u.display_name + '</span>' +
                                        (u.username ? '<span class="friends-search-result__username">@' + u.username + '</span>' : '') +
                                        '</div>' +
                                        '</a>';
                                }).join('');
                            }
                            searchResults.style.display = '';
                        });
                }, 300);
            });

            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        })();
    </script>
@endpush
