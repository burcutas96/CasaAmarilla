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



window.addEventListener("scroll", () => {
    const header = document.querySelector('.scroll-navbar');

    if (window.scrollY >= 270) {
        header.classList.add("open");
    } else {
        header.classList.remove("open");
    }
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
    
    let inclusive = document.querySelector('.inclusive');
    inclusive.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });



    /* Guests and Rooms altındaki formda, girilen değerlerin sayısal olup olmadığını 
    ve bu girilen değerlerin 0'dan büyük ve 99'dan küçük olma durumlarını kontrol ediyoruz. */
    const inputElements = document.querySelectorAll('.input-number');

    for (let i = 0; i < inputElements.length; i++) {
        const inputElement = inputElements[i];

        inputElement.addEventListener('input', function () {
            let inputValue = inputElement.value;
            inputElement.value = inputValue.replace(/\D/g, '');

            const numericValue = parseInt(inputElement.value);

            if (i === inputElements.length - 1) {
                if (isNaN(numericValue) || numericValue < 0 || numericValue > 6) {
                    inputElement.value = '';
                }
            }
            else if (isNaN(numericValue) || numericValue < 0 || numericValue > 24) {
                inputElement.value = '';
            }
        });
    }



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
    var adults = parseInt(document.getElementById('adults').value);
    var children = parseInt(document.getElementById('children').value);
    var rooms = parseInt(document.getElementById('rooms').value);

    var guestsandrooms = document.querySelector('.guestsandrooms');
    guestsandrooms.innerHTML = `${adults + children} Guests, ${rooms} Rooms`;



    /* Input-number elemanlarından birine odaklanmışken sayfanın herhangi bir 
        yerine tıklanırsa input'ların o anki değerleriyle işlem yapılmasını sağlıyoruz.
    */
    let inputNumberElements = [
        document.getElementById("rooms"),
        document.getElementById("adults"),
        document.getElementById("children")
    ];

    inputNumberElements.forEach(function (inputElement) {
        document.addEventListener("click", function (event) {
            if (event.target !== inputElement) {
                if (inputElement.value == "") {
                    inputElement.value = 1;
                }
                showCurrentValue(inputElement)
            }
        });
    });
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

    checkIfInputNumberEnter();

    const parentDiv = button.parentElement;
    const inputElement = parentDiv.querySelector('.input-number');

    var adults = parseInt(document.getElementById('adults').value);
    var children = parseInt(document.getElementById('children').value);
    var rooms = parseInt(document.getElementById('rooms').value);

    var guestsandrooms = document.querySelector('.guestsandrooms');
    let totalGuests;

    let currentValue = parseInt(inputElement.value);
    if (!isNaN(currentValue) && currentValue > minValue) {
        currentValue--;
        inputElement.value = currentValue;

        if (inputElement.id === 'adults') {
            totalGuests = (adults - 1) + children;

            if (totalGuests > 24) {
                inputElement.value = 0;
                totalGuests = parseInt(inputElement.value) + children;
            }
            if (totalGuests != 24) {
                executeEnableButtonActionsForGuests(inputElement.id, "children", parentDiv);
            }
            guestsandrooms.innerHTML = `${totalGuests} Guests, ${rooms} Rooms`;
        }
        else if (inputElement.id === 'children') {
            totalGuests = (children - 1) + adults;
            if (totalGuests > 24) {
                inputElement.value = 0;
                totalGuests = parseInt(inputElement.value) + adults;
            }
            if (totalGuests != 24) {
                executeEnableButtonActionsForGuests(inputElement.id, "adults", parentDiv);
            }
            guestsandrooms.innerHTML = `${totalGuests} Guests, ${rooms} Rooms`;
        }
        else {
            guestsandrooms.innerHTML = `${children + adults} Guests, ${currentValue} Rooms`;
            executeEnableButtonActionsForRooms();
        }
    }
}



