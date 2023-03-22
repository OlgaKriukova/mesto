export default class Card {
  constructor({name, link},
              templateSelector,
              {cardElementSelector, cardElementTextSelector, cardElementImgSelector, cardElementLikeSelector, cardElementLikeActiveSelector, cardElementTrashSelector},
              handleCardClick
              ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardElementSelector = cardElementSelector;
    this._cardElementTextSelector = cardElementTextSelector;
    this._cardElementImgSelector = cardElementImgSelector;
    this._cardElementLikeSelector = cardElementLikeSelector;
    this._cardElementTrashSelector = cardElementTrashSelector;
    this._cardElementLikeActiveSelector = cardElementLikeActiveSelector;
  }

  _clickTrashHandler() { 
    this._cardElement.remove();
    this._cardElement = null;
  }

  _activeLikeHandler () {
    this._cardElementLike.classList.toggle(this._cardElementLikeActiveSelector);
  }
  
  _setEventListeners() {
    this._cardElementImg.addEventListener('click', () => {this._handleCardClick({name: this._name, link: this._link})});
    this._cardElementLike.addEventListener('click', () => {this._activeLikeHandler()});
    this._cardElementTrash.addEventListener('click', () => {this._clickTrashHandler();});
}

  getCardElement() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(this._cardElementSelector).cloneNode(true);
    this._cardElementText  = this._cardElement.querySelector(this._cardElementTextSelector);
    this._cardElementImg   = this._cardElement.querySelector(this._cardElementImgSelector);
    this._cardElementLike  = this._cardElement.querySelector(this._cardElementLikeSelector);
    this._cardElementTrash = this._cardElement.querySelector(this._cardElementTrashSelector);
    
    this._cardElementText.textContent = this._name;
    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
