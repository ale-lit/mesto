const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error'
};

function enableValidation() {
  const forms = [...document.querySelectorAll(setting.formSelector)];
  forms.forEach(addListenersToForm);
}
enableValidation();

function addListenersToForm(form) {
  form.addEventListener('input', handleFormInput);

  toggleButton(form);
}

function handleFormInput(evt) {
  handleFieldValidation(evt.target);
  toggleButton(evt.currentTarget);
}

function handleFieldValidation(element) {
	const errorContainer = document.querySelector(`#${element.id}-error`);

	element.classList.toggle(setting.inputErrorClass, !element.validity.valid);

	errorContainer.textContent = element.validationMessage;
}

function toggleButton(form) {
  const button = form.querySelector(setting.submitButtonSelector);
  const isFormInvalid = !form.checkValidity();

  button.disabled = isFormInvalid;
}
