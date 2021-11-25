import {
  rootElement, headLogoElement, editProfileButton, currentNameElement, currentSpecialityElement,
  placesContainer, popupEditProfile, inputName, inputSpeciality
} from './constants.js';

// ADD CARD
function addCardToContainer(card) {
  placesContainer.prepend(card);
}

// OPEN POPUP
function openPopup(popup) {
  // Add Open Class
  popup.classList.add('popup_opened');
  // Add Event
  document.addEventListener('keydown', closePopupByPressEscape);
}

// CLOSE POPUP
function closePopup(popup) {
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

export { addCardToContainer, openPopup, closePopup, closePopupByClickOverlay, closePopupByPressEscape, changeProfile, changeTheme };
