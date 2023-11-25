// Открытие попапа
export function openPopup(evt) {
  evt.classList.add('popup_is-opened');
  evt.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupEsc);
}
// Закрытие попапа
export function closePopup(evt) {
  evt.classList.remove('popup_is-opened');
  evt.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupEsc);
}
// Закрытие попапа кликом на крестик или оверлей
export function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
// Закрытие попапа клавишей Esc
export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}
