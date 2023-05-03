function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        if(modalTimerId) {
            clearInterval(modalTimerId);
        }
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal (modalSelector, modalBtnClose, modalTimerId) {
    const close = document.querySelector(modalBtnClose),
          modal = document.querySelector(modalSelector);
    
    if (close && modal) {  
        document.addEventListener('keydown', (event) => {
            if(event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal(modalSelector);
            }
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal(modalSelector);
            }
        });
    
        function showModalByScroll() {
            if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
                showModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
    
        window.addEventListener('scroll', showModalByScroll);
    }
}


export default modal;
export {showModal};
export {closeModal};