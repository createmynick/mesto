//Импорты
import './pages/index.css';
import {initialCards} from './scripts/cards';
import {createCards, deleteCard, likeCard} from './components/card';
import {openPopup, closePopup} from './components/modal';
import {clearValidation, enableValidation} from './components/validation';
//DOM-узлы
const placesList = document.querySelector('.places__list');
// Попап редактирования профиля
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDes = document.querySelector('.profile__description');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDes = document.querySelector('.popup__input_type_description');
// Попап добавления карточек
const cardForm = document.querySelector('.popup__form[name="new-place"]');
const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButton = document.querySelector('.profile__add-button');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardUrl = document.querySelector('.popup__input_type_url');
// Попап увеличения картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');
// Параметры валидации
const ValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
//Вывести карточки на страницу:
initialCards.forEach(function (card) {
  placesList.append(createCards(card, deleteCard, likeCard, clickImage));
});
// Открытие формы для редактирования профиля
popupProfileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileDes.value = profileDes.textContent;
  clearValidation(popupProfile, ValidationConfig);
});
// Редактирование профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDes.textContent = inputProfileDes.value;
  closePopup(popupProfile);
  profileForm.reset();
}
// Сохранение данных в шапку профиля
popupProfile.addEventListener('submit', handleProfileSubmit);

// Открытие формы для добавления карточек
popupCardButton.addEventListener('click', function () {
  openPopup(popupCard);
  clearValidation(popupCard, ValidationConfig);
});
// Добавление карточки
function handleCardSubmit(evt) {
  evt.preventDefault();

  placesList.prepend(
    createCards(
      {name: inputCardName.value, link: inputCardUrl.value},
      deleteCard,
      likeCard,
      clickImage
    )
  );

  closePopup(popupCard);
  cardForm.reset();
}
// Сохранение карточки
popupCard.addEventListener('submit', handleCardSubmit);

// Открытие изображения
function clickImage(evt) {
  const card = evt.target.closest('.card'),
    cardImage = card.querySelector('.card__image'),
    cardTitle = card.querySelector('.card__title');

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupImageTitle.textContent = cardTitle.textContent;

  openPopup(popupTypeImage);
}

enableValidation(ValidationConfig);
