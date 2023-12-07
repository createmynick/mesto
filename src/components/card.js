export function createCards(cardData, deleteCard, likeCard, clickImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', () => deleteCard(cardItem));

  likeButton.addEventListener('click', () => likeCard(likeButton));

  cardImage.addEventListener('click', clickImage);

  return cardItem;
}

export function deleteCard(cardItem) {
  cardItem.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
