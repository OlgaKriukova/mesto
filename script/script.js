let editButton = document.querySelector('.edit-button');
let popupClose = document.querySelector('.popup__close');
let popupContainer = document.querySelector('.popup__container');

function closePopoup () {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = document.querySelector('.popup__user-name').value;
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__user-occupation').value;
    closePopoup ();
}

editButton.addEventListener('click', function () {
    document.querySelector('.popup__user-name').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__user-occupation').value = document.querySelector('.profile__subtitle').textContent;

    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function () {
    closePopoup ();
});

popupContainer.addEventListener('submit', handleFormSubmit); 
