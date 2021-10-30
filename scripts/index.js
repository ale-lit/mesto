// ************************************************************
// *** DOM DEFINITION ***
// ************************************************************
// DOM Elements
const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const placesElement = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;
const editButtonElement = rootElement.querySelector('.profile__edit-button');
const currentNameElement = rootElement.querySelector('.profile__name');
const currentSpecialityElement = rootElement.querySelector('.profile__speciality');
const addButtonElement = document.querySelector('.profile__add-button');
// Popup Elements
const popupElement = document.querySelector('.popup');
const closeButtonElement = popupElement.querySelector('.popup__close-button');
const popupTitle = popupElement.querySelector('.popup__title');
const formElement = popupElement.querySelector('.popup__form');
const inputFirstElement = popupElement.querySelector('#input-first');

const inputSecondElement = popupElement.querySelector('#input-second');
const popupSaveButton = popupElement.querySelector('.popup__save-button');
// Cards Array
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

// ************************************************************
// *** EVENTS ***
// ************************************************************
headLogoElement.addEventListener('click', changeTheme);
addButtonElement.addEventListener('click', () => openPopup('addNewPlace'));
editButtonElement.addEventListener('click', () => openPopup('editProfile'));
closeButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);

// ************************************************************
// *** FUNCTIONS ***
// ************************************************************
// Add Cards On Load Page
function addCardsOnloadPage() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}
addCardsOnloadPage();

// Add One Card
function addCard(name, image) {
  // Clone Element Template
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true);

  // Insert Content
  cardElement.querySelector('.place__photo').src = image;
  cardElement.querySelector('.place__photo').alt = name;
  cardElement.querySelector('.place__name').textContent = name;

  // Add Events
  cardElement.querySelector('.place__like').addEventListener('click', addRemoveLike);
  cardElement.querySelector('.place__delete').addEventListener('click', deletePlace);

  // Add Ready Element
  placesElement.prepend(cardElement);
}

// Delete Place
function deletePlace(event) {
  event.target.closest('.place').remove();
}

// Open Popup
function openPopup(action) {
  if (action === 'editProfile') {
    // Popup Title
    popupTitle.textContent = 'Редактировать профиль';
    // Popup First Input
    inputFirstElement.value = currentNameElement.textContent;
    inputFirstElement.placeholder = 'Имя';
    // Popup Second Input
    inputSecondElement.value = currentSpecialityElement.textContent;
    inputSecondElement.placeholder = 'Специализация';
    // Save Button
    popupSaveButton.value = 'Сохранить';
    // Event
    formElement.addEventListener('submit', changeProfile);
  } else if (action === 'addNewPlace') {
    // Popup Title
    popupTitle.textContent = 'Новое место';
    // Popup First Input
    inputFirstElement.value = '';
    inputFirstElement.placeholder = 'Название';
    // Popup Second Input
    inputSecondElement.value = '';
    inputSecondElement.placeholder = 'Ссылка на картинку';
    // Save Button
    popupSaveButton.value = 'Создать';
    // Event
    formElement.addEventListener('submit', addNewCard);
  }

  popupElement.classList.add('popup_opened');
}
// Close Popup
function closePopup() {
  popupElement.classList.remove('popup_opened');
  clearListeners();
}
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget) closePopup();
}

// Change Profile
function changeProfile(evt) {
  evt.preventDefault();
  currentNameElement.textContent = inputFirstElement.value;
  currentSpecialityElement.textContent = inputSecondElement.value;
  clearListeners();
  closePopup();
}
// Add New Place
function addNewCard(evt) {
  evt.preventDefault();
  addCard(inputFirstElement.value, inputSecondElement.value);
  clearListeners();
  closePopup();
}
// Clear All Listeners
function clearListeners() {
  formElement.removeEventListener('submit', changeProfile);
  formElement.removeEventListener('submit', addNewCard);
}
// Likes
function addRemoveLike(event) {
  event.target.classList.toggle('place__like_active');
}
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
