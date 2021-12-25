export default class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector, currentUserId) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const placePhoto = this._element.querySelector('.place__photo');

    // Insert Actual Info
    this._element.querySelector('.place__name').textContent = this._name;
    placePhoto.src = this._image;
    placePhoto.alt = this._name;
    this._element.querySelector('.place__like-num').textContent = this._likes.length;

    this._likes.forEach(item => {
      if(item._id === this._currentUserId) this._element.querySelector('.place__like').classList.add('place__like_active');
    })

    if(this._ownerId !== this._currentUserId) {
      this._element.querySelector('.place__delete').remove();
    }

    // Add Events
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    // Like
    this._element.querySelector('.place__like').addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    // Delete
    if(this._element.querySelector('.place__delete')) {
      this._element.querySelector('.place__delete').addEventListener('click', () => {
        this._handleDeleteIconClick(this);
      });
    }

    // Preview
    this._element.querySelector('.place__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
