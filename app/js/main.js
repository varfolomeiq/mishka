"use strict";
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');
navToggle.addEventListener('click', function () {

    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
    }
});
/*Slider*/
$('#js-reviews').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
});
/*Modal*/
$('.characteristic__button').click(function () {
    //При клике на кнопку показывать окно
    $('.modal__content').addClass('modal-show');
    $('.modal').fadeIn('slow');
    //При клике вне окна закрывать окно
    $(document).mouseup(function (e) {
        var container = $('.modal');
        if (container.has(e.target).length === 0) {
            container.fadeOut('slow');
        }
    });
});

$('.catalog__description-link').click(function () {
    $('.modal__content').addClass('modal-show');
    $('.modal').fadeIn('slow');
    $(document).mouseup(function (e) {
        var container = $('.modal');
        if (container.has(e.target).length === 0) {
            container.fadeOut('slow');
        }
    });
});


