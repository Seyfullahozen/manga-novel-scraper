@extends('site.layouts.app')
@section('title', ($user->display_name ?? $user->name) . ' — Profil')

@section('content')
    <div class="uprofile">

        {{-- HERO --}}
        <div class="uprofile-hero">
            <div class="uprofile-hero__avatar">
                @if($user->avatar_url)
                    <img src="{{ $user->avatar_url }}" alt="{{ $user->displayName() }}">
                @else
                    <div class="uprofile-hero__avatar-placeholder">
                        {{ mb_substr($user->displayName(), 0, 1) }}
                    </div>
                @endif
            </div>
            <div class="uprofile-hero__info">
                <h1 class="uprofile-hero__name">{{ $user->displayName() }}</h1>
                @if($user->username)
                    <span class="uprofile-hero__username">{{ $user->username }}</span>
                @endif
                @if($user->bio)
                    <p class="uprofile-hero__bio">{{ $user->bio }}</p>
                @endif
                <span class="uprofile-hero__since">
                <span><img src="{{ asset('assets/icons/calendar-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
                {{ $user->created_at->format('d.m.Y') }} tarihinde katıldı
            </span>
            </div>

            {{-- Aksiyonlar --}}
            @auth
                @if(!$isOwn)
                    <div class="uprofile-hero__actions">
                        <button class="uprofile-follow-btn {{ $isFollowing ? 'uprofile-follow-btn--active' : '' }}"
                                id="followUserBtn"
                                data-url="{{ route('user.follow', $user->username) }}">
                            <span class="fa {{ $isFollowing ? 'fa-user-check' : 'fa-user-plus' }}"></span>
                            <span id="followUserText">{{ $isFollowing ? 'Takip Ediliyor' : 'Takip Et' }}</span>
                        </button>
                        <button class="uprofile-block-btn {{ $isBlocking ? 'uprofile-block-btn--active' : '' }}"
                                id="blockUserBtn"
                                data-url="{{ route('user.block', $user->username) }}">
                            <span class="fa {{ $isBlocking ? 'fa-lock' : 'fa-ban' }}"></span>
                            <span id="blockUserText">{{ $isBlocking ? 'Engel Kaldır' : 'Engelle' }}</span>
                        </button>
                    </div>
                @else
                    <a href="{{ route('site.profile') }}" class="uprofile-edit-btn">
                        <span><img src="{{ asset('assets/icons/pencil-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span> Profili Düzenle
                    </a>
                @endif
            @endauth
        </div>

        {{-- İSTATİSTİKLER --}}
        <div class="uprofile-stats">
            <div class="uprofile-stat">
                <span class="uprofile-stat__val">{{ number_format($stats['followers']) }}</span>
                <span class="uprofile-stat__label">Takipçi</span>
            </div>
            <div class="uprofile-stat">
                <span class="uprofile-stat__val">{{ number_format($stats['following']) }}</span>
                <span class="uprofile-stat__label">Takip</span>
            </div>
            <div class="uprofile-stat">
                <span class="uprofile-stat__val">{{ number_format($stats['comments']) }}</span>
                <span class="uprofile-stat__label">Yorum</span>
            </div>
            <div class="uprofile-stat">
                <span class="uprofile-stat__val">{{ number_format($stats['followed_series']) }}</span>
                <span class="uprofile-stat__label">Seri Takip</span>
            </div>
        </div>

        {{-- SEKMELER --}}
        <div class="uprofile-tabs">
            <button class="uprofile-tab uprofile-tab--active" data-tab="comments">
                <span><img src="{{ asset('assets/icons/comment-solid-white-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span> Yorumlar
            </button>
            <button class="uprofile-tab" data-tab="series">
                <span><img src="{{ asset('assets/icons/bookmark-solid-white-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span> Takip Ettiği Seriler
            </button>
            <button class="uprofile-tab" data-tab="followers">
                <span><img src="{{ asset('assets/icons/users-solid-white-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span> Takipçiler
            </button>
            <button class="uprofile-tab" data-tab="following">
                <span><img src="{{ asset('assets/icons/user-plus-solid-white-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span> Takip Ettikleri
            </button>
        </div>

        {{-- YORUMLAR --}}
        <div class="uprofile-panel" id="tab-comments">
            <div id="comments-list">
                @include('site.partials.profile-comments', ['comments' => $comments, 'user' => $user])
            </div>
            @if($comments->hasMorePages())
                <div class="uprofile-load-more-wrap" id="comments-more-wrap">
                    <button class="uprofile-load-more"
                            data-next="{{ $comments->currentPage() + 1 }}"
                            data-url="{{ route('user.profile.comments', $user->username) }}"
                            data-target="comments-list"
                            data-wrap="comments-more-wrap">
                        Daha Fazla Yükle
                        <span class="uprofile-load-more__count">({{ $comments->total() - $comments->count() }} yorum daha)</span>
                    </button>
                </div>
            @endif
        </div>

        {{-- TAKİP ETTİĞİ SERİLER --}}
        <div class="uprofile-panel uprofile-panel--hidden" id="tab-series">
            <div id="series-list">
                @include('site.partials.profile-series', ['followedSeries' => $followedSeries])
            </div>
            @if($followedSeries->hasMorePages())
                <div class="uprofile-load-more-wrap" id="series-more-wrap">
                    <button class="uprofile-load-more"
                            data-next="{{ $followedSeries->currentPage() + 1 }}"
                            data-url="{{ route('user.profile.series', $user->username) }}"
                            data-target="series-list"
                            data-wrap="series-more-wrap">
                        Daha Fazla Yükle
                        <span class="uprofile-load-more__count">({{ $followedSeries->total() - $followedSeries->count() }} seri daha)</span>
                    </button>
                </div>
            @endif
        </div>

        {{-- TAKİPÇİLER --}}
        <div class="uprofile-panel uprofile-panel--hidden" id="tab-followers">
            <div id="followers-list">
                @include('site.partials.profile-users', ['users' => $followers])
            </div>
            @if($followers->hasMorePages())
                <div class="uprofile-load-more-wrap" id="followers-more-wrap">
                    <button class="uprofile-load-more"
                            data-next="{{ $followers->currentPage() + 1 }}"
                            data-url="{{ route('user.profile.followers', $user->username) }}"
                            data-target="followers-list"
                            data-wrap="followers-more-wrap">
                        Daha Fazla Yükle
                        <span class="uprofile-load-more__count">({{ $followers->total() - $followers->count() }} kişi daha)</span>
                    </button>
                </div>
            @endif
        </div>

        {{-- TAKİP ETTİKLERİ --}}
        <div class="uprofile-panel uprofile-panel--hidden" id="tab-following">
            <div id="following-list">
                @include('site.partials.profile-users', ['users' => $followings])
            </div>
            @if($followings->hasMorePages())
                <div class="uprofile-load-more-wrap" id="following-more-wrap">
                    <button class="uprofile-load-more"
                            data-next="{{ $followings->currentPage() + 1 }}"
                            data-url="{{ route('user.profile.following', $user->username) }}"
                            data-target="following-list"
                            data-wrap="following-more-wrap">
                        Daha Fazla Yükle
                        <span class="uprofile-load-more__count">({{ $followings->total() - $followings->count() }} kişi daha)</span>
                    </button>
                </div>
            @endif
        </div>

    </div>
