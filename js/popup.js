
const popupLink = document.querySelectorAll('.link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 500;
const scrollLock = {
    scrollTop: 0,
    disabledOff() {
        scrollLock.scrollTop = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            position: fixed;
            top: -${scrollLock.scrollTop}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `;
        document.documentElement.style.scrollBehavior = 'unset';
    },
    enabledOn() {
        document.body.style.cssText = '';
        window.scroll({ top: scrollLock.scrollTop });
        document.documentElement.style.scrollBehavior = '';
    },
};

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
    console.log('111')
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
            console.log('112')
        } else {
            bodyLock();
        }
        popupCurent.classList.add('popup--open');
        console.log('113')
        popupCurent.addEventListener("click", function(e){
            if(!e.target.closest('.popup__body')){
                popupClose(e.target.closest('.popup'));
            }
            console.log('114')
        });
    }
};
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        console.log('115')
        popupActive.classList.remove('popup--open');
        if (doUnlock) {
            bodyUnLock();
            console.log('116')
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
    body.style.paddingRight = lockPaddingValue;
    scrollLock.disabledOff();
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
        console.log('118')
        body.style.paddingRight = '0px';
        scrollLock.enabledOn()
        console.log('118')
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
        console.log('117')
    }, timeout);
};

/*----------------MENU------------------------*/
const menuIcon = document.querySelector('.header__menu');
const containerNavigation = document.querySelector('.header__nav');
const subMenu = document.querySelector('.header__sub-nav');
const subMenuIcon = document.querySelector('.header__sub-arrow');
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
        const isClickInsideMenu = containerNavigation.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInsideMenu) {
            closeMenu();
        }
    });