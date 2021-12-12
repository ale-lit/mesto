const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const editProfileButton = rootElement.querySelector('.profile__edit-button');
const currentNameSelector = '.profile__name';
const currentSpecialitySelector = '.profile__speciality';
const addNewCardButton = rootElement.querySelector('.profile__add-button');
const placesContainerSelector = '.places';

const editProfileForm = document.forms.editProfile;
const addCardForm = document.forms.addCard;

const popupEditProfileSelector = '.popup_type_edit-profile';
const inputName = document.querySelector('#input-name');
const inputSpeciality = document.querySelector('#input-speciality');

const popupAddNewPlaceSelector = '.popup_type_add-place';

const popupImagePreviewSelector = '.popup_type_image-preview';
const popupImagePreviewFigure = document.querySelector('.popup__figure');
const popupImageElement = popupImagePreviewFigure.querySelector('.popup__image');
const popupImagePreviewFigCaption = popupImagePreviewFigure.querySelector('.popup__figcaption');

export {
  rootElement, headLogoElement, editProfileButton, currentNameSelector, currentSpecialitySelector,
  addNewCardButton, placesContainerSelector, editProfileForm, addCardForm, popupEditProfileSelector, inputName, inputSpeciality,
  popupAddNewPlaceSelector, popupImagePreviewSelector, popupImagePreviewFigure, popupImageElement, popupImagePreviewFigCaption
};
