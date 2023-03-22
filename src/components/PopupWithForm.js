import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {popupCloseButtonSelector, popupInputSelector, popupFormSelector}, submitFormHandler) {
        super(popupSelector, popupCloseButtonSelector);
        
        this._submitFormHandler = submitFormHandler;
        this._inputArray = Array.from(this._popup.querySelectorAll(popupInputSelector));
        this._form = this._popup.querySelector(popupFormSelector);
        this._openEvent = new Event('open');
    };

    _getInputValues() {
        const inputValues = {};
        this._inputArray.forEach(input => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    open(inputValues) {
        this._inputArray.forEach(input => {
            input.value = inputValues[input.name];
        });
        super.open();
        this._form.dispatchEvent(this._openEvent);
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {this._submitFormHandler(this._getInputValues())});
    }
};