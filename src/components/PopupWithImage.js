import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor (popupSelector, {popupCloseButtonSelector, imgElementSelector, captionElementSelector}) {
        super(popupSelector, popupCloseButtonSelector);

        this._imgElement = this._popup.querySelector(imgElementSelector);
        this._captionElement = this._popup.querySelector(captionElementSelector);
    }

    open({name, link}) {
        this._imgElement.src = link;
        this._imgElement.alt = name;
        this._captionElement.textContent = name;
        
        super.open();
    };
}