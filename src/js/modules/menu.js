const menu = () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.header__menu'),
          menuList = document.querySelector('.header__list'),
          close = document.querySelector('.header__list-close');

    function showMenu() {
        menu.classList.add('show');
        document.body.style.overflow = 'hidden'
    }

    function hideMenu() {
        menu.classList.remove('show');
        document.body.style.overflow = 'visible'
    }

    hamburger.addEventListener('click', () => {
        showMenu();
    });

    close.addEventListener('click', () => {
        hideMenu();
    });

    menu.addEventListener('click', (e) => {
        if(menuList != e.target) {
            hideMenu();
        }
    });
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape' && menu.classList.contains('show')) {
            hideMenu();
        }
    });
};

export default menu;