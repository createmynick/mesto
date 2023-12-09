//Импорты
import './pages/index.css';
import {createCards} from './components/card';
import {openPopup, closePopup} from './components/modal';
import {clearValidation, enableValidation, validationConfig} from './components/validation';
import {
  getProfileDataApi,
  getInitialCardsApi,
  patchProfileDataApi,
  postNewCardApi,
  deleteCardApi,
  putLikeCardApi,
  deleteLikeCardApi,
  patchProfileAvatarApi
} from './components/api.js';
let currentUserId = '';
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
// Попап изменения аватара
const profileAvatar = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarInput = document.querySelector('.popup__input_type_url');
const avatarForm = document.querySelector('.popup__form[name="avatar"]');
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
// Подтверждение удаления
const formConfirm = document.querySelector('.popup__form[name="confirm"]');
const deleteConfirm = document.querySelector('.popup_type_confirm');
// Функция загрузки профиля
function updateProfile(name, des) {
  profileName.textContent = name;
  profileDes.textContent = des;
}
// Функция загрузки аватара
function updateImage(url) {
  profileAvatar.style.backgroundImage = `url(${url})`;
}
// Загрузка страницы
getProfileDataApi()
  .then(result => {
    currentUserId = result._id;
    updateImage(result.avatar);
    updateProfile(result.name, result.about);

    getInitialCardsApi()
      .then(result => {
        result.forEach(function (cardData) {
          placesList.append(createCards(cardData, deleteCard, likeCard, clickImage, currentUserId));
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
// Функия для смены текста кнопки "Сохранить"
function changeSubmitButtonText(form, text) {
  form.querySelector('.button').textContent = text;
}
// Открытие формы для редактирования профиля
popupProfileButton.addEventListener('click', function () {
  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.description.value = profileDes.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(popupProfile);
});
// Редактирование профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(profileForm, 'Сохранение...');

  patchProfileDataApi(inputProfileName.value, inputProfileDes.value)
    .then(profile => {
      profileName.textContent = profile.name;
      profileDes.textContent = profile.about;
      closePopup(popupProfile);
      changeSubmitButtonText(profileForm, 'Сохранить');
    })
    .catch(err => {
      console.log(err);
    });
}
// Сохранение данных в шапку профиля
popupProfile.querySelector('.popup__button').addEventListener('click', handleProfileSubmit);

// Открытие формы для добавления карточек
popupCardButton.addEventListener('click', function () {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openPopup(popupCard);
});
// Добавление карточки
function handleCardSubmit(evt) {
  evt.preventDefault();

  changeSubmitButtonText(cardForm, 'Сохранение...');

  postNewCardApi(inputCardName.value, inputCardUrl.value)
    .then(cardData => {
      placesList.prepend(createCards(cardData, deleteCard, likeCard, clickImage, currentUserId));
      closePopup(popupCard);
      changeSubmitButtonText(cardForm, 'Сохранить');
    })
    .catch(err => {
      console.log(err);
    });
}
// Сохранение карточки
cardForm.querySelector('.popup__button').addEventListener('click', handleCardSubmit);

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
// Открытие формы для замены аватара
profileAvatar.addEventListener('click', function () {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});
// Редактирование аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  changeSubmitButtonText(avatarForm, 'Сохранение...');

  patchProfileAvatarApi(avatarInput.value)
    .then(response => {
      updateProfileImage(response.avatar);
      closePopup(avatarPopup);
      changeSubmitButtonText(avatarForm, 'Сохранить');
    })
    .catch(err => {
      console.log(err);
    });
}
// Сохранение изменений аватара
avatarForm.querySelector('.popup__button').addEventListener('click', handleAvatarSubmit);
// Функция лайка/дизлайка карточки
function likeCard(evt) {
  const likeButton = evt.target;
  const likedCardElement = likeButton.closest('.card');
  const likesQuantityElement = likedCardElement.querySelector('.card__likes');

  const likeMethod = likeButton.classList.contains('card__like-button_is-active')
    ? deleteLikeCardApi
    : putLikeCardApi;
  likeMethod(likedCardElement.dataset.imgId)
    .then(response => {
      likesQuantityElement.textContent = response.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.log(err);
    });
}
// Функция удаления карточки
function deleteCard(evt) {
  const deleteButton = evt.target;
  const cardElement = deleteButton.closest('.card');
  formConfirm.dataset.imgId = cardElement.dataset.imgId;

  openPopup(deleteConfirm);
}
// Обработчик удаления карточки
function handleFormDelete(evt) {
  evt.preventDefault();
  const listItem = placesList.querySelector(`[data-img-id='${evt.target.dataset.imgId}']`);
  if (listItem) {
    deleteCardApi(listItem.dataset.imgId)
      .then(deleteResponse => {
        console.log(`${deleteResponse.message}: id - ${listItem.dataset.imgId}`);
        listItem.remove();
        closePopup(deleteConfirm);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
// Удаление карточки
formConfirm.addEventListener('submit', handleFormDelete);
// Включение валидации
enableValidation(validationConfig);