/* Guests and rooms açılır menüsündeki artı butonuyla input'daki arttırma işlemini aşağıdaki fonksiyonla yapıyoruz. */
function IncreaseButton(button) {
    event.stopPropagation();

    checkIfInputNumberEnter();

    const parentDiv = button.parentElement;
    const inputElement = parentDiv.querySelector('.input-number');
    const guestsandrooms = document.querySelector('.guestsandrooms');

    let adults = parseInt(document.getElementById('adults').value);
    let children = parseInt(document.getElementById('children').value);
    let rooms = parseInt(document.getElementById('rooms').value);

    let currentValue = parseInt(inputElement.value);
    let totalGuests;

    if (inputElement.id === 'adults') {
        totalGuests = currentValue + children;
        handleGuestsCountIncrease(inputElement.id, "children", totalGuests, guestsandrooms, currentValue, rooms, inputElement, parentDiv)
    }
    else if (inputElement.id === 'children') {
        totalGuests = currentValue + adults;
        handleGuestsCountIncrease(inputElement.id, "adults", totalGuests, guestsandrooms, currentValue, rooms, inputElement, parentDiv)
    }
    else {
        totalGuests = children + adults;
        handleRoomCountIncrease(totalGuests, guestsandrooms, currentValue, inputElement, parentDiv)
    }
}



/* GuestsAndRooms input'larında girilmeyen, boş bir değer varsa onun yerine "1" yazdırıyoruz. */
function checkIfInputNumberEnter(){
    let inputNumberElements = document.querySelectorAll('.input-number');
    inputNumberElements.forEach(element => {
        if (element.value == "") {
            element.value = 1
        }
    });
}



/* Guests and rooms açılır menüsündeki arttırma işleminde, misafir sayısı 24'den küçükse değeri arttırmaya devam ediyoruz ve bunu ilgili yere 
    yazdırıyoruz. Ancak misafir sayısı 23'e eşitse arttırma işlemini son kez yapıyoruz. Ardından da adults ve children arttırma butonlarını pasif hâle getiriyoruz.
*/
function handleGuestsCountIncrease(elementName, siblingElementName, totalGuests, valuesDisplayElement, currentValue,
    roomsValue, inputElement, parentDiv) {

    if (totalGuests === 23 || totalGuests < 24) {
        currentValue++;
        inputElement.value = currentValue;
        valuesDisplayElement.innerHTML = `${totalGuests + 1} Guests, ${roomsValue} Rooms`;

        if(totalGuests === 23){
            executeDisableButtonActionsForGuests(elementName, siblingElementName, parentDiv);
        }
    }
    else {
        let siblingElementNameValue = parseInt(document.querySelector(`#${siblingElementName}`).value);
        if (siblingElementNameValue === 24) {

            inputElement.value = 0;
            executeDisableButtonActionsForGuests(elementName, siblingElementName, parentDiv);
        }
        else if (siblingElementNameValue === 23) {
            inputElement.value = 1;
            executeDisableButtonActionsForGuests(elementName, siblingElementName, parentDiv);
        }
        else {
            inputElement.value = 1;
        }
        valuesDisplayElement.innerHTML = `${(parseInt(inputElement.value) + siblingElementNameValue)} Guests, ${roomsValue} Rooms`;
    }
}



/* Guests and rooms açılır menüsündeki arttırma işlemini aşağıdaki belirli kurallara göre yapıyoruz. */
function handleRoomCountIncrease(totalGuests, valuesDisplayElement, currentValue, inputElement) {

    if (currentValue >= 6 || currentValue === 5) {
        executeDisableButtonActionsForRooms();
    }
    if (currentValue === 5 || currentValue < 6) {
        currentValue++;
        inputElement.value = currentValue;
    }
    valuesDisplayElement.innerHTML = `${totalGuests} Guests, ${currentValue} Rooms`;
}



/* Guests bölümünde disable hâle getirilecek olan butonlar için yapılması gereken bütün işlemleri, fonksiyonları içinde barından bir fonksiyon oluşturduk. */
function executeDisableButtonActionsForGuests(elementName, siblingElementName, parentDiv) {
    showOverlayGuests(elementName, siblingElementName, parentDiv);

    cursorAuto(elementName);
    cursorAuto(siblingElementName);

    toggleCounterButton(elementName);
    toggleCounterButton(siblingElementName);
}



