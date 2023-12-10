'use strict'
/*----------------------POPUP-------------------*/
const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        scrollController.scrollPosition = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            position: fixed;
            top: -${scrollController.scrollPosition}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `;
        document.documentElement.style.scrollBehavior = 'unset';
    },
    enabledScroll() {
        document.body.style.cssText = '';
        window.scroll({ top: scrollController.scrollPosition });
        document.documentElement.style.scrollBehavior = '';
    },
};
const popupLink = document.querySelectorAll('.popup-btn--js');
const lockPadding = document.querySelectorAll('.header__lock-padding-js');
let unlock = true;
const timeout = 500;


if (popupLink.length > 0) {
    for (let index = 0; index < popupLink.length; index++){
        const link = popupLink[index];
        link.addEventListener("click", function(e){
            const popupName = link.getAttribute('href').replace('#', '');
            const popupCurent = document.getElementById(popupName);
            popupOpen(popupCurent);
            e.preventDefault();
        })
    }
};

let popupCloseIcon = document.querySelectorAll('.popup__close');
if(popupCloseIcon.length > 0){
    for (let index = 0; index < popupCloseIcon.length; index++){
        let el = popupCloseIcon[index];
        el.addEventListener("click", function(e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
};

function popupOpen (popupCurent){
    if(popupCurent && unlock){
        const popupActive = document.querySelector('.popup--open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        popupCurent.classList.add('popup--open');
        popupCurent.addEventListener("click", function(e){
            if(!e.target.closest('.popup__body')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }
};
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('popup--open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
};
function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    document.body.style.paddingRight = lockPaddingValue;
    scrollController.disabledScroll();
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
};
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        document.body.style.paddingRight = '0px';
       scrollController.enabledScroll();
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
};


/*----------------MENU------------------------*/
const menuIcon = document.querySelector('.header__menu');
const containerNavigation = document.querySelector('.header__nav');
const subMenu = document.querySelector('.header__sub-nav');
const subMenuIcon = document.querySelector('.header__sub-arrow');

    function closeMenu() {
        menuIcon.classList.remove('header__menu--open');
        containerNavigation.classList.remove('header__nav--open');
        scrollController.enabledScroll();
    };

    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('header__menu--open');
        containerNavigation.classList.toggle('header__nav--open');
        if (menuIcon.classList.contains('header__menu--open')) {
            scrollController.disabledScroll();
        } else {
            closeMenu();
        }
    });

    subMenuIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        subMenuIcon.classList.toggle('header__sub-arrow--close');
        subMenu.classList.toggle('header__sub-nav--close');
    });

    document.addEventListener('click', function(event) {
        const isMenuOpen = menuIcon.classList.contains('header__menu--open');
        const isClickInsideMenu = containerNavigation.contains(event.target) || menuIcon.contains(event.target);
        if (isMenuOpen && !isClickInsideMenu) {
            closeMenu();
        }
    });


/*------------Search-----------*/
const searchForm = document.querySelector('.search-form');
if (searchForm){
    searchForm.addEventListener("click", function(e){
        searchForm.classList.toggle('search-form--active')
    });
}
const search = document.querySelector('.search__mobile');
const searchHeader = document.querySelector('.header');
const searchResult = document.querySelector('.search-form__result');
if (search){
    search.addEventListener("click", function(e){
        document.body.classList.toggle('header__search--open');
    });
    document.addEventListener("click", function(event) {
        const isClickInsideSearch = search.contains(event.target) || searchHeader.contains(event.target)||searchResult.contains(event.target);
        if (!isClickInsideSearch) {
            document.body.classList.remove('header__search--open');
            searchForm.classList.remove('search-form--active')
        }
    });
}


/*------------- Password show -----------*/
const passBtn = document.querySelectorAll('.signin__password-btn');
passBtn.forEach(function(btn){
    btn.onclick = function(){
        let target = this.getAttribute('data-target'),
        passInput = document.querySelector(target);

        if (passInput.getAttribute('type') === 'password'){
            passInput.setAttribute('type', 'text');
            btn.classList.add('signin__password-btn--show');
        } else {
            passInput.setAttribute('type', 'password');
            btn.classList.remove('signin__password-btn--show');
            document.getElementById('signin__password-btn').reset();
        }
    }
});

/*------------Escape key--------*/
 window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
        containerNavigation.classList.remove('header__nav--open');
        menuIcon.classList.remove('header__menu--open');
        document.body.classList.remove('body--lock');
        document.body.classList.remove('header__search--open');
        const popupActive = document.querySelector('.popup.popup--open');
        popupClose(popupActive);
    }
});


/*-----------SWIPER SLIDER---------------------*/
let sliderMain = new Swiper('.slider-main',{
    direction: 'horizontal',
    loop: true,
    slidesPerView: 0.4,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    speed: 800,
    freeMode: true,
    breakpoints:{
        440:{
            slidesPerView: 0.5,
            spaceBetween: 30,
          },
        550:{
          slidesPerView: 0.8,
          spaceBetween: 30,
        },
        768:{
            slidesPerView: 'auto',
            spaceBetween: 30,
          }
      }

});
let sliderSmallFirst = new Swiper ('.recipe-slider-1',{
    direction: 'horizontal',
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
        nextEl: ".slider-small__btn-next",
        prevEl: ".slider-small__btn-prev",
    },
    speed: 800,
    breakpoints:{
        401:{
            slidesPerView: 2,
            spaceBetween: 20,
          },
        769:{
            slidesPerView: 3,
            spaceBetween: 20,
          },
        1161:{
            spaceBetween: 28,
            slidesPerView: 4,
        },
    }
});
let sliderSmallSecond = new Swiper ('.recipe-slider-2',{
    direction: 'horizontal',
    loop: true,
   spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
        nextEl: ".slider-small__btn-next",
        prevEl: ".slider-small__btn-prev",
    },
    speed: 800,
    breakpoints:{
        401:{
            slidesPerView: 2,
           spaceBetween: 20,
          },
        769:{
            slidesPerView: 3,
            spaceBetween: 20,
          },
        1161:{
            spaceBetween: 28,
            slidesPerView: 4,
        },
    }
});
