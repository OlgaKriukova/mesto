import Popup from "./Popup.js";
import {selectors} from '../utils/constants.js';

export default class PopupWithImage extends Popup{
    constructor (popupSelector) {
        super(popupSelector);

        this._imgElement = this._popup.querySelector(selectors.imgElementSelector);
        this._captionElement = this._popup.querySelector(selectors.captionElementSelector);
    }

    open({name, link}) {
        this._imgElement.src = link;
        this._imgElement.alt = name;
        this._captionElement.textContent = name;
        
        super.open();
    };
}