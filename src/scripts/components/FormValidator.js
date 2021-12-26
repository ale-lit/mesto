export default class FormValidator {
  constructor(validationConfig, form) {
    this._parentFormSelector = validationConfig.parentFormSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inputList = [...form.querySelectorAll(validationConfig.inputSelector)];
    this._submitButton = form.querySelector(validationConfig.submitButtonSelector);

    this._form = form;
  }

  // START VALIDATION
  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners(form) {
    this._toggleButtonState(form);

    this._form.addEventListener('reset', () => {
      this._disableFormButton();

      this._inputList.forEach((inputElement) => {
        this._hideError(inputElement);
      })
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkformValidation(form, input);
      });
    });
  };

  _checkformValidation(form, input) {
    this._isValid(input);
    this._toggleButtonState(form);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideError(input);
    }
  };

  // ERROR MESSAGE
  _showInputError(input) {
    const errorElement = this._getErrorElement(input);

    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideError(input) {
    const errorElement = this._getErrorElement(input);

    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _getErrorElement(input) {
    return this._form.querySelector(`#${input.id}-error`);
  };

  // CHECK BUTTON
  _toggleButtonState(form) {
    if (this._hasInvalidInput(form)) {
      this._disableFormButton();
    } else {
      this._enabeFormButton();
    }
  }

  _hasInvalidInput(form) {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _disableFormButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enabeFormButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  // RESET FORM TO DEFAULT
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
}
