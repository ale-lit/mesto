// ************************************************************
// *** DOM DEFINITION ***
// ************************************************************
const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const placesElement = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;
const editButtonElement = rootElement.querySelector('.profile__edit-button');
const currentNameElement = rootElement.querySelector('.profile__name');
const currentSpecialityElement = rootElement.querySelector('.profile__speciality');
const addButtonElement = document.querySelector('.profile__add-button');
// Popup
const popupElement = document.querySelector('.popup');
const closeButtonElement = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.popup__form');
const inputNameElement = popupElement.querySelector('#input-name');
const inputSpecialityElement = popupElement.querySelector('#input-speciality');


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

function addCardsOnload() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}
addCardsOnload();


function addCard(name, image) {
  // Clone Element Template
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true);

  // Add Content
  cardElement.querySelector('.place__photo').src = image;
  cardElement.querySelector('.place__photo').alt = name;
  cardElement.querySelector('.place__name').textContent = name;


  placesElement.prepend(cardElement);
}


// ************************************************************
// *** FUNCTIONS ***
// ************************************************************
// Change Theme
function changeTheme() {
  const placeElement = rootElement.querySelectorAll('.place');
  rootElement.classList.toggle('root_theme_light');
  headLogoElement.classList.toggle('header__logo_theme_light');
  editButtonElement.classList.toggle('profile__edit-button_theme_light');
  placeElement.forEach(element => {
    element.classList.toggle('place_theme_light');
  });
}
// Add Place (in progress)
function noFunctionalAlert() {
  alert('Данный функционал ещё не реализован :(');
}
// Open Popup
function openPopup() {
  inputNameElement.value = currentNameElement.textContent;
  inputSpecialityElement.value = currentSpecialityElement.textContent;
  popupElement.classList.add('popup_opened');
}
// Close Popup
function closePopup() {
  popupElement.classList.remove('popup_opened');
}
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget) closePopup();
}
// Change Profile Info
function changeProfile(evt) {
  evt.preventDefault();
  currentNameElement.textContent = inputNameElement.value;
  currentSpecialityElement.textContent = inputSpecialityElement.value;
  closePopup();
}

// ************************************************************
// *** EVENTS ***
// ************************************************************
headLogoElement.addEventListener('click', changeTheme);
addButtonElement.addEventListener('click', noFunctionalAlert);
editButtonElement.addEventListener('click', openPopup);
closeButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', changeProfile);
popupElement.addEventListener('click', closePopupByClickOverlay);
