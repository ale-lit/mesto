export default class FormValidator {
  constructor(data, form) {
    this._parentFormSelector = data.parentFormSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._closeButtonSelector = data.closeButtonSelector;

    this._form = form;
  }

  // START VALIDATION
  enableValidation() {
    this._setEventListeners(this._form);
  }

  _setEventListeners(form) {
    const inputList = this._getInputList(form);

    this._toggleButtonState(form);

    inputList.forEach((input) => {
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
      this._hideInputError(input);
    }
  };

  // GET ALL INPUTS FROM FORM
  _getInputList(form) {
    return [...form.querySelectorAll(this._inputSelector)];
  }

  // ERROR MESSAGE
  _showInputError(input) {
    const errorElement = this._getErrorElement(input);

    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._getErrorElement(input);

    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _getErrorElement(input) {
    return document.querySelector(`#${input.id}-error`);
  };

  // CHECK BUTTON
  _toggleButtonState(form) {
    const buttonElement = form.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput(form)) {
      this._disableFormButton(buttonElement);
    } else {
      this._enabeFormButton(buttonElement);
    }
  }

  _hasInvalidInput(form) {
    const inputList = this._getInputList(form);

    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _disableFormButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  _enabeFormButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.disabled = false;
  }

  // RESET FORM TO DEFAULT
  _resetForm(form) {
    const inputList = this._getInputList(form);
    // Reset Inputs
    form.reset();
    // Clear Errors
    inputList.forEach((input) => {
      this._hideInputError(input);
    });
    // Reset Button State
    this._toggleButtonState(form);
  }
}
