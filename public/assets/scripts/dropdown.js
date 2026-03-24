(function () {
    var dropdowns = document.querySelectorAll('.menu-dropdown');

    dropdowns.forEach(function (dropdown) {
        var trigger = dropdown.querySelector('.menu-dropdown__trigger');
        var panel   = dropdown.querySelector('.dropdown-panel');
        if (!trigger || !panel) return;

        // Hover ile aç/kapat
        dropdown.addEventListener('mouseenter', function () {
            panel.classList.add('is-open');
            dropdown.classList.add('is-open');
        });

        dropdown.addEventListener('mouseleave', function () {
            panel.classList.remove('is-open');
            dropdown.classList.remove('is-open');
        });

        // Trigger'a tıklayınca toggle (href="#" olduğu için sayfayı engelle)
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            var isOpen = panel.classList.contains('is-open');
            // Diğer tüm panelleri kapat
            dropdowns.forEach(function (d) {
                d.querySelector('.dropdown-panel').classList.remove('is-open');
                d.classList.remove('is-open');
            });
            // Bu paneli toggle et
            if (!isOpen) {
                panel.classList.add('is-open');
                dropdown.classList.add('is-open');
            }
        });

        // Panel içindeki linklere tıklamayı engelleme — normal çalışsın
        panel.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    // Dışarı tıklayınca kapat
    document.addEventListener('click', function (e) {
        var isInsideDropdown = Array.from(dropdowns).some(function (d) {
            return d.contains(e.target);
        });
        if (!isInsideDropdown) {
            dropdowns.forEach(function (d) {
                d.querySelector('.dropdown-panel').classList.remove('is-open');
                d.classList.remove('is-open');
            });
        }
    });
})();
