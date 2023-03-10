export const imgPopup = document.querySelector('#img-popup');
export const imgPopupImage = imgPopup.querySelector('.figure-img__image');
export const imgPopupCaption = imgPopup.querySelector('.figure-img__caption');

export function keydownDocumentHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.openedPopup = popup;
  document.addEventListener('keydown', keydownDocumentHandler);
  
  if (popup?.popupForm) {
    const event = new Event('open');
    popup.popupForm.dispatchEvent(event);
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownDocumentHandler);
}
