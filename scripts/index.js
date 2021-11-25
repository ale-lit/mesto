import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';
import {
  headLogoElement, editProfileButton, currentNameElement, currentSpecialityElement,
  addNewCardButton, editProfileForm, addCardForm, popupEditProfile, popupEditProfileForm, inputName, inputSpeciality,
  popupAddNewPlace, popupAddNewPlaceForm, popupElements, popupCloseButtons
} from './constants.js';
import { renderCard, addCardToContainer, openPopup, closePopup, closePopupByClickOverlay, changeProfile, addNewCard, changeTheme } from './functions.js';


// ********************************************
// *** EVENTS ***
// ********************************************

headLogoElement.addEventListener('click', changeTheme);

popupEditProfileForm.addEventListener('submit', changeProfile);
popupAddNewPlaceForm.addEventListener('submit', addNewCard);

editProfileButton.addEventListener('click', () => {
  // Update Actual Data In Inputs
  inputName.value = currentNameElement.textContent;
  inputSpeciality.value = currentSpecialityElement.textContent;

  openPopup(popupEditProfile);
});

addNewCardButton.addEventListener('click', () => {
  openPopup(popupAddNewPlace);
});

popupCloseButtons.forEach((element) => {
  element.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

popupElements.forEach((element) => {
  element.addEventListener('mousedown', closePopupByClickOverlay);
});

// ADD SAVED CARDS ON LOAD PAGE
initialCards.forEach((item) => {
  addCardToContainer(renderCard(item));
});

// VALIDATION FORMS
const settings = {
  parentFormSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  closeButtonSelector: '.popup__close-button'
}

const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(settings, addCardForm);
newCardFormValidator.enableValidation();
