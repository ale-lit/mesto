export default class FormValidator {
  constructor(data, form) {
    this._parentFormSelector = data.parentFormSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._closeButtonSelector = data.closeButtonSelector;
    this._inputList = [...form.querySelectorAll(data.inputSelector)];
    this._submitButton = form.querySelector(data.submitButtonSelector);

    this._form = form;
  }

  // START VALIDATION
  enableValidation() {
    this._setEventListeners(this._form);

    // Events For Clear Form
    this._form.addEventListener('submit', () => {this._resetForm(this._form)});
    this._form.closest(this._parentFormSelector).querySelector(this._closeButtonSelector).addEventListener('click', () => {
      this._resetForm(this._form);
    });
    this._form.closest(this._parentFormSelector).addEventListener('click', (evt) => {
      this._resetFormByClickOverlay(evt, this);
    });
  }

  _resetFormByClickOverlay(evt, ths) {
    if (evt.target === evt.currentTarget) {
      ths._resetForm(ths._form);
    };
  }

  _setEventListeners(form) {
    this._toggleButtonState(form);

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
      this._hideInputError(input);
    }
  };

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
    if (this._hasInvalidInput(form)) {
      this._disableFormButton(this._submitButton);
    } else {
      this._enabeFormButton(this._submitButton);
    }
  }

  _hasInvalidInput(form) {
    return this._inputList.some((input) => {
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
    // Reset Inputs
    form.reset();
    // Clear Errors
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    // Reset Button State
    this._toggleButtonState(form);
  }
}
