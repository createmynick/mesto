// @todo: Темплейт карточки:
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы:
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки:
const createCards = function (createCard, deleteCard) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  cardTitle.textContent = createCard.name;
  cardImage.src = createCard.link;
  // @todo: Функция удаления карточки:
  deleteButton.addEventListener('click', function () {
    cardItem.remove();
  });
  return cardItem;
};
// @todo: Вывести карточки на страницу:
initialCards.forEach(function (card) {
  const cardDone = createCards(card);
  placesList.append(cardDone);
});
