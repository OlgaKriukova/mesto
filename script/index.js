const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('#edit-profile');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const profilePopupUserName = profilePopup.querySelector('.popup__input-first');
const profilePopupUserOccupation = profilePopup.querySelector('.popup__input-second');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#figure-template').content;
const cardAddButton = document.querySelector('.add-button');
const cardPopup = document.querySelector('#add-figure-popup');
const cardPopupName = cardPopup.querySelector('.popup__input-first');
const cardPopupUrl = cardPopup.querySelector('.popup__input-second');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imgPopup = document.querySelector('.popup-img');
const imgPopupClose = document.querySelector('.popup-img__close');
const imgPopupImage = document.querySelector('.figure-img__image');
const imgPopupCaption = document.querySelector('.figure-img__caption');

const initialCards = [
  {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openImgPopupHandler (evt) {
  imgPopupImage.src = evt.target.src;
  const figure = evt.target.closest('.figure');
  const figureText = figure.querySelector('.figure__text');
  imgPopupCaption.textContent = figureText.textContent;
  imgPopup.classList.add('popup-img_opened');
}

function clickHandlerTrash (evt) {
  evt.target.closest('.figure').remove();
}

function ActiveLikeHandler (evt) {
  evt.target.classList.toggle('figure__like_active');
}

function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.figure').cloneNode(true);

  cardElement.querySelector('.figure__text').textContent = cardName;

  const cardImage = cardElement.querySelector('.figure__img');
  cardImage.src = cardLink;
  cardImage.addEventListener('click', openImgPopupHandler);

  cardElement.querySelector('.figure__like').addEventListener('click', ActiveLikeHandler);

  cardElement.querySelector('.figure__trash').addEventListener('click', clickHandlerTrash);

  cardsContainer.prepend(cardElement);
}

function fillCardsContainer (arr) {
  arr.forEach(function (item) {
    addCard(item.name, item.link);
  });
}

function popupCloseHandler (evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}

function submitHandlerProfilePopupForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopupUserName.value;
  profileSubtitle.textContent = profilePopupUserOccupation.value;
  popupCloseHandler (evt);
}

profileEditButton.addEventListener('click', function () {
  profilePopupUserName.value = profileTitle.textContent ;
  profilePopupUserOccupation.value = profileSubtitle.textContent;
  profilePopup.classList.add('popup_opened');
});

profilePopupCloseButton.addEventListener('click', popupCloseHandler);

profilePopupForm.addEventListener('submit', submitHandlerProfilePopupForm);

cardAddButton.addEventListener('click', function () {
      cardPopup.classList.add('popup_opened');
});

cardPopupCloseButton.addEventListener('click', popupCloseHandler);

cardPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  addCard(cardPopupName.value, cardPopupUrl.value);
  popupCloseHandler(evt);
  cardPopupName.value = '';
  cardPopupUrl.value = '';
});

imgPopupClose.addEventListener('click', function() {
  imgPopup.classList.remove('popup-img_opened');
});

fillCardsContainer (initialCards);
