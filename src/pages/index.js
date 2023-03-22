import './index.css'; 
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, validationParams, selectors} from '../utils/constants.js';

const profileEditButton = document.querySelector(selectors.profileEditButtonSelector);
const cardAddButton = document.querySelector(selectors.cardAddButton);
const validatedFormList = Array.from(document.querySelectorAll(validationParams.formSelector));

// Создание объектов
const imgPopup = new PopupWithImage(selectors.imgPopupSelector, selectors);
imgPopup.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, selectors.cardTemplateSelector, selectors, imgPopup.open);
    const cardElement = card.getCardElement();
    section.addItem(cardElement, false);
  }
}, selectors.sectionSelector);

const userInfo = new UserInfo({nameSelector: selectors.userNameSelector, occupationSelector: selectors.userOccupationSelector});

const profilePopup = new PopupWithForm(selectors.profilePopupSelector, selectors, function (inputValues) {
  userInfo.setUserInfo(inputValues);
  this.close();
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(selectors.cardPopupSelector, selectors, (inputValues) => {
  const card = new Card(inputValues, selectors.cardTemplateSelector, selectors, imgPopup.open);
  const cardElement = card.getCardElement();
  section.addItem(cardElement, true);
  cardPopup.close();
});
cardPopup.setEventListeners();

// Привязка валидации
validatedFormList.forEach((formElement) => {
  new FormValidator(validationParams, formElement).enableValidation();
});

// Привязка прослушивателей

profileEditButton.addEventListener('click', () => {profilePopup.open(userInfo.getUserInfo());});

cardAddButton.addEventListener('click', () => {cardPopup.open({name: '', link: ''});});

// Первонначальная загрузка каточек из массива
section.rendererItems();
