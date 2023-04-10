export default class Card {
  constructor({_id, name, link, likes, owner},
              userId,
              templateSelector,
              {cardElementSelector, cardElementTextSelector, cardElementImgSelector, cardElementLikeSelector, cardElementLikeActiveSelector, cardElementTrashSelector, cardElementLikeCounterSelector},
              handleCardClick,
              handleDelCardClick,
              setLikeActiveReq
              ) {
    this._id = _id;            
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelCardClick = handleDelCardClick;
    this._setLikeActiveReq = setLikeActiveReq;
    this._cardElementSelector = cardElementSelector;
    this._cardElementTextSelector = cardElementTextSelector;
    this._cardElementImgSelector = cardElementImgSelector;
    this._cardElementLikeSelector = cardElementLikeSelector;
    this._cardElementTrashSelector = cardElementTrashSelector;
    this._cardElementLikeActiveSelector = cardElementLikeActiveSelector;
    this._cardElementLikeCounterSelector = cardElementLikeCounterSelector;

    this.setLikesCount = this.setLikesCount.bind(this);
  }

  get cardId() {
    return this._id;
  }

  _checkOwned() {
    if (this._owner._id == this._userId) {
      return true;
    }
    else {
      return false;
    }
  }

  _checkLikeActive() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id == this._userId) {
        return true;
      }
    };
    return false;
  }

  _setLikeActive (active) {
    if (active) {
      this._cardElementLike.classList.add(this._cardElementLikeActiveSelector);
    }
    else {
      this._cardElementLike.classList.remove(this._cardElementLikeActiveSelector);
    }
  }
  
  _activeLikeHandler() {
    this._likeActive = this._checkLikeActive();
    this._setLikeActiveReq(this._id, !this._likeActive)
    .then ((result) => {
      console.log('api.likeCard - then - '+result);
      this._likes = result.likes;
      this.setLikesCount(this._likes.length);
      this._setLikeActive(!this._likeActive);
    })
    .catch((err) => {
      console.log('api.likeCard - catch - '+err);
    });
  }

  _setEventListeners() {
    this._cardElementImg.addEventListener('click', () => {this._handleCardClick({name: this._name, link: this._link})});
    this._cardElementLike.addEventListener('click', () => {this._activeLikeHandler()});
    if (this._checkOwned()) {
      this._cardElementTrash.addEventListener('click', () => {this._handleDelCardClick(this);});
    }
  }

  setLikesCount(count) {
    this._cardElementLikeCounter.textContent = count;
  }

  getCardElement() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(this._cardElementSelector).cloneNode(true);
    this._cardElementText  = this._cardElement.querySelector(this._cardElementTextSelector);
    this._cardElementImg   = this._cardElement.querySelector(this._cardElementImgSelector);
    this._cardElementLike  = this._cardElement.querySelector(this._cardElementLikeSelector);
    this._cardElementTrash = this._cardElement.querySelector(this._cardElementTrashSelector);
    if (!this._checkOwned()) {
      this._cardElementTrash.classList.add('figure__trash_disabled');
    }

    this._cardElementLikeCounter = this._cardElement.querySelector(this._cardElementLikeCounterSelector);
    
    this._cardElementText.textContent = this._name;
    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;
    this._cardElementImg.alt = this._name;
    this.setLikesCount(this._likes.length); 
    this._setLikeActive (this._checkLikeActive());

    this._setEventListeners();

    return this._cardElement;
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
