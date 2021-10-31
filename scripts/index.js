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
const popupContainerElement = popupElement.querySelector('.popup__container');
const closeButtonElement = popupElement.querySelector('.popup__close-button');
const popupTitle = popupElement.querySelector('.popup__title');
const formElement = popupElement.querySelector('.popup__form');
const inputFirstElement = popupElement.querySelector('#input-first');
const inputSecondElement = popupElement.querySelector('#input-second');
const popupSaveButton = popupElement.querySelector('.popup__save-button');
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
// ADD SAVED CARDS ON LOAD PAGE
function addCardsOnloadPage() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}
addCardsOnloadPage();

// ADD ONE CARD FUNCTIONAL
function addCard(name, image) {
  // Clone Element From Template
  const cardElement = placeTemplate.querySelector('.place').cloneNode(true);

  // Insert Content
  cardElement.querySelector('.place__photo').src = image;
  cardElement.querySelector('.place__photo').alt = name;
  cardElement.querySelector('.place__name').textContent = name;

  // Add Events
  cardElement.querySelector('.place__like').addEventListener('click', addRemoveLike);
  cardElement.querySelector('.place__delete').addEventListener('click', deletePlace);
  cardElement.querySelector('.place__photo').addEventListener('click', previewImage);

  // Add Ready Element
  placesElement.prepend(cardElement);
}

// DELETE PLACE FUNCTIONAL
function deletePlace(event) {
  event.target.closest('.place').remove();
}

// PREVIEW IMAGE
function previewImage(event) {
  const currImage = event.target.src;
  const currName = event.target.closest('.place').querySelector('.place__name').textContent;
  openPopup('previewImage', currImage, currName);
}

// OPEN POPUP
function openPopup(action, ...data) {
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
  } else if (action === 'previewImage') {
    // Popup Title
    popupTitle.textContent = data[1];
    // Add Styles For Image Preview
    popupElement.classList.add('popup_type_image');
    popupContainerElement.classList.add('popup__container_type_image');
    popupTitle.classList.add('popup__title_type_image');
    formElement.classList.add('hide');
    // Generate Image Element
    const image = document.createElement('img');
    image.src = data[0];
    image.alt = data[1];
    image.classList.add('popup__image');
    // Add Image Element
    popupContainerElement.prepend(image);
  }
  // Add Open Class
  popupElement.classList.add('popup_opened');
}

// CLOSE POPUP
function closePopup() {
  // Delete Open Class
  popupElement.classList.remove('popup_opened');
  // Delete Styles For Image Preview (with pause)
  setTimeout(() => {
    popupElement.classList.remove('popup_type_image');
    popupContainerElement.classList.remove('popup__container_type_image');
    formElement.classList.remove('hide');
    popupTitle.classList.remove('popup__title_type_image');
    popupElement.querySelector('.popup__image').remove();
  }, 300);
  // Delete All Events
  clearListeners();
}
// Close Popup From Click Overlay
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget) closePopup();
}

// CHANGE PROFILE
function changeProfile(evt) {
  // Reset Default Hadler For Submit
  evt.preventDefault();
  // Change Content From User Choice
  currentNameElement.textContent = inputFirstElement.value;
  currentSpecialityElement.textContent = inputSecondElement.value;

  clearListeners();

  closePopup();
}

// ADD NEW PLACE
function addNewCard(evt) {
  evt.preventDefault();

  addCard(inputFirstElement.value, inputSecondElement.value);

  clearListeners();
  closePopup();
}

// DELETE ALL LISTENERS
function clearListeners() {
  formElement.removeEventListener('submit', changeProfile);
  formElement.removeEventListener('submit', addNewCard);
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
