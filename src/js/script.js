import menu from "./modules/menu"; 
import privacyFullText from './modules/privacyFullText';
import modal from './modules/modal';
import {showModal} from './modules/modal';
import forms from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 50000);
    modal('.modal', '.modal__close', modalTimerId);
    menu();
    privacyFullText();
    forms('.form', '.modal', modalTimerId);
});