"use strict";

import {imgPopup,imgPopupImage,imgPopupCaption,openPopup} from './general.js';

export class Card {
  constructor({name, link}, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _openImgPopupHandler() {
    imgPopupCaption.textContent = this._name;
    imgPopupImage.src = this._link;
    imgPopupImage.alt = this._name;
    openPopup(imgPopup);
  }

  _clickTrashHandler() { 
    this._cardElement.closest('.figure').remove();
  }

  _activeLikeHandler () {
    this._cardElementLike.classList.toggle('figure__like_active');
  }
  
  getCardElevent() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.figure').cloneNode(true);
    this._cardElementText  = this._cardElement.querySelector('.figure__text');
    this._cardElementImg   = this._cardElement.querySelector('.figure__img');
    this._cardElementLike  = this._cardElement.querySelector('.figure__like');
    this._cardElementTrash = this._cardElement.querySelector('.figure__trash');
    
    this._cardElementText.textContent = this._name;
    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;

    this._cardElementImg.addEventListener('click', () => {this._openImgPopupHandler()});
    this._cardElementLike.addEventListener('click', () => {this._activeLikeHandler()});
    this._cardElementTrash.addEventListener('click', () => {this._clickTrashHandler();});

    return this._cardElement;
  }
}
