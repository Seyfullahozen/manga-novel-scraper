<div class="header">
    @guest
        <ul class="register-link">
            <li>
                <a href="javascript:;" data-open="#login-form">
                    <span>
                        <img src="{{ asset('assets/icons/user-regular-full.svg') }}" alt="" style="width:90%; height:90%; max-width:40px">
                    </span>
                    <strong>Giriş</strong> Yap
                </a>
            </li>
            <li>
                <a href="javascript:;" data-open="#register-form">
                    <span>
                        <img src="{{ asset('assets/icons/plus-solid-full.svg') }}" alt="" style="width:90%; height:90%; max-width:40px">
                    </span>
                    <strong>Kayıt</strong> Ol
                </a>
            </li>
        </ul>
    @else
        <div class="auth-bar">
            <div class="auth-bar__username">
                <span>
                    <img src="{{ asset('assets/icons/user-regular-full.svg') }}" alt="" style="width:80%;height:80%;max-width:30px">
                </span>
                <strong>{{ Auth::user()->name }}</strong>
            </div>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="auth-bar__logout">
                    <span>
                        <img src="{{ asset('assets/icons/right-from-bracket-solid-full.svg') }}" alt="" style="width:80%;height:80%;max-width:30px">
                    </span>
                    <strong>Çıkış</strong> Yap
                </button>
            </form>
        </div>
    @endguest

    <div class="logo-text">
        <a href="{{ route('site.home') }}">
            <span class="icon-logo" style="color:#0c1012">READER</span>
        </a>
    </div>

    <div class="search">
        <form action="#" method="get" autocomplete="off" onsubmit="return false;">
            <input
                type="text"
                id="searchbar"
                name="q"
                placeholder="SiteAdı'de bir şey ara.."
                value=""
                autocomplete="off"
            />
            <button type="submit">
                <span class="fa fa-search"></span>
            </button>

            <div class="search-result" id="live-search-dropdown" style="display:none;">
                <span class="title">Eşleşen Sonuçlar</span>
                <div class="inner">
                    <div class="div-inner">
                        <ul id="live-search-list"></ul>
                        <div class="result-error" id="live-search-empty" style="display:none;">
                            Aradığınız kriterlere uygun sonuç bulunamadı.
                        </div>
                    </div>
                </div>
                <a class="all-result" id="live-search-all" href="#">
                    Tüm sonuçları göster
                </a>
            </div>
        </form>
    </div>
</div>

<div class="menu">
    <ul>
        <li>
            <a href="{{ route('site.home') }}">
                <img src="{{ asset('assets/icons/house-solid-full.svg') }}" alt="">
                Anasayfa
            </a>
        </li>

        {{-- Noveller dropdown --}}
        <li class="menu-dropdown">
            <a href="javascript:void(0)" class="menu-dropdown__trigger">
                Noveller
                <span class="menu-dropdown__arrow">▾</span>
            </a>
            <div class="dropdown-panel">
                <a href="{{ route('site.novel.home') }}" class="dropdown-panel__item">
                    <img src="{{ asset('assets/icons/clock-regular-full.svg') }}" alt="">
                    Son Eklenenler
                </a>
                <a href="{{ route('site.novel.list') }}" class="dropdown-panel__item">
                    <img src="{{ asset('assets/icons/list-solid-full.svg') }}" alt="">
                    Novel Listesi
                </a>
            </div>
        </li>

        {{-- Mangalar dropdown --}}
        <li class="menu-dropdown">
            <a href="javascript:void(0)" class="menu-dropdown__trigger">
                Mangalar
                <span class="menu-dropdown__arrow">▾</span>
            </a>
            <div class="dropdown-panel">
                <a href="{{ route('site.manga.home') }}" class="dropdown-panel__item">
                    <img src="{{ asset('assets/icons/clock-regular-full.svg') }}" alt="">
                    Son Eklenenler
                </a>
                <a href="{{ route('site.manga.list') }}" class="dropdown-panel__item">
                    <img src="{{ asset('assets/icons/list-solid-full.svg') }}" alt="">
                    Manga Listesi
                </a>
            </div>
        </li>

        <li>
            <a href="#">
                <img src="{{ asset('assets/icons/comments-solid-full.svg') }}" alt="">
                İletişim
            </a>
        </li>
    </ul>
</div>

<script>
    (function () {
        const input    = document.getElementById('searchbar');
        const dropdown = document.getElementById('live-search-dropdown');
        const list     = document.getElementById('live-search-list');
        const empty    = document.getElementById('live-search-empty');
        const allLink  = document.getElementById('live-search-all');
        const endpoint = '{{ route('site.search.live') }}';

        let timer = null;

        function closeDropdown() {
            dropdown.style.display = 'none';
            list.innerHTML = '';
            empty.style.display = 'none';
        }

        function renderResults(results) {
            list.innerHTML = '';

            if (results.length === 0) {
                empty.style.display = 'block';
                return;
            }

            empty.style.display = 'none';

            results.forEach(function (item) {
                const li = document.createElement('li');

                const badge = item.type === 'novel'
                    ? '<span class="live-search-badge live-search-badge--novel">Novel</span>'
                    : '<span class="live-search-badge live-search-badge--manga">Manga</span>';

                const cover = item.cover_url
                    ? `<img src="${item.cover_url}" alt="" class="live-search-cover">`
                    : `<div class="live-search-cover live-search-cover--empty">${item.type === 'novel' ? 'N' : 'M'}</div>`;

                li.innerHTML = `
                <a href="${item.url}" class="live-search-item">
                    ${cover}
                    <span class="live-search-item__text">
                        ${badge}
                        <span class="live-search-item__title">${item.title}</span>
                    </span>
                </a>`;

                list.appendChild(li);
            });
        }

        input.addEventListener('input', function () {
            const q = input.value.trim();

            clearTimeout(timer);

            if (q.length < 2) {
                closeDropdown();
                return;
            }

            allLink.href = '#';

            timer = setTimeout(function () {
                fetch(endpoint + '?q=' + encodeURIComponent(q), {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                })
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        dropdown.style.display = 'block';
                        renderResults(data.results);
                    })
                    .catch(function () { closeDropdown(); });
            }, 280);
        });

        // Dışarı tıklayınca kapat
        document.addEventListener('click', function (e) {
            if (!input.closest('.search').contains(e.target)) {
                closeDropdown();
            }
        });

        // Input'a tekrar focus olunca tekrar göster
        input.addEventListener('focus', function () {
            if (input.value.trim().length >= 2 && list.children.length > 0) {
                dropdown.style.display = 'block';
            }
        });
    })();
</script>