/* Rooms bölümünde disable hâle getirilecek olan buton için yapılması gereken bütün işlemleri, fonksiyonları içinde barından bir fonksiyon oluşturduk. */
function executeDisableButtonActionsForRooms(){
    showOverlayRooms();
    cursorAuto("rooms");
    toggleCounterButton("rooms");
}



/* Rooms bölümünde etkinleştirilecek olan buton için yapılması gereken bütün işlemleri, fonksiyonları içinde barından bir fonksiyon oluşturduk. */
function executeEnableButtonActionsForRooms(){
    let elementName = "rooms";
    hideOverlayRooms(elementName);
    cursorPointer(elementName);
    toggleDisableCounterButton(elementName);
}



/* Guests bölümünde etkinleştirilecek olan butonlar için yapılması gereken bütün işlemleri, fonksiyonları içinde barından bir fonksiyon oluşturduk. */
function executeEnableButtonActionsForGuests(elementName, siblingElementName, parentDiv){
    hideOverlayGuests(elementName, siblingElementName, parentDiv);
    
    cursorPointer(elementName);
    cursorPointer(siblingElementName);

    toggleDisableCounterButton(elementName);
    toggleDisableCounterButton(siblingElementName);
}



/* Pasif hâle getirilen Guests butonlarında tıklamayı engellemek için oluşturulan div'lerin display  
    özelliklerini block yaptık. Ardından bu div'lere de tıklanılmaması için click olayını kaldırdık. 
*/
function showOverlayGuests(elementName, siblingElementName, parentDiv) {
    let overlay = parentDiv.querySelector(`#${elementName} + div .overlay`);
    let overlaySibling = document.querySelector(`#${siblingElementName} + div .overlay`);
    let clickButton = document.querySelector(`#${elementName} + div`);

    clickButton.onclick = null;
    overlay.classList.remove('d-none');
    overlay.classList.add('d-block');

    overlay.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });


    overlaySibling.classList.remove('d-none');
    overlaySibling.classList.add('d-block');

    overlaySibling.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
}



/* Pasif hâle getirilen Rooms butonunda tıklamayı engellemek için oluşturulan div'in display  
    özelliğini block yaptık. Ardından bu div'e de tıklanılmaması için click olayını kaldırdık. 
*/
function showOverlayRooms() {
    let elementName = "rooms";
    let overlay = document.querySelector(`#${elementName} + div .overlay`);
    let clickButton = document.querySelector(`#${elementName} + div`);

    clickButton.onclick = null;
    overlay.classList.remove('d-none');
    overlay.classList.add('d-block');

    overlay.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
}



/* Rooms butonundaki tıklama olayını tekrar aktif hâle getirip tıklamayı engellemek 
    için oluşturulan div'in display özelliğini none yaptık. 
*/
function hideOverlayRooms(elementName){
    let overlay = document.querySelector(`#${elementName} + div .overlay`);
    let clickButton = document.querySelector(`#${elementName} + div`);

    clickButton.onclick = function () {
        IncreaseButton(this);
    };

    overlay.classList.remove('d-block');
    overlay.classList.add('d-none');
}



/* Guests butonlarındaki tıklama olayını tekrar aktif hâle getirip tıklamayı engellemek 
    için oluşturulan div'lerin display özellilerini none yaptık. 
*/
function hideOverlayGuests(elementName, siblingElementName, parentDiv){
    let overlay = parentDiv.querySelector(`#${elementName} + div .overlay`);
    let clickButton = document.querySelector(`#${elementName} + div`);

    let clickButtonSibling = document.querySelector(`#${siblingElementName} + div`);
    let overlaySibling = clickButtonSibling.parentElement.querySelector(`#${siblingElementName} + div .overlay`)

    clickButton.onclick = function () {
        IncreaseButton(this);
    };

    clickButtonSibling.onclick = function () {
        IncreaseButton(this);
    };

    overlay.classList.remove('d-block');
    overlay.classList.add('d-none');

    overlaySibling.classList.remove('d-block');
    overlaySibling.classList.add('d-none');
}



/* Pasif hâle getirilen butonun class'ını, color ve border değerlerini değiştirdiğimiz bir class ile değiştiriyoruz. */
function toggleCounterButton(elementName) {
    let button = document.querySelector(`#${elementName} + div .bi-plus`);

    if (button.classList.contains('counter-button')) {
        button.classList.remove('counter-button');
        button.classList.add('disable-counter-button');
    }
}



