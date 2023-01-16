let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupContainer = document.querySelector('.popup__container');
let popupUserName = document.querySelector('.popup__user-name');
let popupUserOccupation = document.querySelector('.popup__user-occupation');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


function closePopup () {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupUserName.value;
    profileSubtitle.textContent = popupUserOccupation.value;
    closePopup ();
}

editButton.addEventListener('click', function () {
    popupUserName.value = profileTitle.textContent;
    popupUserOccupation.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function () {
    closePopup ();
});

popupContainer.addEventListener('submit', handleFormSubmit); //  По совету наставника пишу этот коментарий и ничего не исправляю, т.к. в описании ПР есть указание обрабатывать submit
//В чек-листе есть пункт "При открытом попапе нажатие на клавишу “Enter” или кнопку «Сохранить» изменяет на странице информацию о пользователе"

