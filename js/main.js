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
const lockPadding = document.querySelectorAll('.header__lock-padding--js');
let unlock = true;
const timeout = 300;


if (popupLink.length > 0) {
    for (let index = 0; index <popupLink.length; index++){
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
    for (let index = 0; index <popupCloseIcon.length; index++){
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
const lockPaddingValue = window.innerWidth - document.body.offsetWidth;
function bodyLock(){
    if (lockPadding.length > 0) {
        for (let index = 0; index <lockPadding.length; index++) {
            const el = lockPadding[index];
            const rightPaddingEl = parseInt(window.getComputedStyle(el).getPropertyValue("padding-right")) ;
            console.log(rightPaddingEl);
            el.style.paddingRight = rightPaddingEl + lockPaddingValue +'px';
        }
    }
    document.body.style.paddingRight = lockPaddingValue + 'px';
    scrollController.disabledScroll();
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
};
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index <lockPadding.length; index++) {
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
        bodyUnLock();
    };

    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('header__menu--open');
        containerNavigation.classList.toggle('header__nav--open');
        if (menuIcon.classList.contains('header__menu--open')) {
            bodyLock();
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


/*------------- Password show -----------*/
const passBtn = document.querySelectorAll('.popup__form-show-password');
passBtn.forEach(function(btn){
    btn.onclick = function(){
        let target = this.getAttribute('data-target'),
        passInput = document.querySelector(target);

        if (passInput.getAttribute('type') === 'password'){
            passInput.setAttribute('type', 'text');
            btn.classList.add('popup__form-show-password--open');
        } else {
            passInput.setAttribute('type', 'password');
            btn.classList.remove('popup__form-show-password--open');
            document.getElementById('popup__form-show-password').reset();
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
/*------------Search-----------*/
const search = document.querySelector('.search__mobile');
const searchHeader = document.querySelector('.header');
if (search){
    search.addEventListener("click", function(e){
        document.body.classList.toggle('header__search--open');
    });
    document.addEventListener("click", function(event) {
        const isClickInsideSearch = search.contains(event.target) || searchHeader.contains(event.target);
        if (!isClickInsideSearch) {
            document.body.classList.remove('header__search--open');
        }
    });
}


/*-----------SWIPER SLIDER---------------------*/
let sliderMain = new Swiper('.slider-main',{
    direction: 'horizontal',
    loop: true,
    slidesPerView: 0.4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    speed: 800,
    freeMode: true,
    breakpoints:{
        550:{
          slidesPerView: 0.5,
          spaceBetween: 20,
        },
        769:{
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
        551:{
            slidesPerView: 2,
            spaceBetween: 20,
          },
        921:{
            slidesPerView: 3,
            spaceBetween: 20,
          },
        1171:{
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
        551:{
            slidesPerView: 2,
           spaceBetween: 20,
          },
        921:{
            slidesPerView: 3,
            spaceBetween: 20,
          },
        1171:{
            spaceBetween: 28,
            slidesPerView: 4,
        },
    }
});

/*-----------Favorite------------ */

const btnFavorites = document.querySelectorAll('.recipe-card__favorites-btn');
const btnLikeCard = document.querySelectorAll('.upper-card__like-btn');

btnFavorites.forEach(btnFavorite => {
    btnFavorite.addEventListener('click', function(event){
            btnFavorite.classList.toggle('recipe-card__favorites-btn--active');
    });
});
btnLikeCard.forEach(btnLikeCard => {
    btnLikeCard.addEventListener('click', function(event){
        btnLikeCard.classList.toggle('upper-card__like-btn--active');
    });
});






