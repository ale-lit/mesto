//import { openPopup } from './popupControl.js';
import { popupImagePreview, popupImageElement, popupImagePreviewFigCaption } from './constants.js';

export default class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = template;
    this._handleCardClick = handleCardClick;
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

    // Add Events
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    // Like
    this._element.querySelector('.place__like').addEventListener('click', this._addRemoveLike);

    // Delete
    this._element.querySelector('.place__delete').addEventListener('click', () => {
      this._deletePlace();
    });

    // Preview
    this._element.querySelector('.place__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // Likes
  _addRemoveLike(evt) {
    evt.target.classList.toggle('place__like_active');
  }

  // Delete Card
  _deletePlace() {
    this._element.remove();
    this._element = null;
  }
}
