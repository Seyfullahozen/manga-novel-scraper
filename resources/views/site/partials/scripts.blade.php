<script src="{{ asset('assets/scripts/dropdown.js') }}"></script>
<script src="{{ asset('assets/scripts/compress.js') }}"></script>
<script src="{{ asset('assets/scripts/moment.min.js') }}"></script>
<script src="{{ asset('assets/scripts/livestamp.min.js') }}"></script>


<script>
    /* Avatar modal */
    $(document).on("click", "img[src*='upload/avatar/']", function () {
        if ($(this).hasClass("user-avatar-bind")) return false;
        var a = $(this).attr("src");
        modal({
            text: '<img src="' + a + '" style="width:100%;height:100%" />',
            center: !0, autoclose: !1, closeClick: !0, closable: !0, animate: !0,
            background: "rgba(0,0,0,0.35)", zIndex: 1050,
            template: '<div class="modal-box"><div class="modal-inner"><div class="modal-text"></div></div></div>',
            _classes: {box: ".modal-box", boxInner: ".modal-inner", content: ".modal-text"}
        });
    });

    /* User dropdown */
    (function () {
        var btn  = document.getElementById('userDropdownBtn');
        var wrap = btn ? btn.closest('.user-dropdown') : null;
        if (!btn || !wrap) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            wrap.classList.toggle('open');
        });

        document.addEventListener('click', function () {
            wrap.classList.remove('open');
        });
    })();

    /* Hata olunca ilgili popup'ı otomatik aç */
    @if($errors->any() && old('_form'))
    document.addEventListener('DOMContentLoaded', function () {
        var formName = '{{ old('_form') }}';
        var el = document.querySelector('[data-open="#' + formName + '-form"]');
        if (el) el.click();
    });
    @endif
</script>
