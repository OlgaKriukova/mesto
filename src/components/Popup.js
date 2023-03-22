export default class Popup {
    constructor (popupSelector, popupCloseButtonSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(popupCloseButtonSelector);
        //привязка this
        this.open = this.open.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    _handleEscClose(evt) { 
        if (evt.key === 'Escape') {
          this.close();
        }
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }  

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
            
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.closest('.popup__container') == null) {
                this.close();
            }
        });
    }
}