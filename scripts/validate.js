const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function enableValidation() {
  const formList = [...document.querySelectorAll(params.formSelector)];

  formList.forEach((form) => {
    setEventListeners(form);
  });
};
enableValidation();

function setEventListeners(form) {
  const inputList = [...form.querySelectorAll(params.inputSelector)];
  const buttonElement = form.querySelector(params.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function isValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
};

function showInputError(form, input) {
  const errorElement = getErrorElement(form, input);

  input.classList.add(params.inputErrorClass);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = input.validationMessage;
};

function hideInputError(form, input) {
  const errorElement = getErrorElement(form, input);

  input.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

function getErrorElement(form, input) {
  return form.querySelector(`#${input.id}-error`);
}


// Функция принимает массив полей
function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};









// const setting = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inputErrorClass: 'popup__input_type_error'
// };

// function enableValidation() {
//   const forms = [...document.querySelectorAll(setting.formSelector)];
//   forms.forEach(addListenersToForm);
// }
// enableValidation();

// function addListenersToForm(form) {
//   form.addEventListener('input', handleFormInput);
// }

// function handleFormInput(evt) {
//   handleFieldValidation(evt.target);
//   toggleButton(evt.currentTarget);
// }

// function handleFieldValidation(element) {
// 	const errorContainer = document.querySelector(`#${element.id}-error`);
// 	element.classList.toggle(setting.inputErrorClass, !element.validity.valid);
// 	errorContainer.textContent = element.validationMessage;
// }

// function toggleButton(form) {
//   const button = form.querySelector(setting.submitButtonSelector);
//   button.disabled = !form.checkValidity();
// }
