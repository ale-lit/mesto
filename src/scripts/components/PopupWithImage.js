import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._figcaption = this._popup.querySelector('.popup__figcaption')
  }

  open({ name, link }) {
    // Change Image
    this._image.src = link;
    this._image.alt = name;
    // Insert Figcaption Text
    this._figcaption.textContent = name;

    super.open();
  }
}
