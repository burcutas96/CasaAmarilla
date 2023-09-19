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
        dropdown.addEventListener('click', function () {

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



/* Açılış ekranındaki carousel için oluşturulan bir metot. */
CarouselContinue();
function CarouselContinue() {
    var carousel = document.getElementById('mySlide');

    var carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000
    });

    carousel.addEventListener('mouseover', function () {
        carouselInstance.cycle();
    });
}



document.addEventListener("DOMContentLoaded", function () {

    /* Guests and Rooms altındaki formda, girilen değerlerin sayısal olup olmadığını 
    ve bu girilen değerlerin 0'dan büyük ve 99'dan küçük olma durumlarını kontrol ediyoruz. */
    const inputElement = document.querySelector('.input-number');

    inputElement.addEventListener('input', function () {
        const inputValue = inputElement.value;
        const numericValue = parseInt(inputValue);

        if (isNaN(numericValue) || numericValue < 0 || numericValue > 99) {
            inputElement.value = '';
        }
    });



    /* Pikaday kütüphanesiyle tarih seçici oluşturduk. Ve temizleme ikonlarıyla tarih ikonlarını,
    hemen yanlarındaki tarih seçiciyle ilişkilendirdik. */
    const clearIconElements = document.querySelectorAll('.dateInput .clear-icon');
    const dateIconElements = document.querySelectorAll('.dateInput .date-icon');
    const datePickerElements = document.querySelectorAll('.datePicker');

    dateIconElements.forEach(function (dateIconElement, index) {
        const inputField = datePickerElements[index];
        const today = new Date();
        const datepicker = new Pikaday({
            field: inputField,
            minDate: today,
            // date formatını aşağıda ayarladım.
            toString(date) {
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'long' });
                const year = date.getFullYear();
                return `${day} ${month}, ${year}`;
            },
        });
        dateIconElement.addEventListener('click', () => {
            if (datepicker.isVisible()) {
                datepicker.hide();
            } else {
                datepicker.show();
            }
        });
        const clearIconElement = clearIconElements[index];
        clearIconElement.addEventListener('click', () => {
            inputField.value = '';
        });
    });



    /* Aşağıdaki fonksiyonla reservasyon kısmındaki guests and rooms açılır menüsünü, sayfada herhangi bir yere tıklayınca kapanmasını sağlıyoruz. */
    /* Ve tabi açılır menüye ait olan butona veya açılır menüye tıklayınca dropdown'ın kapatılmasını aşağıdaki koşullarla engelliyoruz. */
    window.onclick = function (event) {
        if (!event.target.matches('#guests') && !event.target.matches('.guestsform') 
            && !event.target.matches('.guestsform div') 
            && !event.target.matches('.guestsform label')
            && !event.target.matches('.guestsform input')) 
            {
            var guestsform = document.querySelector(".guestsform");
            const guestsformParentDiv = guestsform.parentElement;

            const bottomIcon = guestsformParentDiv.querySelector('.down-icon');
            const rightIcon = guestsformParentDiv.querySelector('.right-icon');

            if (guestsform.classList.contains('active')) {
                guestsform.classList.remove('active');
                bottomIcon.classList.remove('d-block');
                bottomIcon.classList.add('d-none');
                rightIcon.classList.add('d-block');
                rightIcon.classList.remove('d-none');
            }
        }
    }
});



/* Bu fonksiyon ile rezervasyon kısmındaki guests and rooms açılır menüsünü açıp ilgili ikonları düzenliyoruz. */
function GuestsForm() {
    const guestsform = document.querySelector('.guestsform');
    const guestsformParentDiv = guestsform.parentElement;
    const rightIcon = guestsformParentDiv.querySelector('.right-icon');
    const bottomIcon = guestsformParentDiv.querySelector('.down-icon');

    if (guestsform.classList.contains('active')) {
        guestsform.classList.remove('active');
        rightIcon.classList.add('d-block');
        rightIcon.classList.remove('d-none');
        bottomIcon.classList.remove('d-block');
        bottomIcon.classList.add('d-none');
    }
    else {
        guestsform.classList.add('active');
        rightIcon.classList.add('d-none');
        rightIcon.classList.remove('d-block');
        bottomIcon.classList.add('d-block');
        bottomIcon.classList.remove('d-none');
    }
}



/* Guests and rooms açılır menüsündeki eksi butonuyla input'daki azaltma işlemini aşağıdaki fonksiyonla yapıyoruz. */
function DecreaseButton(button, minValue) {
    event.stopPropagation();

    const parentDiv = button.parentElement;
    const inputElement = parentDiv.querySelector('.input-number');

    let currentValue = parseInt(inputElement.value);
    if (!isNaN(currentValue) && currentValue > minValue) {
        currentValue--;
        inputElement.value = currentValue;
    }
}



/* Guests and rooms açılır menüsündeki artı butonuyla input'daki arttırma işlemini aşağıdaki fonksiyonla yapıyoruz. */
function IncreaseButton(button) {
    event.stopPropagation();

    const parentDiv = button.parentElement;
    const inputElement = parentDiv.querySelector('.input-number');

    let currentValue = parseInt(inputElement.value);
    if (!isNaN(currentValue) && currentValue >= 0 && currentValue < 99) {
        currentValue++;
        inputElement.value = currentValue;
    }
}



/* Ekran boyutunun değiştiği her anda kontrol edilmesi gereken fonksiyonları, resize event'iyle tetikliyoruz. */
window.addEventListener('resize', dropdownClick);
