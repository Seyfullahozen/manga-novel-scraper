@php
    $reactionDefs = [
        'love'    => ['emoji' => '❤️',  'label' => 'Harika'],
        'super'   => ['emoji' => '🔥',  'label' => 'Süper'],
        'sad'     => ['emoji' => '😢',  'label' => 'Üzücü'],
        'shocked' => ['emoji' => '😲',  'label' => 'Şok'],
        'angry'   => ['emoji' => '😡',  'label' => 'Sinir'],
    ];
    $userId = auth()->id();
@endphp

<div class="comment-section" id="commentSection"
     data-type="{{ $commentableType }}"
     data-id="{{ $commentableId }}">

    {{-- EMOJİ TEPKİLER --}}
    <div class="content-reactions">
        <span class="content-reactions__label">Bu seriyi nasıl buldunuz?</span>
        <div class="content-reactions__list">
            @foreach($reactionDefs as $key => $def)
                <button class="reaction-btn {{ ($userContentReaction ?? '') === $key ? 'reaction-btn--active' : '' }}"
                        data-type="{{ $key }}"
                        @guest data-guest="1" @endguest
                        title="{{ $def['label'] }}">
                    <span class="reaction-btn__emoji">{{ $def['emoji'] }}</span>
                    <span class="reaction-btn__count" id="rc-{{ $key }}">{{ $contentReactions[$key] ?? 0 }}</span>
                    <span class="reaction-btn__label">{{ $def['label'] }}</span>
                </button>
            @endforeach
        </div>
    </div>

    {{-- YORUM BAŞLIK --}}
    <div class="comment-header">
        <h3 class="comment-header__title">
            Yorumlar
            <span class="comment-header__count" id="commentCount">{{ $comments->count() }}</span>
        </h3>
    </div>

    {{-- ANA YORUM FORMU --}}
    @auth
        <div class="comment-form-wrap" id="mainCommentForm">
            <img src="{{ auth()->user()->avatar_url ?? asset('assets/images/img.png') }}"
                 alt="" class="comment-avatar comment-avatar--sm">
            <div class="comment-form__inner">
                <textarea class="comment-textarea" id="mainCommentBody"
                          placeholder="Yorumunuzu yazın..." rows="3" maxlength="2000"></textarea>
                <div class="comment-form__footer">
                    <div class="comment-error" id="mainCommentError" style="display:none;color:#e05050;font-size:12px;margin-bottom:4px;"></div>
                    <span class="comment-char-count"><span id="mainCharCount">0</span>/2000</span>
                    <button class="comment-submit-btn" id="mainSubmitBtn">
                        <span>
                            <img src="{{ asset('assets/icons/paper-plane-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:15px">
                        </span> Gönder
                    </button>
                </div>
            </div>
        </div>
    @else
        <div class="comment-guest-notice">
            <span><img src="{{ asset('assets/icons/lock-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:15px"></span>
            Yorum yapmak için <a href="javascript:;" data-open="#login-form">giriş yapın</a>.
        </div>
    @endauth

    {{-- YORUM LİSTESİ --}}
    @php
        $blockedUserIds = auth()->check()
            ? auth()->user()->blocking()->pluck('users.id')->toArray()
            : [];
    @endphp

    <div class="comment-list" id="commentList">
        @forelse($comments as $comment)
            @if(in_array($comment->user_id, $blockedUserIds))
                <div class="comment-blocked-wrap" data-id="{{ $comment->id }}">
                    <div class="comment-blocked-notice">
                        <span>
                            <img src="{{ asset('assets/icons/ban-solid-full.svg') }}" alt="" style="width:100%; height:100%; max-width:15px">
                        </span>
                        Bu kullanıcıyı engellediniz.
                        <button class="comment-blocked-show-btn" type="button">Yorumu göster</button>
                    </div>
                    <div class="comment-blocked-content" style="display:none">
                        @include('site.partials.comment-item', ['comment' => $comment, 'depth' => 0])
                    </div>
                </div>
            @else
                @include('site.partials.comment-item', ['comment' => $comment, 'depth' => 0])
            @endif
        @empty
            <div class="comment-empty" id="commentEmpty">
                <span><img src="{{ asset('assets/icons/comment-solid-full.svg') }}" alt="" style="width:100%;height:100%;max-width:12px"></span>
                Henüz yorum yapılmamış. İlk yorumu sen yap!
            </div>
        @endforelse
    </div>

</div>

