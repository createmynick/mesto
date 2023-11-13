// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const profileAddButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupButtonClose = popupNewCard.querySelector('.popup__close');

// @todo: Функция создания карточки
const createCard = function (createCard, deleteCard) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  cardTitle.textContent = createCard.name;
  cardImage.src = createCard.link;
  // @todo: Функция удаления карточки
  deleteButton.addEventListener('click', function () {
    cardItem.remove();
  });
  return cardItem;
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const card = createCard(element);
  placesList.append(card);
});
