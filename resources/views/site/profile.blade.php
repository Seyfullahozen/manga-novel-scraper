@extends('site.layouts.app')
@section('title', 'Profilim')

@section('content')
    <div class="novel-section">

        <div class="novel-section-header">
            <h2>Profil Ayarları</h2>
        </div>

        @if(session('success'))
            <div class="profile-alert profile-alert--success">
                <span class="fa fa-check-circle"></span>
                {{ session('success') }}
            </div>
        @endif

        @if($errors->any())
            <div class="profile-alert profile-alert--error">
                <span class="fa fa-exclamation-circle"></span>
                {{ $errors->first() }}
            </div>
        @endif

        <div class="profile-layout">
            {{-- SOL: Avatar önizleme --}}
            <div class="profile-avatar-panel">
                <div class="profile-avatar">
                    @if(Auth::user()->avatar_url)
                        <img src="{{ Auth::user()->avatar_url }}" alt="Avatar" id="avatarPreview">
                    @else
                        <div class="profile-avatar__placeholder" id="avatarPreview">
                            <span class="fa fa-user"></span>
                        </div>
                    @endif
                </div>
                <div class="profile-avatar__meta">
                    <span class="profile-avatar__name">{{ Auth::user()->display_name ?? Auth::user()->name }}</span>
                    @if(Auth::user()->username)
                        <span class="profile-avatar__username">{{ Auth::user()->username }}</span>
                    @endif
                    <span class="profile-avatar__since">
                    <span class="fa fa-calendar"></span>
                    {{ Auth::user()->created_at->format('d.m.Y') }} tarihinde katıldı
                </span>
                    @if(Auth::user()->last_seen_at)
                        <span class="profile-avatar__lastseen">
                        <span class="fa fa-clock-o"></span>
                        Son görülme: {{ Auth::user()->last_seen_at->diffForHumans() }}
                    </span>
                    @endif
                </div>
            </div>

            {{-- SAĞ: Form --}}
            <div class="profile-form-panel">
                {{-- enctype zorunlu: dosya yükleme için --}}
                <form method="POST" action="{{ route('site.profile.update') }}" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')

                    {{-- Genel Bilgiler --}}
                    <div class="profile-form-section">
                        <h3 class="profile-form-section__title">Genel Bilgiler</h3>

                        <div class="profile-field">
                            <label class="profile-field__label">Ad Soyad</label>
                            <input type="text" name="name" class="profile-field__input"
                                   value="{{ old('name', Auth::user()->name) }}" required>
                        </div>

                        <div class="profile-field">
                            <label class="profile-field__label">Kullanıcı Adı</label>
                            <div class="profile-field__prefix-wrap">
                                <span class="profile-field__prefix">@</span>
                                <input type="text" name="username"
                                       class="profile-field__input profile-field__input--prefixed"
                                       value="{{ old('username', Auth::user()->username) }}"
                                       placeholder="kullanici_adi">
                            </div>
                            <span class="profile-field__hint">Boş bırakılabilir. Harf, rakam ve _ kullanılabilir.</span>
                        </div>

                        <div class="profile-field">
                            <label class="profile-field__label">Görünen Ad</label>
                            <input type="text" name="display_name" class="profile-field__input"
                                   value="{{ old('display_name', Auth::user()->display_name) }}"
                                   placeholder="Profilinde görünecek isim">
                            <span class="profile-field__hint">Boş bırakırsan ad soyadın kullanılır.</span>
                        </div>

                        <div class="profile-field">
                            <label class="profile-field__label">Hakkımda (Bio)</label>
                            <textarea name="bio" class="profile-field__input"
                                      rows="3" maxlength="300"
                                      placeholder="Kendini kısaca tanıt...">{{ old('bio', Auth::user()->bio) }}</textarea>
                            <span class="profile-field__hint">Maksimum 300 karakter. Profilinde görünür.</span>
                        </div>
                    </div>

                    {{-- İletişim --}}
                    <div class="profile-form-section">
                        <h3 class="profile-form-section__title">İletişim</h3>

                        <div class="profile-field">
                            <label class="profile-field__label">E-posta</label>
                            <input type="email" name="email" class="profile-field__input"
                                   value="{{ old('email', Auth::user()->email) }}" required>
                            @if(!Auth::user()->email_verified_at)
                                <span class="profile-field__hint profile-field__hint--warn">
                                <span class="fa fa-warning"></span> E-posta adresin doğrulanmamış.
                            </span>
                            @endif
                        </div>

                        <div class="profile-field">
                            <label class="profile-field__label">Telegram Chat ID</label>
                            <input type="text" name="telegram_chat_id" class="profile-field__input"
                                   value="{{ old('telegram_chat_id', Auth::user()->telegram_chat_id) }}"
                                   placeholder="Telegram bildirimler için">
                            <span class="profile-field__hint">İsteğe bağlı. Yeni bölüm bildirimleri için.</span>
                        </div>
                    </div>

                    {{-- Avatar --}}
                    <div class="profile-form-section">
                        <h3 class="profile-form-section__title">Avatar</h3>

                        {{-- Sekme seçici --}}
                        <div class="avatar-tabs">
                            <button type="button" class="avatar-tab avatar-tab--active" data-tab="upload">
                                <span class="fa fa-upload"></span> Dosya Yükle
                            </button>
                            <button type="button" class="avatar-tab" data-tab="url">
                                <span class="fa fa-link"></span> URL Gir
                            </button>
                        </div>

                        {{-- Dosya yükleme paneli --}}
                        <div class="avatar-panel" id="avatarPanelUpload">
                            <label class="avatar-dropzone" id="avatarDropzone">
                                <input type="file" name="avatar_file" id="avatarFileInput"
                                       accept="image/jpeg,image/png,image/webp" style="display:none;">
                                <span class="fa fa-cloud-upload avatar-dropzone__icon"></span>
                                <span class="avatar-dropzone__text">Tıkla veya sürükle bırak</span>
                                <span class="avatar-dropzone__hint">JPG, PNG, WebP — max 5MB</span>
                            </label>
                        </div>

                        {{-- URL paneli --}}
                        <div class="avatar-panel avatar-panel--hidden" id="avatarPanelUrl">
                            <div class="profile-field" style="margin-bottom:0;">
                                <input type="text" name="avatar_url" id="avatarUrlInput"
                                       class="profile-field__input"
                                       value="{{ old('avatar_url', Auth::user()->avatar_url ? (str_starts_with(Auth::user()->avatar_url, 'http') ? Auth::user()->avatar_url : url(Auth::user()->avatar_url)) : '') }}"
                                       placeholder="https://...">
                                <span class="profile-field__hint">Geçerli bir resim URL'si gir.</span>
                            </div>
                        </div>
                    </div>

                    {{-- Şifre --}}
                    <div class="profile-form-section">
                        <h3 class="profile-form-section__title">Şifre Değiştir</h3>
                        <span class="profile-field__hint" style="margin-bottom:12px; display:block;">
                        Şifreni değiştirmek istemiyorsan bu alanları boş bırak.
                    </span>

                        <div class="profile-field">
                            <label class="profile-field__label">Mevcut Şifre</label>
                            <input type="password" name="current_password" class="profile-field__input"
                                   placeholder="Mevcut şifren" autocomplete="current-password">
                        </div>
                        <div class="profile-field">
                            <label class="profile-field__label">Yeni Şifre</label>
                            <input type="password" name="password" class="profile-field__input"
                                   placeholder="Yeni şifre (min. 8 karakter)" autocomplete="new-password">
                        </div>
                        <div class="profile-field">
                            <label class="profile-field__label">Yeni Şifre Tekrar</label>
                            <input type="password" name="password_confirmation" class="profile-field__input"
                                   placeholder="Yeni şifre tekrar" autocomplete="new-password">
                        </div>
                    </div>

                    <div class="profile-actions">
                        <button type="submit" class="profile-save-btn">
                            <span class="fa fa-save"></span> Değişiklikleri Kaydet
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
@endsection

