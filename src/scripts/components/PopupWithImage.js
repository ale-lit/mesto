import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    // Change Image
    this._image = this._popup.querySelector('.popup__image');
    this._image.src = link;
    this._image.alt = name;
    // Insert Figcaption Text
    this._popup.querySelector('.popup__figcaption').textContent = name;

    super.open();
  }
}
