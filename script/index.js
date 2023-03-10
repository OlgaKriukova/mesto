"use strict";

import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {openPopup,closePopup} from './general.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('#edit-profile');
const profilePopupUserName = profilePopup.querySelector('#popup-input-name');
const profilePopupUserOccupation = profilePopup.querySelector('#popup-input-occupation');
const profilePopupForm = profilePopup.querySelector('.popup__form');
profilePopup.popupForm = profilePopupForm;

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#figure-template').content;
const cardAddButton = document.querySelector('.add-button');
const cardPopup = document.querySelector('#add-figure-popup');
const cardPopupName = cardPopup.querySelector('#popup-input-title');
const cardPopupUrl = cardPopup.querySelector('#popup-input-url');
const cardPopupForm = cardPopup.querySelector('.popup__form');
cardPopup.popupForm = cardPopupForm;

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const event = new Event('open');

const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

const validatedFormList = Array.from(document.querySelectorAll(validationParams.formSelector));

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

function createCard(item) {
  return new Card(item, '#figure-template').getCardElevent();
}

function fillCardsContainer (arr) {
  arr.forEach(function (item) {
    cardsContainer.append(createCard(item));
  });
}

// Определение прослущивателей

const clickProfileEditButtonHandler = () => {
  profilePopupUserName.value = profileTitle.textContent;
  profilePopupUserOccupation.value = profileSubtitle.textContent;
  profilePopup.popupForm.dispatchEvent(event);
  openPopup(profilePopup);
}

const clickCardAddButtonHandler = function () {
  cardPopup.popupForm.reset();
  cardPopup.popupForm.dispatchEvent(event);
  openPopup(cardPopup);
};

const submitProfilePopupFormHandler = (evt) =>  {
  if (evt.target.isValid) {
    profileTitle.textContent = profilePopupUserName.value;
    profileSubtitle.textContent = profilePopupUserOccupation.value;
    closePopup (profilePopup);
  }
}

const submitCardPopupFormHandler = (evt) => {
  if (evt.target.isValid) {
    cardsContainer.prepend(createCard({name: cardPopupName.value, link: cardPopupUrl.value}));
    closePopup(cardPopup);
  }
}

// Привязка валидации
validatedFormList.forEach((formElement) => {
  new FormValidator(validationParams, formElement).enableValidation();
});

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
