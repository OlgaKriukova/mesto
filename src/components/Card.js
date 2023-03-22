import {selectors} from '../utils/constants.js';

export class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _clickTrashHandler() { 
    this._cardElement.remove();
    this._cardElement = null;
  }

  _activeLikeHandler () {
    this._cardElementLike.classList.toggle(selectors.cardElementLikeActiveSelector);
  }
  
  getCardElement() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(selectors.cardElementSelector).cloneNode(true);
    this._cardElementText  = this._cardElement.querySelector(selectors.cardElementTextSelector);
    this._cardElementImg   = this._cardElement.querySelector(selectors.cardElementImgSelector);
    this._cardElementLike  = this._cardElement.querySelector(selectors.cardElementLikeSelector);
    this._cardElementTrash = this._cardElement.querySelector(selectors.cardElementTrashSelector);
    
    this._cardElementText.textContent = this._name;
    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;

    this._cardElementImg.addEventListener('click', () => {this._handleCardClick({name: this._name, link: this._link})});
    this._cardElementLike.addEventListener('click', () => {this._activeLikeHandler()});
    this._cardElementTrash.addEventListener('click', () => {this._clickTrashHandler();});

    return this._cardElement;
  }
}
