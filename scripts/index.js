import initialCards from './initialCards.js';
import FormValidator from './FormValidator.js';
import {
  rootElement, headLogoElement, editProfileButton, currentNameElement, currentSpecialityElement,
  addNewCardButton, placesContainer, editProfileForm, addCardForm, popupEditProfile, popupEditProfileForm, inputName, inputSpeciality,
  popupAddNewPlace, popupAddNewPlaceForm, inputPlaceName, inputImageSource, popupElements, popupCloseButtons
} from './constants.js';
import { openPopup, closePopup, closePopupByClickOverlay } from './popupControl.js';
import Card from './Card.js';


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


// ********************************************
// *** FUNCTIONS ***
// ********************************************

// ADD SAVED CARDS ON LOAD PAGE
initialCards.forEach((item) => {
  addCardToContainer(renderCard(item));
});

// RENDER CARD
function renderCard(data) {
  const card = new Card(data, '#place');
  const cardElement = card.generateCard();
  return cardElement;
}

// ADD CARD
function addCardToContainer(card) {
  placesContainer.prepend(card);
}

// ADD NEW PLACE
function addNewCard(evt) {
  evt.preventDefault();
  // Create New Place Object
  const newPlace = {
    name: inputPlaceName.value,
    link: inputImageSource.value
  };

  addCardToContainer(renderCard(newPlace));

  // Clear Form
  evt.target.reset();

  closePopup(popupAddNewPlace);
}

// CHANGE PROFILE
function changeProfile(evt) {
  // Reset Default Hadler For Submit
  evt.preventDefault();
  // Change Content From User Choice
  currentNameElement.textContent = inputName.value;
  currentSpecialityElement.textContent = inputSpeciality.value;

  closePopup(popupEditProfile);
}

// CHANGE THEME
function changeTheme() {
  // Add / Remove Mod Classes
  rootElement.classList.toggle('root_theme_light');
  headLogoElement.classList.toggle('header__logo_theme_light');
  editProfileButton.classList.toggle('profile__edit-button_theme_light');

  // Select All Actual Place Blocks
  const placeElement = rootElement.querySelectorAll('.place');
  placeElement.forEach(element => {
    element.classList.toggle('place_theme_light');
  });
}

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