/* Aktif hâle getirilen butonu eski hâline dönüştürüyoruz */
function toggleDisableCounterButton(elementName) {
    let button = document.querySelector(`#${elementName} + div .bi-plus`);

    if (button.classList.contains('disable-counter-button')) {
        button.classList.remove('disable-counter-button');
        button.classList.add('counter-button');
    }
}



function cursorAuto(elementName) {
    document.querySelector(`#${elementName} + div button`).style.cursor = "auto";
}



function cursorPointer(elementName) {
    document.querySelector(`#${elementName} + div button`).style.cursor = "pointer";
}



/* GuestsAndRooms kısmındaki input'lara giriş yapıldıktan sonra enter 
    tuşuna basıldığı taktirde o anki değerleri ekrana yazdıran fonksiyonu tetikliyoruz. 
*/
function checkEnterKey(event, input) {
    if (event.key === 'Enter') {
        showCurrentValue(input);
    }

    /* Tab ve Shift tuşuna basıldıysa bir sonraki input'a odaklanıyoruz. */
    else if (event.key === "Tab" || event.shiftKey) {
        event.preventDefault();
        let inputs = document.querySelectorAll('.input-number');
        let currentIndex = Array.from(inputs).indexOf(input);

        if (currentIndex >= 0 && currentIndex < 2) {
            if(inputs[currentIndex].value == ""){
                inputs[currentIndex].value = 0;
            }
            inputs[currentIndex + 1].focus();
        }
        showCurrentValue(input);
    }
}



function showCurrentValue(input) {
    var childrenValue = parseInt(document.querySelector('#children').value);
    var roomsValue = parseInt(document.querySelector('#rooms').value);
    var adultsValue = parseInt(document.querySelector('#adults').value);

    var guestsandrooms = document.querySelector('.guestsandrooms');
    var Guests = adultsValue + childrenValue;

    if (input.id === "adults") {
        updateGuestsInfo(input.id, "children", Guests, guestsandrooms, roomsValue, input);
    }
    else if (input.id === "children") {
        updateGuestsInfo(input.id, "adults", Guests, guestsandrooms, roomsValue, input);
    }
    else {
        if (roomsValue === 6) {
            executeDisableButtonActionsForRooms();
        }
        else if (roomsValue < 6) {
            executeEnableButtonActionsForRooms();
        }
        else {
            input.value = 1;
        }
        guestsandrooms.innerHTML = `${Guests} Guests, ${input.value} Rooms`;
    }
}



function updateGuestsInfo(elementName, siblingElementName, Guests, valuesDisplayElement, roomsValue, inputElement) {
    let parentDiv = inputElement.parentElement;

    if (Guests > 24) {
        let siblingElementNameValue = parseInt(document.querySelector(`#${siblingElementName}`).value);

        if (siblingElementNameValue === 24) {
            inputElement.value = 0;
        }
        else if (siblingElementNameValue === 23){
            inputElement.value = 1;
            executeDisableButtonActionsForGuests(elementName, siblingElementName, parentDiv);
        }
        else {
            inputElement.value = 1;
            executeEnableButtonActionsForGuests(elementName, siblingElementName, parentDiv)
        }
        valuesDisplayElement.innerHTML = `${(parseInt(inputElement.value) + siblingElementNameValue)} Guests, ${roomsValue} Rooms`;
    }
    else if (Guests === 24) {
        executeDisableButtonActionsForGuests(elementName, siblingElementName, parentDiv);
        valuesDisplayElement.innerHTML = `${Guests} Guests, ${roomsValue} Rooms`;
    }
    else if (Guests < 24) {
        executeEnableButtonActionsForGuests(elementName, siblingElementName, parentDiv)
        valuesDisplayElement.innerHTML = `${Guests} Guests, ${roomsValue} Rooms`;
    }
}



/* Ekran boyutunun değiştiği her anda kontrol edilmesi gereken fonksiyonları, resize event'iyle tetikliyoruz. */
window.addEventListener('resize', dropdownClick);
