@forelse($users as $u)
    @include('site.partials.user-card', ['u' => $u])
@empty
    <div class="comment-empty">
        <span><img src="{{ asset('assets/icons/users-solid-white-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
        Henüz kimse yok.
    </div>
@endforelse
