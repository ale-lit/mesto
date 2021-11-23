import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// ********************************************
// *** DOM DEFINITION ***
// ********************************************

// DOM Elements
const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const editProfileButton = rootElement.querySelector('.profile__edit-button');
const currentNameElement = rootElement.querySelector('.profile__name');
const currentSpecialityElement = rootElement.querySelector('.profile__speciality');
const addNewCardButton = document.querySelector('.profile__add-button');
// Popups Elements
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfileForm.querySelector('#input-name');
const inputSpeciality = popupEditProfileForm.querySelector('#input-speciality');

const popupAddNewPlace = document.querySelector('.popup_type_add-place');
const popupAddNewPlaceForm = popupAddNewPlace.querySelector('.popup__form');
const inputPlaceName = popupAddNewPlaceForm.querySelector('#input-place-name');
const inputImageSource = popupAddNewPlaceForm.querySelector('#input-image-source');

const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');


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
  element.addEventListener('click', closePopupByClickOverlay);
});


// ********************************************
// *** FUNCTIONS ***
// ********************************************

// ADD SAVED CARDS ON LOAD PAGE
initialCards.forEach((item) => {
  renderCard(item);
});

// RENDER CARD
function renderCard(data) {
  // Create & Render New Place
  const card = new Card(data, '#place');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.places').prepend(cardElement);
}

// OPEN POPUP
export function openPopup(popup) {
  // Add Open Class
  popup.classList.add('popup_opened');
  // Add Event
  document.addEventListener('keydown', closePopupByPressEscape);
}

// CLOSE POPUP
function closePopup(popup) {
  const form = popup.querySelector('.popup__form');

  // Delete Open Class
  popup.classList.remove('popup_opened');
  // Delete Event
  document.removeEventListener('keydown', closePopupByPressEscape);
}
// Close Popup From Click Overlay
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target.closest('.popup'));
  };
}
// Close Popup From Press 'Escape'
function closePopupByPressEscape(event) {
  if(event.key === 'Escape') {
    const currPopup = document.querySelector('.popup_opened');
    closePopup(currPopup);
  };
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

// ADD NEW PLACE
function addNewCard(evt) {
  evt.preventDefault();
  // Create New Place Object
  const newPlace = {
    name: inputPlaceName.value,
    link: inputImageSource.value
  };

  renderCard(newPlace);

  // Clear Form
  evt.target.reset();

  closePopup(popupAddNewPlace);
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

document.querySelectorAll('.popup__form').forEach((form) => {
  const formElement = new FormValidator(settings, form);
  formElement.enableValidation();
});

