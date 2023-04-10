import './index.css';
import Api from '../components/Api.js'; 
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {validationParams, selectors} from '../utils/constants.js';

console.log('difinition begin');

const profileAvatarEditButton = document.querySelector(selectors.profileAvatarEditButtonSelector);
const profileEditButton = document.querySelector(selectors.profileEditButtonSelector);
const cardAddButton = document.querySelector(selectors.cardAddButton);
const validatedFormList = Array.from(document.querySelectorAll(validationParams.formSelector));

const comfirmDelCardPopup = new PopupWithConfirm(selectors.comfirmDelCardPopupSelector, selectors);
comfirmDelCardPopup.setEventListeners();

function createCard(item) {
  const card = new Card(
    item,
    userInfo.userId,
    selectors.cardTemplateSelector,
    selectors,
    imgPopup.open,
    (card) => {
      comfirmDelCardPopup.setSubmitFormHandler(() => {
        api.delCard(card.cardId)
        .then (() => {
          card.remove();
          comfirmDelCardPopup.close();
        })
        .catch((err) => {
          console.log('api.delCard - catch - '+err);
        });
      });
      comfirmDelCardPopup.open();
    },
    api.likeCard);
  console.log('after create card id - '+card.cardId);
  const cardElement = card.getCardElement();
  return cardElement;
}

console.log('difinition end');
console.log('creation begin');

// Создание объектов
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'dd879867-23bd-49db-b064-5541b8e26a1d',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({avatarSelector: selectors.userAvatarSelector, nameSelector: selectors.userNameSelector, aboutSelector: selectors.userAboutSelector});
let section;

api.getUserInfo()
.then ((result) => {
  userInfo.setUserInfo(result);
  userInfo.setAvatar(result);
})
.then (() => {
  api.getInitialCards()
  .then ((result) => {
    const newSection = new Section({
      items: result,
      renderer: (item) => {
        newSection.addItem(createCard(item), false);
      }
    }, selectors.sectionSelector);
    newSection.rendererItems();
    section = newSection;
  })
  .catch((err) => {
    console.log('api.getInitialCards - catch - '+err);
  });
})
.catch((err) => {
  console.log('api.getUserInfo - catch - '+err);
});

const imgPopup = new PopupWithImage(selectors.imgPopupSelector, selectors);
imgPopup.setEventListeners();

const cardPopup = new PopupWithForm(selectors.cardPopupSelector, selectors, function (inputValues) {
  this.wait();
  api.addCard(inputValues)
  .then((result) => {
    console.log('api.addCard - then - '+result);
    section.addItem(createCard(result), true);
  })
  .catch((err) => {
    console.log('api.addCard - catch - '+err);
  })
  .finally(() => {
    console.log('api.setUserInfo - finally');
    this.close();
  });
});
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(selectors.profilePopupSelector, selectors, function (inputValues) {
  this.wait();
  api.setUserInfo(inputValues)
    .then ((result) => {
      console.log('api.setUserInfo - then - '+result);
      userInfo.setUserInfo(result);
      userInfo.setAvatar(result);
    })
    .catch((err) => {
      console.log('api.setUserInfo - catch - '+err);
    })
    .finally(() => {
      console.log('api.setUserInfo - finally');
      this.close();
    });
});
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm(selectors.avatarPopupSelector, selectors, function (inputValues) {
  this.wait();
  api.setUserAvatar(inputValues)
    .then ((result) => {
      console.log('api.setUserAvatar - then - '+result);
      userInfo.setAvatar(result);
    })
    .catch((err) => {
      console.log('api.setUserAvatar - catch - '+err);
    })
    .finally(() => {
      console.log('api.setUserInfo - finally');
      this.close();
    });
});
avatarPopup.setEventListeners();

// Привязка прослушивателей
profileEditButton.addEventListener('click', () => {profilePopup.open(userInfo.getUserInfo());});
profileAvatarEditButton.addEventListener('click', () => {avatarPopup.open(userInfo.getUserInfo());});
cardAddButton.addEventListener('click', () => {cardPopup.open({name: '', link: ''});});

console.log('creation end');
console.log('validation begin');

// Привязка валидации
validatedFormList.forEach((formElement) => {
  new FormValidator(validationParams, formElement).enableValidation();
});
console.log('validation end');
