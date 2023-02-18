"use strict";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('#edit-profile');
const profilePopupUserName = profilePopup.querySelector('#popup-input-name');
const profilePopupUserOccupation = profilePopup.querySelector('#popup-input-occupation');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#figure-template').content;
const cardAddButton = document.querySelector('.add-button');
const cardPopup = document.querySelector('#add-figure-popup');
const cardPopupName = cardPopup.querySelector('#popup-input-title');
const cardPopupUrl = cardPopup.querySelector('#popup-input-url');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imgPopup = document.querySelector('#img-popup');
const imgPopupImage = imgPopup.querySelector('.figure-img__image');
const imgPopupCaption = imgPopup.querySelector('.figure-img__caption');

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

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

const keydownDocumentHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.openedPopup = popup;
  document.addEventListener('keydown', keydownDocumentHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownDocumentHandler);
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.figure').cloneNode(true);

  cardElement.querySelector('.figure__text').textContent = item.name;

  const cardImage = cardElement.querySelector('.figure__img');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener('click', openImgPopupHandler);

  cardElement.querySelector('.figure__like').addEventListener('click', activeLikeHandler);

  cardElement.querySelector('.figure__trash').addEventListener('click', clickTrashHandler);
  
  return cardElement;
}

function fillCardsContainer (arr) {
  arr.forEach(function (item) {
    cardsContainer.append(createCard(item));
  });
}

// Определение прослущивателей

const openImgPopupHandler = (evt) => {
  imgPopupImage.src = evt.target.src;
  imgPopupImage.alt = evt.target.alt;
  const figure = evt.target.closest('.figure');
  const figureText = figure.querySelector('.figure__text');
  imgPopupCaption.textContent = figureText.textContent;
  openPopup(imgPopup);
}

const clickTrashHandler = (evt) => {
  evt.target.closest('.figure').remove();
}

const activeLikeHandler = (evt) => {
  evt.target.classList.toggle('figure__like_active');
}

const clickProfileEditButtonHandler = () => {
  profilePopupUserName.value = profileTitle.textContent;
  profilePopupUserOccupation.value = profileSubtitle.textContent;
  clearValidation(profilePopupForm, validationParams.inputErrorClass, validationParams.errorClass, validationParams.inactiveButtonClass);
  openPopup(profilePopup);
}

const clickCardAddButtonHandler = function () {
  cardPopupForm.reset();
  clearValidation(cardPopupForm, validationParams.inputErrorClass, validationParams.errorClass, validationParams.inactiveButtonClass);
  openPopup(cardPopup);
};

const submitProfilePopupFormHandler = (evt) =>  {
  evt.preventDefault();

  if (getFormValidity(evt.target)) {
    profileTitle.textContent = profilePopupUserName.value;
    profileSubtitle.textContent = profilePopupUserOccupation.value;
    closePopup (profilePopup);
  }
}

const submitCardPopupFormHandler = (evt) => {
  if (getFormValidity(evt.target)) {
    cardsContainer.prepend(createCard({name: cardPopupName.value, link: cardPopupUrl.value}));
    closePopup(cardPopup);
  }
}

// Привязка валидации
enableValidation(validationParams);

// Привязка прослушивателей

profilePopupForm.addEventListener('submit', submitProfilePopupFormHandler);

cardPopupForm.addEventListener('submit', submitCardPopupFormHandler);

profileEditButton.addEventListener('click', clickProfileEditButtonHandler);

cardAddButton.addEventListener('click', clickCardAddButtonHandler);

closeButtons.forEach((button) => { 
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((popup) => { 
  popup.addEventListener('click', (evt) => {
    if (evt.target.closest('.popup__container') == null) {
    closePopup(popup)
    }
  });
});

// Первонначальная загрузка каточек из массива
fillCardsContainer (initialCards);
