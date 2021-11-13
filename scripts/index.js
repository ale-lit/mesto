// ********************************************
// *** DOM DEFINITION ***
// ********************************************

// DOM Elements
const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const placesElement = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;
const editButtonElement = rootElement.querySelector('.profile__edit-button');
const currentNameElement = rootElement.querySelector('.profile__name');
const currentSpecialityElement = rootElement.querySelector('.profile__speciality');
const addButtonElement = document.querySelector('.profile__add-button');
// Popups Elements
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfileForm.querySelector('#input-name');
const inputSpeciality = popupEditProfileForm.querySelector('#input-speciality');

const popupAddNewPlace = document.querySelector('.popup_type_add-place');
const popupAddNewPlaceForm = popupAddNewPlace.querySelector('.popup__form');
const inputPlaceName = popupAddNewPlaceForm.querySelector('#input-place-name');
const inputImageSource = popupAddNewPlaceForm.querySelector('#input-image-source');

const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImagePreviewFigure = popupImagePreview.querySelector('.popup__figure');
const popupImageElement = popupImagePreviewFigure.querySelector('.popup__image');
const popupImagePreviewFigCaption = popupImagePreviewFigure.querySelector('.popup__figcaption');

const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

// Initial Cards Array
const initialCards = [
  {
    name: 'Пушкин',
    link: './images/places/pushkin.jpg'
  },
  {
    name: 'Карелия',
    link: './images/places/karelia.jpg'
  },
  {
    name: 'Судак',
    link: './images/places/sudak.jpg'
  },
  {

    name: 'Геленджик',
    link: './images/places/gelendjick.jpg'
  },
  {
    name: 'Сочи',
    link: './images/places/sochi.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/places/kamchatka.jpg'
  }
];

// ********************************************
// *** EVENTS ***
// ********************************************

headLogoElement.addEventListener('click', changeTheme);

editButtonElement.addEventListener('click', () => {
  // Update Actual Data In Inputs
  inputName.value = currentNameElement.textContent;
  inputSpeciality.value = currentSpecialityElement.textContent;

  // Validate Form On Every Open
  handleFieldValidation(inputName);
  handleFieldValidation(inputSpeciality);
  toggleButton(popupEditProfileForm);

  popupEditProfileForm.addEventListener('submit', changeProfile);
  openPopup(popupEditProfile);
});

addButtonElement.addEventListener('click', () => {
  inputPlaceName.value = '';
  inputImageSource.value = '';

  // Validate Form On Every Open
  toggleButton(popupAddNewPlaceForm);

  popupAddNewPlaceForm.addEventListener('submit', addNewCard);
  openPopup(popupAddNewPlace);
});

popupCloseButtons.forEach((element) => {
  element.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

popupElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    closePopupByClickOverlay(event);
  });
});

// ********************************************
// *** FUNCTIONS ***
// ********************************************

// ADD SAVED CARDS ON LOAD PAGE
function addCardsOnloadPage() {
  initialCards.forEach((item) => {
    // Create & Render Cards
    renderCard(createCard(item));
  });
}
addCardsOnloadPage();

// CREATE CARD
function createCard(data) {
  // Clone Element From Template
  const card = placeTemplate.querySelector('.place').cloneNode(true);
  // Insert Content
  card.querySelector('.place__photo').src = data.link;
  card.querySelector('.place__photo').alt = data.name;
  card.querySelector('.place__name').textContent = data.name;
  // Add Events
  card.querySelector('.place__like').addEventListener('click', addRemoveLike);
  card.querySelector('.place__delete').addEventListener('click', deletePlace);
  card.querySelector('.place__photo').addEventListener('click', () => {
    // Change Image
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    // Insert Figcaption Value
    popupImagePreviewFigCaption.textContent = data.name;

    openPopup(popupImagePreview);
  });
  // Return
  return card;
}

// RENDER CARD
function renderCard(card) {
  // Add Ready Element
  placesElement.prepend(card);
}

// DELETE PLACE FUNCTIONAL
function deletePlace(event) {
  event.target.closest('.place').remove();
}

// OPEN POPUP
function openPopup(popup) {
  // Add Open Class
  popup.classList.add('popup_opened');
  addEventForCloseFromEscape();
}

// CLOSE POPUP
function closePopup(popup) {
  // Delete Open Class
  popup.classList.remove('popup_opened');
  removeEventForCloseFromEscape();
}
// Close Popup From Click Overlay
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target.closest('.popup'));
    removeEventForCloseFromEscape();

  };
}
// Add & Remove Event For Close Popup On 'Escape'
function addEventForCloseFromEscape() {
  document.addEventListener('keydown', closePopupByPressEscape);
}
function removeEventForCloseFromEscape() {
  document.removeEventListener('keydown', closePopupByPressEscape);
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
  // Create & Render New Place
  renderCard(createCard(newPlace));

  closePopup(popupAddNewPlace);
}

// ADD / REMOVE LIKES
function addRemoveLike(event) {
  event.target.classList.toggle('place__like_active');
}

// CHANGE THEME
function changeTheme() {
  // Add / Remove Mod Classes
  rootElement.classList.toggle('root_theme_light');
  headLogoElement.classList.toggle('header__logo_theme_light');
  editButtonElement.classList.toggle('profile__edit-button_theme_light');

  // Select All Actual Place Blocks
  const placeElement = rootElement.querySelectorAll('.place');
  placeElement.forEach(element => {
    element.classList.toggle('place_theme_light');
  });
}