@push('scripts')
    <script>
        (function () {
            // --- Sekme geçişi ---
            var tabs    = document.querySelectorAll('.avatar-tab');
            var panels  = { upload: document.getElementById('avatarPanelUpload'), url: document.getElementById('avatarPanelUrl') };

            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    tabs.forEach(function (t) { t.classList.remove('avatar-tab--active'); });
                    tab.classList.add('avatar-tab--active');

                    Object.values(panels).forEach(function (p) { p.classList.add('avatar-panel--hidden'); });
                    panels[tab.dataset.tab].classList.remove('avatar-panel--hidden');
                });
            });

            // --- Dosya seçince önizleme ---
            var fileInput   = document.getElementById('avatarFileInput');
            var dropzone    = document.getElementById('avatarDropzone');
            var preview     = document.getElementById('avatarPreview');

            function showPreview(file) {
                if (!file || !file.type.startsWith('image/')) return;
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (preview.tagName === 'IMG') {
                        preview.src = e.target.result;
                    } else {
                        var img = document.createElement('img');
                        img.src = e.target.result;
                        img.id  = 'avatarPreview';
                        preview.parentNode.replaceChild(img, preview);
                    }
                };
                reader.readAsDataURL(file);

                // Dropzone görünümünü güncelle
                dropzone.querySelector('.avatar-dropzone__text').textContent = file.name;
                dropzone.classList.add('avatar-dropzone--selected');
            }

            if (fileInput) {
                fileInput.addEventListener('change', function () {
                    showPreview(this.files[0]);
                });
            }

            // Drag & drop
            if (dropzone) {
                dropzone.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    dropzone.classList.add('avatar-dropzone--hover');
                });
                dropzone.addEventListener('dragleave', function () {
                    dropzone.classList.remove('avatar-dropzone--hover');
                });
                dropzone.addEventListener('drop', function (e) {
                    e.preventDefault();
                    dropzone.classList.remove('avatar-dropzone--hover');
                    var file = e.dataTransfer.files[0];
                    if (file) {
                        // DataTransfer'ı input'a ata
                        var dt = new DataTransfer();
                        dt.items.add(file);
                        fileInput.files = dt.files;
                        showPreview(file);
                    }
                });
            }

            // --- URL girince önizleme ---
            var urlInput = document.getElementById('avatarUrlInput');
            if (urlInput) {
                urlInput.addEventListener('input', function () {
                    var url = this.value.trim();
                    if (!url) return;
                    var img = new Image();
                    img.onload = function () {
                        var p = document.getElementById('avatarPreview');
                        if (p.tagName === 'IMG') {
                            p.src = url;
                        } else {
                            var newImg = document.createElement('img');
                            newImg.src = url;
                            newImg.id  = 'avatarPreview';
                            p.parentNode.replaceChild(newImg, p);
                        }
                    };
                    img.src = url;
                });
            }
        })();
    </script>
@endpush
