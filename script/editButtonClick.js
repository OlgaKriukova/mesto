let editButton = document.querySelector('.edit-button');

editButton.addEventListener('click', function () {
    document.querySelector('.popup__user-name').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__user-occupation').value = document.querySelector('.profile__subtitle').textContent;

    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
});

function closePopoup () {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}



let popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click', function () {
    closePopoup ();
});


let popupSave = document.querySelector('.popup__save');

popupSave.addEventListener('click', function () {
    document.querySelector('.profile__title').textContent = document.querySelector('.popup__user-name').value;
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__user-occupation').value;
    closePopoup ();
});

