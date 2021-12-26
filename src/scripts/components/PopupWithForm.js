import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector('.popup__save-button');
    this._buttonText = '';
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setButtonText(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setButtonText(load) {
    if(load) {
      this._buttonText = this._saveButton.value;
      this._saveButton.value = 'Сохранение...';
    } else {
      this._saveButton.value = this._buttonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