@endsection

@push('scripts')
    <script>
        (function () {
            var CSRF = document.querySelector('meta[name="csrf-token"]').content;

            // Sekmeler
            document.querySelectorAll('.uprofile-tab').forEach(function(tab) {
                tab.addEventListener('click', function() {
                    document.querySelectorAll('.uprofile-tab').forEach(function(t){ t.classList.remove('uprofile-tab--active'); });
                    document.querySelectorAll('.uprofile-panel').forEach(function(p){ p.classList.add('uprofile-panel--hidden'); });
                    tab.classList.add('uprofile-tab--active');
                    document.getElementById('tab-' + tab.dataset.tab).classList.remove('uprofile-panel--hidden');
                });
            });

            // Daha Fazla Yükle
            document.addEventListener('click', function(e) {
                var btn = e.target.closest('.uprofile-load-more');
                if (!btn) return;

                var url    = btn.dataset.url;
                var page   = btn.dataset.next;
                var target = document.getElementById(btn.dataset.target);
                var wrap   = document.getElementById(btn.dataset.wrap);

                btn.disabled = true;
                btn.textContent = 'Yükleniyor...';

                fetch(url + '?page=' + page, {
                    headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
                })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        target.insertAdjacentHTML('beforeend', data.html);
                        if (data.has_more) {
                            btn.dataset.next = data.next;
                            btn.disabled = false;
                            btn.innerHTML = 'Daha Fazla Yükle';
                        } else {
                            wrap.remove();
                        }
                    })
                    .catch(function() {
                        btn.disabled = false;
                        btn.textContent = 'Tekrar Dene';
                    });
            });

            // Takip et
            var followBtn = document.getElementById('followUserBtn');
            if (followBtn) {
                followBtn.addEventListener('click', function() {
                    fetch(followBtn.dataset.url, {
                        method: 'POST',
                        headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(data) {
                            var text = document.getElementById('followUserText');
                            var icon = followBtn.querySelector('.fa');
                            if (data.following) {
                                followBtn.classList.add('uprofile-follow-btn--active');
                                icon.className = 'fa fa-user-check';
                                text.textContent = 'Takip Ediliyor';
                            } else {
                                followBtn.classList.remove('uprofile-follow-btn--active');
                                icon.className = 'fa fa-user-plus';
                                text.textContent = 'Takip Et';
                            }
                            document.querySelectorAll('.uprofile-stat').forEach(function(el) {
                                if (el.querySelector('.uprofile-stat__label').textContent === 'Takipçi') {
                                    el.querySelector('.uprofile-stat__val').textContent = data.followers_count;
                                }
                            });
                        });
                });
            }

            // Engelle
            var blockBtn = document.getElementById('blockUserBtn');
            if (blockBtn) {
                blockBtn.addEventListener('click', function() {
                    if (!confirm(blockBtn.classList.contains('uprofile-block-btn--active')
                        ? 'Engeli kaldırmak istediğinize emin misiniz?'
                        : 'Bu kullanıcıyı engellemek istediğinize emin misiniz?')) return;

                    fetch(blockBtn.dataset.url, {
                        method: 'POST',
                        headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(data) {
                            var text = document.getElementById('blockUserText');
                            var icon = blockBtn.querySelector('.fa');
                            if (data.blocking) {
                                blockBtn.classList.add('uprofile-block-btn--active');
                                icon.className = 'fa fa-lock';
                                text.textContent = 'Engel Kaldır';
                                if (followBtn) followBtn.style.display = 'none';
                            } else {
                                blockBtn.classList.remove('uprofile-block-btn--active');
                                icon.className = 'fa fa-ban';
                                text.textContent = 'Engelle';
                                if (followBtn) followBtn.style.display = '';
                            }
                        });
                });
            }
        })();
    </script>
@endpush
