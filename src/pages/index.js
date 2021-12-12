import initialCards from '../scripts/utils/initialCards.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
  rootElement, headLogoElement, editProfileButton, currentNameSelector, currentSpecialitySelector,
  addNewCardButton, placesContainerSelector, editProfileForm, addCardForm, popupEditProfileSelector, popupImagePreviewSelector, inputName, inputSpeciality,
  popupAddNewPlaceSelector, settings
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';

// ********************************************
// *** EVENTS ***
// ********************************************

headLogoElement.addEventListener('click', changeTheme);

editProfileButton.addEventListener('click', () => {
  const{name, speciality} = userInfo.getUserInfo();
  inputName.value = name;
  inputSpeciality.value = speciality;
  profileFormValidator.resetValidation();
  popupUserEdit.open();
});

addNewCardButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  popupAddCard.open();
});

const popupAddCard = new PopupWithForm(popupAddNewPlaceSelector, (item) => {
    cardsList.addItem(createCard(item));
  }
);
popupAddCard.setEventListeners();


const userInfo = new UserInfo(currentNameSelector, currentSpecialitySelector);

const popupUserEdit = new PopupWithForm(popupEditProfileSelector, (formData) => {
  userInfo.setUserInfo(formData);
}
);
popupUserEdit.setEventListeners();

// ********************************************
// *** FUNCTIONS ***
// ********************************************

function createCard(item) {
    const card = new Card(item, '#place', () => {
      popupWithImage.open(item);
    });
    const cardElement = card.generateCard();
    return cardElement;
}

const popupWithImage = new PopupWithImage(popupImagePreviewSelector);
popupWithImage.setEventListeners();

// ADD SAVED CARDS ON LOAD PAGE
const cardsList = new Section({ items: initialCards, renderer: (item) => {
  cardsList.addItem(createCard(item));
}
}, placesContainerSelector);
// RENDER CARDS
cardsList.renderItems();

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
const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(settings, addCardForm);
newCardFormValidator.enableValidation();
