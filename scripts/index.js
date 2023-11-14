// @todo: Темплейт карточки:
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы:
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки:
function createCards(cardData, deleteCard) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardItem);
  });

  return cardItem;
}
// @todo: Функция удаления карточки:
function deleteCard(cardItem) {
  cardItem.remove();
}
// @todo: Вывести карточки на страницу:
initialCards.forEach(function (card) {
  const cardDone = createCards(card, deleteCard);
  placesList.append(cardDone);
});
