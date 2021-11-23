import {openPopup} from './index.js';

const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImagePreviewFigure = popupImagePreview.querySelector('.popup__figure');
const popupImageElement = popupImagePreviewFigure.querySelector('.popup__image');
const popupImagePreviewFigCaption = popupImagePreviewFigure.querySelector('.popup__figcaption');

export default class Card {
  constructor(data, template) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = template;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    // Insert Actual Info
    this._element.querySelector('.place__name').textContent = this._name;
    this._element.querySelector('.place__photo').src = this._image;
    this._element.querySelector('.place__photo').alt = this._name;

    // Add Events
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    // Like
    this._element.querySelector('.place__like').addEventListener('click', this._addRemoveLike);

    // Delete
    this._element.querySelector('.place__delete').addEventListener('click', this._deletePlace);

    // Preview
    this._element.querySelector('.place__photo').addEventListener('click', () => {
      this._handleOpenPopup();
    });;
  }

  // Likes
  _addRemoveLike(evt) {
    evt.target.classList.toggle('place__like_active');
  }

  // Delete Card
  _deletePlace(evt) {
    evt.target.closest('.place').remove();
  }

  // Open Popup
  _handleOpenPopup() {
    // Change Image
    popupImageElement.src = this._image;
    popupImageElement.alt = this._name;
    // Insert Figcaption Value
    popupImagePreviewFigCaption.textContent = this._name;

    openPopup(popupImagePreview);
  }
}
