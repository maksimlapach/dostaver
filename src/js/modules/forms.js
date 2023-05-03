import {postData} from "../services/services";
import modal, {closeModal, showModal} from "./modal";
import IMask from "imask";

function forms(formSelector, modalSelector, modalTimerId) {
    const phone = document.querySelectorAll('.form__input');
    const maskOptions = {
            mask: '+{38}(000)000-00-00',
            min: 5
          };
    const masks = [];
    phone.forEach(item => {
       const mask = IMask(item, maskOptions);
       masks.push(mask);
    });

    const forms = document.querySelectorAll(formSelector);
    forms.forEach(item => {
        bindPostData(item); 
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const formInput = form.querySelector(".form__input");
            const valueForm = Object.fromEntries(formData.entries());
            if(valueForm.phone.length < 17) {
                formInput.style.cssText = 'box-shadow: 0px 0px 30px red;';
            } else {
                const json = JSON.stringify(valueForm);

                postData('http://localhost:3000/requests', json)
                    .then(() => {
                        showResultModal('success');
                    })
                    .catch(() => {
                        showResultModal('error');
                    })
                    .finally(() => {
                        form.reset();
                        masks.forEach(item => {
                            item.updateValue();
                        });
                        formInput.style.cssText = 'box-shadow: none;';
                    })
            }
        });
    }

    function showResultModal(result) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        showModal('.modal', modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        if(result == 'success') {
            thanksModal.innerHTML = `
                <div class="modal__content modal__content_thanks">
                    <div data-close class="modal__close"></div>
                    <img class="modal__logo_thanks" src="icons/modals/thanks.svg" alt="thanks">
                    <div class="modal__title">Дякую за заявку!</div>
                    <div class="modal__subtitle">Найближчим часом ми зв'яжемося з вами</div>
                </div>
            `;
        } else if(result == 'error') {
            thanksModal.innerHTML = `
                <div class="modal__content modal__content_thanks">
                    <div data-close class="modal__close"></div>
                    <img class="modal__logo_thanks" src="icons/modals/thanks.svg" alt="thanks">
                    <div class="modal__title">Нажаль сталась помилка(</div>
                    <div class="modal__subtitle">Спробуйте ще раз)</div>
                </div>
            `;
        }
        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modalSelector);
        }, 3000);
    }
}

export default forms;