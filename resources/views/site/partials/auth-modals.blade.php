{{-- Şifremi Unuttum --}}
<div class="popup" id="lostpassword-form">
    <div class="popup-content">
        <a class="popup-close" href="javascript:;" data-close="#lostpassword-form">
            <span class="fa fa-times"></span>
        </a>
        <div class="popup-logo"><span></span></div>
        <div class="lostpassword-text">
            <span>Şifrenizi sıfırlayın.</span>
            <p>Kayıt olurken girdiğiniz e-posta adresinizi doğru girdiğiniz takdirde şifrenizi sıfırlamanız için bir bağlantı göndereceğiz.</p>
        </div>
        <form method="POST" action="{{ route('password.email') }}">
            @csrf
            <ul class="form">
                <li>
                    <input type="email" name="email" placeholder="E-posta adresinizi yazın" required>
                </li>
                <li>
                    <button type="submit">ŞİFREMİ GÖNDER</button>
                </li>
            </ul>
        </form>
        <div class="lospassword">
            <a href="javascript:;" data-close="#lostpassword-form" data-open="#login-form">« Geri git</a>
        </div>
        <div class="alt">
            Şifreni hatırladın mı?&nbsp;
            <a href="javascript:;" data-close="#lostpassword-form" data-open="#login-form">hemen giriş yap.</a>
        </div>
    </div>
</div>

{{-- Giriş Yap --}}
<div class="popup" id="login-form">
    <div class="popup-content">
        <a class="popup-close" href="javascript:;" data-close="#login-form">
            <span class="fa fa-times"></span>
        </a>
        <div class="popup-logo"><span></span></div>

        {{-- Hata mesajları --}}
        @if($errors->any() && old('_form') === 'login')
            <div style="color:#e74c3c; font-size:12px; margin-bottom:8px; padding: 0 4px;">
                {{ $errors->first() }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf
            <input type="hidden" name="_form" value="login">
            <ul class="form">
                <li>
                    <input type="email"
                           name="email"
                           value="{{ old('email') }}"
                           placeholder="E-posta"
                           required
                           autocomplete="email">
                </li>
                <li>
                    <input type="password"
                           name="password"
                           placeholder="Şifre"
                           required
                           autocomplete="current-password">
                </li>
                <li>
                    <label class="cb checkbox2">
                        <input type="checkbox" name="remember" value="1">
                        <span></span>
                        <p>Beni hatırla?</p>
                    </label>
                </li>
                <li>
                    <button type="submit">HESABA GİRİŞ YAP</button>
                </li>
            </ul>
        </form>

        <div class="lospassword">
            <a href="javascript:;" data-close="#login-form" data-open="#lostpassword-form">şifreni mi unuttun?</a>
        </div>
        <div class="alt">
            Kayıtlı değil misin?&nbsp;
            <a href="javascript:;" data-close="#login-form" data-open="#register-form">hemen kayıt ol.</a>
        </div>
    </div>
</div>

{{-- Kayıt Ol --}}
<div class="popup" id="register-form">
    <div class="popup-content">
        <a class="popup-close" href="javascript:;" data-close="#register-form">
            <span class="fa fa-times"></span>
        </a>
        <span class="title"><strong>SiteAdı</strong> hesap oluştur.</span>

        {{-- Hata mesajları --}}
        @if($errors->any() && old('_form') === 'register')
            <div style="color:#e74c3c; font-size:12px; margin-bottom:8px; padding: 0 4px;">
                {{ $errors->first() }}
            </div>
        @endif

        <div class="register-content">
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <input type="hidden" name="_form" value="register">
                <ul class="form">
                    <li>
                        <input type="text"
                               name="name"
                               value="{{ old('name') }}"
                               placeholder="Kullanıcı adı"
                               required
                               autocomplete="name">
                    </li>
                    <li>
                        <input type="email"
                               name="email"
                               value="{{ old('email') }}"
                               placeholder="E-posta"
                               required
                               autocomplete="email">
                    </li>
                    <li>
                        <input type="password"
                               name="password"
                               placeholder="Şifre"
                               required
                               autocomplete="new-password">
                    </li>
                    <li>
                        <input type="password"
                               name="password_confirmation"
                               placeholder="Şifre tekrar"
                               required
                               autocomplete="new-password">
                    </li>
                    <li>
                        <button type="submit">HESABIMI OLUŞTUR</button>
                    </li>
                </ul>
            </form>
            <div class="alt">
                Zaten kayıtlı mısın?&nbsp;
                <a href="javascript:;" data-close="#register-form" data-open="#login-form">hemen giriş yap.</a>
            </div>
        </div>
    </div>
</div>
