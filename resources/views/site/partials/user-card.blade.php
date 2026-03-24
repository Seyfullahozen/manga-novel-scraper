<div class="uprofile-user-card">
    @if($u->avatar_url)
        <img src="{{ $u->avatar_url }}" alt="{{ $u->display_name ?? $u->name }}" class="uprofile-user-card__avatar">
    @else
        <div class="uprofile-user-card__avatar uprofile-user-card__avatar--placeholder">
            {{ mb_substr($u->display_name ?? $u->name, 0, 1) }}
        </div>
    @endif
    <div class="uprofile-user-card__info">
        <span class="uprofile-user-card__name">{{ $u->display_name ?? $u->name }}</span>
        @if($u->username)
            <span class="uprofile-user-card__username">{{ $u->username }}</span>
        @endif
    </div>
    @if($u->username)
        <a href="{{ route('user.profile', $u->username) }}" class="uprofile-user-card__link">
            Profili Gör
        </a>
    @endif
</div>
