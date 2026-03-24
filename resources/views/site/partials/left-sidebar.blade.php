<div class="left">
    <a class="logo" href="{{ route('site.home') }}">
        <span>SiteAdı</span>
    </a>
    <div class="left-menu">
        <ul>
            <li>
                @auth
                    <a href="{{ route('site.profile') }}">
                        @else
                            <a href="javascript:;" data-open="#login-form">
                                @endauth
                                <span>
                            <img src="{{ asset('assets/icons/user-regular-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                                <span class="title">Profil</span>
                            </a>
            </li>
            <li>
                @auth
                    <a href="{{ route('site.reading.history') }}">
                        @else
                            <a href="javascript:;" data-open="#login-form">
                                @endauth
                                <span>
                            <img src="{{ asset('assets/icons/book-open-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                                <span class="title">Son Okuduklarım</span>
                            </a>
            </li>
            <li style="position:relative">
                @auth
                    <a href="{{ route('site.followed') }}">
                        <span>
                            <img src="{{ asset('assets/icons/bookmark-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                        <span class="title">Takip Ettiklerim</span>
                        <span class="left-menu__badge left-menu__badge--follow" id="sidebarSeriesBadge" style="display:none">0</span>
                    </a>
                @else
                    <a href="javascript:;" data-open="#login-form">
                        <span>
                            <img src="{{ asset('assets/icons/bookmark-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                        <span class="title">Takip Ettiklerim</span>
                    </a>
                @endauth
            </li>
            <li style="position:relative">
                @auth
                    <a href="{{ route('site.friends') }}">
                        <span>
                            <img src="{{ asset('assets/icons/user-group-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                        <span class="title">Arkadaşlarım</span>
                    </a>
                @else
                    <a href="javascript:;" data-open="#login-form">
                        <span>
                            <img src="{{ asset('assets/icons/user-group-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                        <span class="title">Arkadaşlarım</span>
                    </a>
                @endauth
            </li>
            <li style="position:relative">
                @auth
                    <a href="{{ route('site.my.comments') }}">
                        <span>
                            <img src="{{ asset('assets/icons/comment-dots-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                        <span class="title">Yorumlarım</span>
                        <span class="left-menu__badge" id="sidebarNotifBadge" style="display:none">0</span>
                    </a>
                @else
                    <a href="javascript:;" data-open="#login-form">
                        <span>
                            <img src="{{ asset('assets/icons/comment-dots-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:40px">
                        </span>
                        <span class="title">Yorumlarım</span>
                    </a>
                @endauth
            </li>
        </ul>
    </div>
</div>

@auth
    @push('scripts')
        <script>
            (function () {
                function fetchCount() {
                    fetch('{{ route('comment.unread.count') }}', {
                        headers: { 'Accept': 'application/json' }
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(data) {
                            var badge = document.getElementById('sidebarNotifBadge');
                            if (!badge) return;
                            if (data.count > 0) {
                                badge.textContent = data.count > 99 ? '99+' : data.count;
                                badge.style.display = '';
                            } else {
                                badge.style.display = 'none';
                            }
                        })
                        .catch(function(){});
                }

                fetchCount();
                setInterval(fetchCount, 60000);
            })();

            // Seri bildirimleri badge
            (function () {
                function fetchSeriesCount() {
                    fetch('{{ route('series.notif.count') }}', {
                        headers: { 'Accept': 'application/json' }
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(data) {
                            var badge = document.getElementById('sidebarSeriesBadge');
                            if (!badge) return;
                            if (data.count > 0) {
                                badge.textContent = data.count > 99 ? '99+' : data.count;
                                badge.style.display = '';
                            } else {
                                badge.style.display = 'none';
                            }
                        })
                        .catch(function(){});
                }
                fetchSeriesCount();
                setInterval(fetchSeriesCount, 300000); // 5 dakikada bir
            })();
        </script>
    @endpush
@endauth
