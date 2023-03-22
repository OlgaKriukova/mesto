export const initialCards = [
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

  export const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_active'
  };

  export const selectors = {
    sectionSelector: '.elements',
    profileEditButtonSelector: '.profile__edit-button',
    cardAddButton: '.add-button',
    imgPopupSelector: '#img-popup',
    profilePopupSelector: '#edit-profile',
    cardPopupSelector:'#add-figure-popup',
    userNameSelector: '.profile__title',
    userOccupationSelector: '.profile__subtitle',
    imgElementSelector: '.figure-img__image',
    captionElementSelector: '.figure-img__caption',
    cardTemplateSelector: '#figure-template',
    cardElementSelector: '.figure',
    cardElementTextSelector: '.figure__text',
    cardElementImgSelector: '.figure__img',
    cardElementLikeSelector: '.figure__like',
    cardElementTrashSelector: '.figure__trash',
    cardElementLikeActiveSelector: 'figure__like_active',
    popupInputSelector: '.popup__input',
    popupFormSelector: '.popup__form',
    popupCloseButtonSelector: '.popup__close'
  };
  