// DEFAULT CLASSES
const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// INITIALIZE VALIDATION
function enableValidation() {
  const formList = [...document.querySelectorAll(params.formSelector)];

  formList.forEach((form) => {
    setEventListeners(form);
  });
};
enableValidation();

// GET ALL INPUTS FROM FORM
function getInputList(form) {
  return [...form.querySelectorAll(params.inputSelector)];
}

// VALIDATE
function setEventListeners(form) {
  const inputList = getInputList(form);

  toggleButtonState(form);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkformValidation(form, input);
    });
  });
};
function checkformValidation(form, input) {
  isValid(input);
  toggleButtonState(form);
}
function isValid(input) {
  if (!input.validity.valid) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
};

// ERROR MESSAGE
function showInputError(input) {
  const errorElement = getErrorElement(input);

  input.classList.add(params.inputErrorClass);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = input.validationMessage;
};
function hideInputError(input) {
  const errorElement = getErrorElement(input);

  input.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};
function getErrorElement(input) {
  return document.querySelector(`#${input.id}-error`);
};

// CHECK BUTTON
function toggleButtonState(form) {
  const buttonElement = form.querySelector(params.submitButtonSelector);

  if (hasInvalidInput(form)) {
    disableFormButton(buttonElement);
  } else {
    enabeFormButton(buttonElement);
  }
}
function hasInvalidInput(form) {
  const inputList = getInputList(form);

  return inputList.some((input) => {
    return !input.validity.valid;
  })
}
function disableFormButton(button) {
  button.classList.add(params.inactiveButtonClass);
  button.disabled = true;
}
function enabeFormButton(button) {
  button.classList.remove(params.inactiveButtonClass);
  button.disabled = false;
}
