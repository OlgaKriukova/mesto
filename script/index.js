const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('#edit-profile');
const profilePopupUserName = profilePopup.querySelector('.popup__input-first');
const profilePopupUserOccupation = profilePopup.querySelector('.popup__input-second');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#figure-template').content;
const cardAddButton = document.querySelector('.add-button');
const cardPopup = document.querySelector('#add-figure-popup');
const cardPopupName = cardPopup.querySelector('.popup__input-first');
const cardPopupUrl = cardPopup.querySelector('.popup__input-second');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imgPopup = document.querySelector('#img-popup');
const imgPopupImage = imgPopup.querySelector('.figure-img__image');
const imgPopupCaption = imgPopup.querySelector('.figure-img__caption');

const closeButtons = document.querySelectorAll('.popup__close');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openImgPopupHandler (evt) {
  imgPopupImage.src = evt.target.src;
  imgPopupImage.alt = evt.target.alt;
  const figure = evt.target.closest('.figure');
  const figureText = figure.querySelector('.figure__text');
  imgPopupCaption.textContent = figureText.textContent;
  openPopup(imgPopup);
}

function clickHandlerTrash (evt) {
  evt.target.closest('.figure').remove();
}

function activeLikeHandler (evt) {
  evt.target.classList.toggle('figure__like_active');
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.figure').cloneNode(true);

  cardElement.querySelector('.figure__text').textContent = item.name;

  const cardImage = cardElement.querySelector('.figure__img');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener('click', openImgPopupHandler);

  cardElement.querySelector('.figure__like').addEventListener('click', activeLikeHandler);

  cardElement.querySelector('.figure__trash').addEventListener('click', clickHandlerTrash);
  
  return cardElement;
}

function fillCardsContainer (arr) {
  arr.forEach(function (item) {
    cardsContainer.append(createCard(item));
  });
}

function submitHandlerProfilePopupForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopupUserName.value;
  profileSubtitle.textContent = profilePopupUserOccupation.value;
  closePopup (profilePopup);
}

profileEditButton.addEventListener('click', function () {
  profilePopupUserName.value = profileTitle.textContent ;
  profilePopupUserOccupation.value = profileSubtitle.textContent;
  openPopup(profilePopup);
});

profilePopupForm.addEventListener('submit', submitHandlerProfilePopupForm);

cardAddButton.addEventListener('click', function () {
      openPopup(cardPopup);
});

cardPopupForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({name: cardPopupName.value, link: cardPopupUrl.value}));
  closePopup(cardPopup);
  evt.target.reset();
});

closeButtons.forEach((button) => { 
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

fillCardsContainer (initialCards);
