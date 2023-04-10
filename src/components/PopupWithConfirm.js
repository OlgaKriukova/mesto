import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, {popupCloseButtonSelector, popupFormSelector}) {
        super(popupSelector, popupCloseButtonSelector);
        this._form = this._popup.querySelector(popupFormSelector);
    };
    
    setSubmitFormHandler(submitFormHandler) {
        this._submitFormHandler = submitFormHandler;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log('PopupWithConfirm submit');
            this._submitFormHandler();
        });
    }
};
