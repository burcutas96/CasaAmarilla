'use strict';

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


