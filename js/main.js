'use strict'
/*----------------MENU------------------------*/

const menuIcon = document.querySelector('.header__menu');
const containerNavigation = document.querySelector('.header__nav');
const subMenu = document.querySelector('.header__sub-list');
if (menuIcon){
    menuIcon.addEventListener("click", function(e){
        document.body.classList.toggle('body--lock');
        menuIcon.classList.toggle('header__menu--open');
        containerNavigation.classList.toggle('header__nav--open');
        subMenu.parentElement.classList.toggle('header__nav-item--open');
    });
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
        containerNavigation.classList.remove('header__nav--open');
        menuIcon.classList.remove('header__menu--open');
        document.body.classList.remove('body--lock');
        document.body.classList.remove('header__search--open');
    }
});
/*------------Search-----------*/
const search = document.querySelector('.search__mobile');
if (search){
    search.addEventListener("click", function(e){
        document.body.classList.toggle('header__search--open');
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
})

/*------------- PopUp -----------*/

const popupLink = document.querySelectorAll('.link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
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
}

let popupCloseIcon = document.querySelectorAll('.popup__close');
if(popupCloseIcon.length > 0){
    for (let index = 0; index < popupCloseIcon.length; index++){
        let el = popupCloseIcon[index];
        el.addEventListener("click", function(e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen (popupCurent){
    if(popupCurent && unlock){
        const popupActive = document.querySelector('.popup.popup--open');
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
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('popup--open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.lenght > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('body--lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.lenght > 0) {
            for (let index = 0; index < lockPadding.lenght; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('body--lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
    document.addEventListener('keydown', function(e){
        if (e.which === 27){
            const popupActive = document.querySelector('.popup.popup--open');
            popupClose(popupActive);
        }
    });



/*-----------SWIPER SLIDER---------------------*/
new Swiper('.slide-card',{
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 21,
    breakpoints:{
      380:{
        slidesPerView: 'auto',
        spaceBetween: 32,
      }

    }
});
