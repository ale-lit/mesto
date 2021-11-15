enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// INITIALIZE VALIDATION
function enableValidation(params) {
  const formList = [...document.querySelectorAll(params.formSelector)];

  formList.forEach((form) => {
    setEventListeners(form, params);
  });
};

// VALIDATE
function setEventListeners(form, params) {
  const inputList = getInputList(form, params);

  toggleButtonState(form, params);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkformValidation(form, input, params);
    });
  });
};
function checkformValidation(form, input, params) {
  isValid(input, params);
  toggleButtonState(form, params);
}
function isValid(input, params) {
  if (!input.validity.valid) {
    showInputError(input, params);
  } else {
    hideInputError(input, params);
  }
};

// GET ALL INPUTS FROM FORM
function getInputList(form, params) {
  return [...form.querySelectorAll(params.inputSelector)];
}

// ERROR MESSAGE
function showInputError(input, params) {
  const errorElement = getErrorElement(input);

  input.classList.add(params.inputErrorClass);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = input.validationMessage;
};
function hideInputError(input, params) {
  const errorElement = getErrorElement(input);

  input.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};
function getErrorElement(input) {
  return document.querySelector(`#${input.id}-error`);
};

// CHECK BUTTON
function toggleButtonState(form, params) {
  const buttonElement = form.querySelector(params.submitButtonSelector);

  if (hasInvalidInput(form, params)) {
    disableFormButton(buttonElement, params);
  } else {
    enabeFormButton(buttonElement, params);
  }
}
function hasInvalidInput(form, params) {
  const inputList = getInputList(form, params);

  return inputList.some((input) => {
    return !input.validity.valid;
  })
}
function disableFormButton(button, params) {
  button.classList.add(params.inactiveButtonClass);
  button.disabled = true;
}
function enabeFormButton(button, params) {
  button.classList.remove(params.inactiveButtonClass);
  button.disabled = false;
}
