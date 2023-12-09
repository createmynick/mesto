export function createCards(cardData, deleteCard, likeCard, clickImage, userID) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardLikes = cardItem.querySelector('.card__likes');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  if (userID === cardData.owner._id) {
    deleteButton.addEventListener('click', deleteCard);
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', clickImage);

  cardItem.dataset.imgId = cardData._id;
  cardLikes.textContent = cardData.likes.length;

  let isLiked = cardData.likes.some(like => like._id === userID);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  return cardItem;
}
