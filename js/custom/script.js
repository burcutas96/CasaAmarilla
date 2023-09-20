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
    var checkInDateElement = document.querySelector('.checkInDate');
    var checkOutDateElement = document.querySelector('.checkOutDate');
    var checkInElement = document.getElementById('checkIn');
    var checkOutElement = document.getElementById('checkOut');
    const today = new Date();

    dateIconElements.forEach(function (dateIconElement, index) {
        var inputField = datePickerElements[index];
        if (index === 0) {
            const datepicker = new Pikaday({
                field: inputField,
                minDate: today,
                // date formatını aşağıda ayarladım.
                toString(date) {
                    const day = date.toLocaleString('en', { weekday: 'short' }); 
                    const year = date.getFullYear().toString().slice(-2); 
                    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
                    const dayOfMonth = ('0' + date.getDate()).slice(-2); 
                    return `${day}, ${dayOfMonth}.${month}.${year}`;
                },
                onSelect: function (date) {
                    var selectedDate = datepicker.toString();
                    checkInElement.value = '';
                    checkInDateElement.textContent = selectedDate;
                }
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
                checkInDateElement.textContent = '';
            });

        } else if (index === 1){
            const datepicker = new Pikaday({
                field: inputField,
                minDate: today,
                // date formatını aşağıda ayarladım.
                toString(date) {
                    const day = date.toLocaleString('en', { weekday: 'short' }); 
                    const year = date.getFullYear().toString().slice(-2); 
                    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
                    const dayOfMonth = ('0' + date.getDate()).slice(-2); 
                    return `${day}, ${dayOfMonth}.${month}.${year}`;
                },
                onSelect: function (date) {
                    var selectedDate = datepicker.toString();
                    checkOutElement.value = '';
                    checkOutDateElement.textContent = selectedDate;
                }
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
        }
    });



    /* Bugünün tarihini, rezervasyon kısmındaki .checkInDate elemanının içerisine yazdırıyoruz. */
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var formattedDate1 = daysOfWeek[today.getDay()] + ', ' +
        ('0' + today.getDate()).slice(-2) + '.' +
        ('0' + (today.getMonth() + 1)).slice(-2) + '.' +
        ('' + today.getFullYear()).slice(-2);
    document.querySelector('.checkInDate').innerHTML = formattedDate1;



    /* Yarının tarihini, rezervasyon kısmındaki .checkOutDate elemanının içerisine yazdırıyoruz. */
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    var formattedDate2 = daysOfWeek[tomorrow.getDay()] + ', ' +
        ('0' + tomorrow.getDate()).slice(-2) + '.' +
        ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '.' +
        ('' + tomorrow.getFullYear()).slice(-2);
    document.querySelector('.checkOutDate').innerHTML = formattedDate2;



    /* Aşağıdaki fonksiyonla reservasyon kısmındaki guests and rooms açılır menüsünü, sayfada herhangi bir yere tıklayınca kapanmasını sağlıyoruz. */
    /* Ve tabi açılır menüye ait olan butona veya açılır menüye tıklayınca dropdown'ın kapatılmasını aşağıdaki koşullarla engelliyoruz. */
    window.onclick = function (event) {
        if (!event.target.matches('#guests') && !event.target.matches('.guestsform')
            && !event.target.matches('.guestsform div')
            && !event.target.matches('.guestsform label')
            && !event.target.matches('.guestsform input')) {
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
