'use strict';

/* Arama ikonuna bastığımız zaman çıkan siyah ekranın jquery efektiyle yavaş bir şekilde açılmasını
 ve o sırada offfcanvas'ı duruma göre görünür veya görünmez yapmayı sağlıyoruz. */

$(document).ready(function () {
    $('.bi-search').on('click', function () {
        $('.search-model').fadeIn(400);
        $('.offcanvas.show').css('visibility', 'hidden');
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
        $('.offcanvas.show').css('visibility', 'visible');
    });
});


/* Ekran genişliğine göre açılır menünün ve ona bağlı ikonların davranışını değiştiriyoruz. */
dropdownClick();
function dropdownClick() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const downIcon = document.querySelector('.dropdown .down-icon');
    const rightIcon = document.querySelector('.dropdown .right-icon');

    if (window.innerWidth < 991.9) {
        dropdown.addEventListener('click', function() {
            
            if (!dropdownMenu.classList.contains('show')) {
                downIcon.classList.remove('d-block');
                downIcon.classList.add('d-none');
                rightIcon.classList.add('d-block');
                rightIcon.classList.remove('d-none');
                dropdownMenu.classList.add('d-none');
                dropdownMenu.classList.remove('d-block');
            } else {
                downIcon.classList.add('d-block');
                downIcon.classList.remove('d-none');
                rightIcon.classList.remove('d-block');
                rightIcon.classList.add('d-none');
                dropdownMenu.classList.add('d-block');
                dropdownMenu.classList.remove('d-none');
            }
        });
    } 
}


/* Ekran boyutunun değiştiği her anda kontrol edilmesi gereken fonksiyonları, resize event'iyle tetikliyoruz. */
window.addEventListener('resize', dropdownClick);
