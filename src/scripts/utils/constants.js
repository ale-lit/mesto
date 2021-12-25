const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const editProfileButton = rootElement.querySelector('.profile__edit-button');
const currentNameSelector = '.profile__name';
const currentAboutSelector = '.profile__about';
const addNewCardButton = rootElement.querySelector('.profile__add-button');
const placesContainerSelector = '.places';

const editProfileForm = document.forms.editProfile;
const addCardForm = document.forms.addCard;
const editAvatarForm = document.forms.editAvatar;

const popupEditProfileSelector = '.popup_type_edit-profile';
const inputName = document.querySelector('#input-name');
const inputAbout = document.querySelector('#input-about');

const avatarContainerElement = document.querySelector('.profile__avatar-container');
const popupEditAvatarSelector = '.popup_type_edit-avatar';

const popupAddNewPlaceSelector = '.popup_type_add-place';

const popupImagePreviewSelector = '.popup_type_image-preview';
const popupImagePreviewFigure = document.querySelector('.popup__figure');
const popupImageElement = popupImagePreviewFigure.querySelector('.popup__image');
const popupImagePreviewFigCaption = popupImagePreviewFigure.querySelector('.popup__figcaption');

const settings = {
  parentFormSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  closeButtonSelector: '.popup__close-button'
}

export {
  rootElement, headLogoElement, editProfileButton, currentNameSelector, currentAboutSelector, addNewCardButton, placesContainerSelector,
  editProfileForm, addCardForm, editAvatarForm, popupEditProfileSelector, inputName, inputAbout, avatarContainerElement, popupEditAvatarSelector,
  popupAddNewPlaceSelector, popupImagePreviewSelector, popupImagePreviewFigure, popupImageElement, popupImagePreviewFigCaption, settings
};