@push('scripts')
    <script>
        (function () {
            var CSRF   = document.querySelector('meta[name="csrf-token"]').content;
            var TYPE   = document.getElementById('commentSection').dataset.type;
            var ID     = document.getElementById('commentSection').dataset.id;
            var userId = {{ auth()->id() ?? 'null' }};

            // ---------- @mention autocomplete ----------
            var mentionDropdown = null;
            var mentionTextarea = null;
            var mentionStart    = -1;

            function createMentionDropdown() {
                var d = document.createElement('div');
                d.className = 'mention-dropdown';
                d.style.display = 'none';
                document.body.appendChild(d);
                return d;
            }

            function positionDropdown(textarea) {
                var rect = textarea.getBoundingClientRect();
                mentionDropdown.style.left = (rect.left + window.scrollX) + 'px';
                mentionDropdown.style.top  = (rect.bottom + window.scrollY + 4) + 'px';
                mentionDropdown.style.width = Math.min(260, rect.width) + 'px';
            }

            function closeMention() {
                if (mentionDropdown) mentionDropdown.style.display = 'none';
                mentionTextarea = null;
                mentionStart    = -1;
            }

            var mentionTimer = null;

            document.addEventListener('input', function(e) {
                var ta = e.target;
                if (!ta.classList.contains('comment-textarea')) return;

                var val    = ta.value;
                var cursor = ta.selectionStart;

                // @ işaretini bul
                var atPos = -1;
                for (var i = cursor - 1; i >= 0; i--) {
                    if (val[i] === '@') { atPos = i; break; }
                    if (val[i] === ' ' || val[i] === '') break;
                }

                if (atPos === -1) { closeMention(); return; }

                var query = val.slice(atPos + 1, cursor);
                if (query.length < 2) { closeMention(); return; }

                mentionTextarea = ta;
                mentionStart    = atPos;

                if (!mentionDropdown) mentionDropdown = createMentionDropdown();
                positionDropdown(ta);

                clearTimeout(mentionTimer);
                mentionTimer = setTimeout(function() {
                    fetch('{{ route('user.search') }}?q=' + encodeURIComponent(query), {
                        headers: { 'Accept': 'application/json' }
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(users) {
                            if (!users.length) { closeMention(); return; }
                            mentionDropdown.innerHTML = users.map(function(u) {
                                var av = u.avatar_url
                                    ? '<img src="' + u.avatar_url + '" class="mention-avatar">'
                                    : '<div class="mention-avatar mention-avatar--placeholder">' + u.display_name[0] + '</div>';
                                return '<div class="mention-item" data-username="' + u.username + '">' +
                                    av +
                                    '<span class="mention-name">@' + u.username + '</span>' +
                                    '<span class="mention-display">' + u.display_name + '</span>' +
                                    '</div>';
                            }).join('');
                            mentionDropdown.style.display = '';
                        });
                }, 250);
            });

            document.addEventListener('click', function(e) {
                var item = e.target.closest('.mention-item');
                if (item && mentionTextarea) {
                    var uname = item.dataset.username;
                    var val   = mentionTextarea.value;
                    var before = val.slice(0, mentionStart);
                    var after  = val.slice(mentionTextarea.selectionStart);
                    mentionTextarea.value = before + '@' + uname + ' ' + after;
                    mentionTextarea.focus();
                    var pos = (before + '@' + uname + ' ').length;
                    mentionTextarea.setSelectionRange(pos, pos);
                    closeMention();
                    return;
                }
                if (mentionDropdown && !mentionDropdown.contains(e.target)) {
                    closeMention();
                }
            });

            // ---------- Engellenen yorum göster ----------
            document.addEventListener('click', function(e) {
                var btn = e.target.closest('.comment-blocked-show-btn');
                if (!btn) return;
                var wrap = btn.closest('.comment-blocked-wrap');
                wrap.querySelector('.comment-blocked-notice').style.display = 'none';
                wrap.querySelector('.comment-blocked-content').style.display = '';
            });

            // ---------- Emoji tepki ----------
            document.querySelectorAll('.reaction-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    if (btn.dataset.guest) return;
                    fetch('{{ route('content.react') }}', {
                        method: 'POST',
                        headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ type: btn.dataset.type, reactable_type: TYPE, reactable_id: ID })
                    })
                        .then(function(r){ return r.json(); })
                        .then(function(data) {
                            document.querySelectorAll('.reaction-btn').forEach(function(b) {
                                b.classList.remove('reaction-btn--active');
                                var cnt = document.getElementById('rc-' + b.dataset.type);
                                if (cnt) cnt.textContent = data.counts[b.dataset.type] || 0;
                            });
                            if (data.yours) {
                                var active = document.querySelector('.reaction-btn[data-type="' + data.yours + '"]');
                                if (active) active.classList.add('reaction-btn--active');
                            }
                        });
                });
            });

            // ---------- Karakter sayacı ----------
            var mainBody  = document.getElementById('mainCommentBody');
            var mainCount = document.getElementById('mainCharCount');
            if (mainBody) {
                mainBody.addEventListener('input', function () {
                    mainCount.textContent = mainBody.value.length;
                });
            }

            // ---------- Ana yorum gönder ----------
            var mainBtn = document.getElementById('mainSubmitBtn');
            if (mainBtn) {
                mainBtn.addEventListener('click', function () {
                    var body = mainBody.value.trim();
                    var errorEl = document.getElementById('mainCommentError');

                    if (errorEl) {
                        errorEl.style.display = 'none';
                        errorEl.textContent = '';
                    }

                    if (!body) {
                        if (errorEl) {
                            errorEl.textContent = 'Yorum boş olamaz.';
                            errorEl.style.display = '';
                        }
                        return;
                    }

                    mainBtn.disabled = true;

                    submitComment(body, null, null, function(comment) {
                        mainBody.value = '';
                        mainCount.textContent = '0';
                        prependComment(comment);
                        document.getElementById('commentEmpty') && document.getElementById('commentEmpty').remove();
                        var cnt = document.getElementById('commentCount');
                        if (cnt) cnt.textContent = parseInt(cnt.textContent) + 1;
                        mainBtn.disabled = false;
                    }, function(message) {
                        if (errorEl) {
                            errorEl.textContent = message || 'Yorum gönderilemedi.';
                            errorEl.style.display = '';
                        }
                        mainBtn.disabled = false;
                    });
                });
            }

            // ---------- submitComment ----------
            function submitComment(body, parentId, replyToUsername, onSuccess, onError) {
                fetch('{{ route('comment.store') }}', {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ body: body, commentable_type: TYPE, commentable_id: ID, parent_id: parentId })
                })
                    .then(function(r) {
                        if (!r.ok) {
                            return r.json().then(function(err) {
                                if (onError) onError(err.message || 'Bir hata oluştu.');
                                throw new Error(err.message);
                            });
                        }
                        return r.json();
                    })
                    .then(function(data) {
                        if (data && data.success) {
                            data.comment.replyToUsername = replyToUsername;
                            onSuccess(data.comment);
                        }
                    })
                    .catch(function(err){
                        if (onError) onError(err.message || 'Bir hata oluştu.');
                    });
            }

            // ---------- Yanıtla butonu (event delegation) ----------
            document.addEventListener('click', function (e) {
                var btn = e.target.closest('.comment-reply-btn');
                if (!btn || !userId) return;

                // Mevcut açık reply formlarını kapat
                document.querySelectorAll('.reply-form-wrap').forEach(function(f){ f.remove(); });

                // Hangi yorum? — reply ise root parent'ı bul
                var item       = btn.closest('.comment-item');
                var itemId     = item.dataset.id;
                var username   = item.querySelector('.comment-username').textContent.trim();

                // Root parent: reply ise .comment-replies'ın sahibi, değilse kendisi
                var repliesWrap = item.closest('.comment-replies');
                var rootItem    = repliesWrap ? repliesWrap.closest('.comment-item') : item;
                var rootId      = rootItem.dataset.id;
                var rootReplies = rootItem.querySelector('.comment-replies');

                var form = document.createElement('div');
                form.className = 'comment-form-wrap reply-form-wrap';
                form.innerHTML =
                    '<div class="comment-form__inner">' +
                    '<div class="reply-form-to">@' + username + ' kullanıcısına yanıt</div>' +
                    '<textarea class="comment-textarea reply-textarea" rows="2" maxlength="2000" placeholder="Yanıtınızı yazın..."></textarea>' +
                    '<div class="comment-form__footer">' +
                    '<div class="reply-error" style="display:none;color:#e05050;font-size:12px;margin-bottom:4px;"></div>' +
                    '<button class="comment-submit-btn reply-submit-btn"><span class="fa fa-paper-plane"></span> Yanıtla</button>' +
                    '<button class="comment-cancel-btn reply-cancel-btn">İptal</button>' +
                    '</div>' +
                    '</div>';

                // Formu root yanıtlar listesinin altına ekle
                rootReplies.appendChild(form);
                form.querySelector('.reply-textarea').focus();

                form.querySelector('.reply-cancel-btn').addEventListener('click', function(){ form.remove(); });

                form.querySelector('.reply-submit-btn').addEventListener('click', function () {
                    var body = form.querySelector('.reply-textarea').value.trim();
                    if (!body) return;
                    var submitBtn = form.querySelector('.reply-submit-btn');
                    var errorEl = form.querySelector('.reply-error');
                    submitBtn.disabled = true;
                    submitComment(body, rootId, username, function(comment) {
                        form.remove();
                        appendReply(comment, rootReplies);
                    }, function(msg) {
                        submitBtn.disabled = false;
                        if (errorEl) { errorEl.textContent = msg; errorEl.style.display = ''; }
                    });
                });
            });

            // ---------- Like / Dislike (event delegation) ----------
            document.addEventListener('click', function (e) {
                var btn = e.target.closest('.comment-like-btn, .comment-dislike-btn');
                if (!btn || btn.dataset.guest) return;
                var item      = btn.closest('.comment-item');
                var commentId = item.dataset.id;
                var type      = btn.classList.contains('comment-like-btn') ? 'like' : 'dislike';

                fetch('/yorum/' + commentId + '/tepki', {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ type: type })
                })
                    .then(function(r){ return r.json(); })
                    .then(function(data) {
                        item.querySelector('.comment-like-count').textContent    = data.likes;
                        item.querySelector('.comment-dislike-count').textContent = data.dislikes;
                        item.querySelector('.comment-like-btn').classList.toggle('comment-like-btn--active',    data.yours === 'like');
                        item.querySelector('.comment-dislike-btn').classList.toggle('comment-dislike-btn--active', data.yours === 'dislike');
                    });
            });

            // ---------- Sil (event delegation) ----------
            document.addEventListener('click', function (e) {
                var btn = e.target.closest('.comment-delete-btn');
                if (!btn) return;
                if (!confirm('Yorumu silmek istediğinize emin misiniz?')) return;
                var item      = btn.closest('.comment-item');
                var commentId = item.dataset.id;

                fetch('/yorum/' + commentId, {
                    method: 'DELETE',
                    headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json' }
                })
                    .then(function(r){ return r.json(); })
                    .then(function(data) {
                        if (data.success) {
                            item.style.transition = 'opacity .3s';
                            item.style.opacity = '0';
                            setTimeout(function(){ item.remove(); }, 300);
                        }
                    });
            });

            // ---------- DOM yardımcıları ----------
            function buildCommentHTML(c, isReply) {
                var avatar = c.user.avatar_url
                    ? '<img src="' + c.user.avatar_url + '" class="comment-avatar comment-avatar--sm" alt="">'
                    : '<div class="comment-avatar comment-avatar--sm comment-avatar--placeholder">' + (c.user.display_name[0] || '?') + '</div>';

                var replyTo = (isReply && c.replyToUsername)
                    ? '<span class="comment-reply-to">@' + c.replyToUsername + '</span>'
                    : '';

                var deleteBtn = '<button class="comment-delete-btn" title="Sil"><span class="fa fa-trash"></span></button>';

                var usernameEl = c.user.username
                    ? '<a href="/kullanici/' + c.user.username + '" class="comment-username">@' + c.user.username + '</a>'
                    : '<span class="comment-username">' + (c.user.display_name || c.user.name || '?') + '</span>';

                return '<div class="comment-item ' + (isReply ? 'comment-item--reply' : '') + '" data-id="' + c.id + '">' +
                    '<div class="comment-item__head">' +
                    avatar +
                    '<div class="comment-item__meta">' +
                    usernameEl +
                    '<span class="comment-date">' + c.created_at + '</span>' +
                    '</div>' +
                    deleteBtn +
                    '</div>' +
                    replyTo +
                    '<div class="comment-body">' + c.body + '</div>' +
                    '<div class="comment-actions">' +
                    '<button class="comment-like-btn"><span class="fa fa-thumbs-up"></span><span class="comment-like-count">0</span></button>' +
                    '<button class="comment-dislike-btn"><span class="fa fa-thumbs-down"></span><span class="comment-dislike-count">0</span></button>' +
                    '<button class="comment-reply-btn"><span class="fa fa-reply"></span> Yanıtla</button>' +
                    '</div>' +
                    '</div>';
            }

            function prependComment(c) {
                var list = document.getElementById('commentList');
                var wrap = document.createElement('div');
                // Ana yorum için replies div de ekle
                var html = buildCommentHTML(c, false);
                // replies wrapper ekle
                var tmp = document.createElement('div');
                tmp.innerHTML = html;
                var el = tmp.firstChild;
                var repliesDiv = document.createElement('div');
                repliesDiv.className = 'comment-replies';
                repliesDiv.dataset.parentId = c.id;
                el.appendChild(repliesDiv);
                list.insertBefore(el, list.firstChild);
            }

            function appendReply(c, repliesWrap) {
                var tmp = document.createElement('div');
                tmp.innerHTML = buildCommentHTML(c, true);
                // reply'ın altına form varsa onun önüne ekle
                var form = repliesWrap.querySelector('.reply-form-wrap');
                if (form) {
                    repliesWrap.insertBefore(tmp.firstChild, form);
                } else {
                    repliesWrap.appendChild(tmp.firstChild);
                }
            }
        })();
    </script>
@endpush
