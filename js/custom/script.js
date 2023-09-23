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



    /* Verdiğimiz tarihi "Wed, 22.09.23" şeklinde formatlayan bir fonksiyon hazırladık.*/
    function formatDate(date) {
        var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        var formattedDate = daysOfWeek[date.getDay()] + ', ' +
            ('0' + date.getDate()).slice(-2) + '.' +
            ('0' + (date.getMonth() + 1)).slice(-2) + '.' +
            ('' + date.getFullYear()).slice(-2);

        return formattedDate;
    }



    /* Bugünün tarihini, rezervasyon kısmındaki .checkInDate elemanının içerisine yazdırıyoruz. */
    var today = new Date();
    document.querySelector('.checkInDate').innerHTML = formatDate(today);



    /* Yarının tarihini, rezervasyon kısmındaki .checkOutDate elemanının içerisine yazdırıyoruz. */
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    document.querySelector('.checkOutDate').innerHTML = formatDate(tomorrow);



    /* Pikaday kütüphanesiyle tarih seçici oluşturduk. Ve temizleme ikonlarıyla tarih ikonlarını,
    hemen yanlarındaki tarih seçiciyle ilişkilendirdik. */
    const clearIcons = document.querySelectorAll('.dateInput .clear-icon');
    const dateIcons = document.querySelectorAll('.dateInput .date-icon');
    const datePickers = document.querySelectorAll('.datePicker');

    var checkInDate = document.querySelector('.checkInDate');
    var checkOutDate = document.querySelector('.checkOutDate');
    var checkIn = document.getElementById('checkIn');
    var checkOut = document.getElementById('checkOut');

    createDatePicker(datePickers[0], checkInDate, checkIn, today, today, clearIcons[0], dateIcons[0]);
    createDatePicker(datePickers[1], checkOutDate, checkOut, today, tomorrow, clearIcons[1], dateIcons[1]);

    function createDatePicker(inputField, dateDisplayElement, dateInputElement, minimumDate,
        todayOrTomorrow, clearIconElement, dateIconElement) {
        const datePicker = new Pikaday({
            field: inputField,
            minDate: minimumDate,
            // date formatını aşağıda ayarladım.
            toString(date) {
                const day = date.toLocaleString('en', { weekday: 'short' });
                const year = date.getFullYear().toString().slice(-2);
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const dayOfMonth = ('0' + date.getDate()).slice(-2);
                return `${day}, ${dayOfMonth}.${month}.${year}`;
            },
            onSelect: function (date) {
                var selectedDate = datePicker.toString();
                dateInputElement.value = '';
                dateDisplayElement.textContent = selectedDate;
            }
        });

        clearIconElement.addEventListener('click', () => {
            dateDisplayElement.textContent = formatDate(todayOrTomorrow);
        });

        dateIconElement.addEventListener('click', () => {
            if (datePicker.isVisible()) {
                datePicker.hide();
            } else {
                datePicker.show();
            }
        });
        return datePicker;
    }



    /* Aşağıdaki fonksiyonla reservasyon kısmındaki guests and rooms açılır menüsünü, sayfada herhangi bir yere tıklayınca kapanmasını sağlıyoruz. */
    /* Ve tabi açılır menüye ait olan butona veya açılır menüye tıklayınca dropdown'ın kapatılmasını aşağıdaki koşullarla engelliyoruz. */
    window.onclick = function (event) {
        if (!event.target.matches('#guests') && !event.target.matches('.guestsform')
            && !event.target.matches('.guestsform div')
            && !event.target.matches('.guestsform label')
            && !event.target.matches('.guestsform button')
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



    /* Başlangıçtaki Guests and Rooms değerlerini yazdırıyoruz. */
    var guestsandrooms = document.querySelector('.guestsandrooms');

    var adults = parseInt(document.getElementById('adults').value);
    var children = parseInt(document.getElementById('children').value);
    var rooms = parseInt(document.getElementById('rooms').value);

    guestsandrooms.innerHTML = `${adults + children} Guests, ${rooms} Rooms`;

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

    var guestsandrooms = document.querySelector('.guestsandrooms');

    var adults = parseInt(document.getElementById('adults').value);
    var children = parseInt(document.getElementById('children').value);
    var rooms = parseInt(document.getElementById('rooms').value);

    let currentValue = parseInt(inputElement.value);
    if (!isNaN(currentValue) && currentValue > minValue) {
        currentValue--;
        inputElement.value = currentValue;

        if (inputElement.id === 'adults') {
            guestsandrooms.innerHTML = `${(adults - 1) + children} Guests, ${rooms} Rooms`;
            handleGuestsCountDecrease(inputElement.id, "children", parentDiv);
        }
        
        if (inputElement.id === 'children') {
            guestsandrooms.innerHTML = `${(children - 1) + adults} Guests, ${rooms} Rooms`;
            handleGuestsCountDecrease(inputElement.id, "adults", parentDiv);
        }

        if (inputElement.id === 'rooms') {
            guestsandrooms.innerHTML = `${children + adults} Guests, ${currentValue} Rooms`;
            handleRoomCountDecrease(parentDiv);
        }
    }
}



/* Guests and rooms açılır menüsündeki misafir sayısı, 48'i geçtiğinde adults ve children butonlarını pasif hâle 
    getiriyoruz ancak bu input'larda bir eksiltme işlemi yapıldığında yani misafir sayısı 48'in altına düştüğünde bu butonları 
    tekrar aktif hâle getirebilmek için aşağıdaki fonksiyonu kullanıyoruz.
*/
function handleGuestsCountDecrease(elementName, siblingElementName, parentDiv){

    let overlay = parentDiv.querySelector(`#${elementName} + div .overlay`);
    let clickButton = document.querySelector(`#${elementName} + div`);
    
    let clickButtonSibling = document.querySelector(`#${siblingElementName} + div`);
    let overlaySibling =  clickButtonSibling.parentElement.querySelector(`#${siblingElementName} + div .overlay`)

    clickButton.onclick = function() {
        IncreaseButton(this);
    };

    clickButtonSibling.onclick = function() {
        IncreaseButton(this);
    };

    overlay.classList.remove('d-block');
    overlay.classList.add('d-none');

    overlaySibling.classList.remove('d-block');
    overlaySibling.classList.add('d-none');
    
    cursorPointer(elementName);
    cursorPointer(siblingElementName);

    toggleDisableCounterButton(elementName);
    toggleDisableCounterButton(siblingElementName);
}



/* Guests and rooms açılır menüsündeki oda sayısı, 6'yı geçtiğinde ilgili butonu pasif hâle getiriyoruz ancak bu 
    input'ta bir eksiltme işlemi yapıldığında yani oda sayısı 6'nın altına düştüğünde bu butonu 
    tekrar aktif hâle getirebilmek için aşağıdaki fonksiyonu kullanıyoruz.
*/
function handleRoomCountDecrease(parentDiv){
    let elementName = "rooms";
    let overlay = parentDiv.querySelector(`#${elementName} + div .overlay`);
    let clickButton = document.querySelector(`#${elementName} + div`);

    clickButton.onclick = function() {
        IncreaseButton(this);
    };

    overlay.classList.remove('d-block');
    overlay.classList.add('d-none');

    cursorPointer(elementName);
    toggleDisableCounterButton(elementName);
}



/* Guests and rooms açılır menüsündeki artı butonuyla input'daki arttırma işlemini aşağıdaki fonksiyonla yapıyoruz. */
function IncreaseButton(button) {
    event.stopPropagation();

    const parentDiv = button.parentElement;
    const inputElement = parentDiv.querySelector('.input-number');
    const guestsandrooms = document.querySelector('.guestsandrooms');

    let adults = parseInt(document.getElementById('adults').value);
    let children = parseInt(document.getElementById('children').value);
    let rooms = parseInt(document.getElementById('rooms').value);
    
    let currentValue = parseInt(inputElement.value);
    let totalGuests;

    if (!isNaN(currentValue) && currentValue >= 0 && currentValue < 49) {
        
        if (inputElement.id === 'adults') {
            totalGuests = currentValue + children;
            handleGuestsCountIncrease(inputElement.id, "children", totalGuests, guestsandrooms, currentValue, rooms, inputElement, parentDiv)
        }

        if (inputElement.id === 'children') {
            totalGuests = currentValue + adults;
            handleGuestsCountIncrease(inputElement.id, "adults", totalGuests, guestsandrooms, currentValue, rooms, inputElement, parentDiv)
        }

        if (inputElement.id === 'rooms') {
            totalGuests = children + adults;
            handleRoomCountIncrease(totalGuests, guestsandrooms, currentValue, inputElement, parentDiv)
        }
    }
}



/* Guests and rooms açılır menüsündeki arttırma işleminde, misafir sayısı 48'den küçükse değeri arttırmaya devam ediyoruz ve bunu ilgili yere 
    yazdırıyoruz. Ancak misafir sayısı 47'e eşitse arttırma işlemini son kez yapıyoruz. Ardından da adults ve children arttırma butonlarını pasif hâle getiriyoruz.
*/
function handleGuestsCountIncrease(elementName, siblingElementName, totalGuests, valuesDisplayElement, currentValue, 
        roomsValue, inputElement, parentDiv)
    {
    
    if (totalGuests === 47){
        currentValue++;
        inputElement.value = currentValue;
        valuesDisplayElement.innerHTML = `${totalGuests + 1} Guests, ${roomsValue} Rooms`;
        
        let overlay = parentDiv.querySelector(`#${elementName} + div .overlay`);
        let clickButton = document.querySelector(`#${elementName} + div`);

        clickButton.onclick = null;
        overlay.classList.remove('d-none');
        overlay.classList.add('d-block');

        overlay.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
   
        cursorAuto(elementName);
        cursorAuto(siblingElementName);
    
        toggleCounterButton(elementName);
        toggleCounterButton(siblingElementName);
    }
    else if (totalGuests < 48) {
        currentValue++;
        inputElement.value = currentValue;
        valuesDisplayElement.innerHTML = `${totalGuests + 1} Guests, ${roomsValue} Rooms`;
    }
}



/* Guests and rooms açılır menüsündeki arttırma işleminde, oda sayısı 7'den küçükse değeri arttırmaya devam ediyoruz ve bunu ilgili yere 
    yazdırıyoruz. Ancak oda sayısı 6'ya eşitse arttırma işlemini son kez yapıyoruz. Ardından da bu arttırma butonunu pasif hâle getiriyoruz.
*/
function handleRoomCountIncrease(totalGuests, valuesDisplayElement, currentValue, inputElement, parentDiv){
    
    if((currentValue + 1) === 6){
        currentValue++;
        inputElement.value = currentValue;
        valuesDisplayElement.innerHTML = `${totalGuests} Guests, ${currentValue} Rooms`;

        let overlay = parentDiv.querySelector('#rooms + div .overlay');
        let clickButton = document.querySelector(`#rooms + div`);

        clickButton.onclick = null;
        overlay.classList.remove('d-none');
        overlay.classList.add('d-block');

        overlay.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        cursorAuto("rooms");
        toggleCounterButton("rooms");
    }
    else if ((currentValue + 1) < 7) {
        currentValue++;
        inputElement.value = currentValue;
        valuesDisplayElement.innerHTML = `${totalGuests} Guests, ${currentValue} Rooms`;
    }
}



/* Pasif hâle getirilen butonun class'ını, color ve border değerlerini değiştirdiğimiz bir class ile değiştiriyoruz. */
function toggleCounterButton(elementName){
    let button = document.querySelector(`#${elementName} + div .bi-plus`);

    if(button.classList.contains('counter-button')){
        button.classList.remove('counter-button');
        button.classList.add('disable-counter-button');
    }
}



/* Aktif hâle getirilen butonu eski hâline dönüştürüyoruz */
function toggleDisableCounterButton(elementName){
    let button = document.querySelector(`#${elementName} + div .bi-plus`);

    if(button.classList.contains('disable-counter-button')){
        button.classList.remove('disable-counter-button');
        button.classList.add('counter-button');
    }
}



/* Butonun imleç(cursor) stilini "auto" olarak ayarlar. */
function cursorAuto(elementName) {
    document.querySelector(`#${elementName} + div button`).style.cursor = "auto";
}



/* Butonun imleç(cursor) stilini "pointer" olarak ayarlar. */
function cursorPointer(elementName) {
    document.querySelector(`#${elementName} + div button`).style.cursor = "pointer";
}



/* Ekran boyutunun değiştiği her anda kontrol edilmesi gereken fonksiyonları, resize event'iyle tetikliyoruz. */
window.addEventListener('resize', dropdownClick);
