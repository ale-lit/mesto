const rootElement = document.querySelector('.root');
const headLogoElement = rootElement.querySelector('.header__logo');
const editProfileButton = rootElement.querySelector('.profile__edit-button');
const currentNameElement = rootElement.querySelector('.profile__name');
const currentSpecialityElement = rootElement.querySelector('.profile__speciality');
const addNewCardButton = rootElement.querySelector('.profile__add-button');
const placesContainer = rootElement.querySelector('.places');

const editProfileForm = document.forms.editProfile;
const addCardForm = document.forms.addCard;

const popupEditProfile = rootElement.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditProfileForm.querySelector('#input-name');
const inputSpeciality = popupEditProfileForm.querySelector('#input-speciality');

const popupAddNewPlace = rootElement.querySelector('.popup_type_add-place');
const popupAddNewPlaceForm = popupAddNewPlace.querySelector('.popup__form');
const inputPlaceName = popupAddNewPlaceForm.querySelector('#input-place-name');
const inputImageSource = popupAddNewPlaceForm.querySelector('#input-image-source');

const popupCloseButtons = rootElement.querySelectorAll('.popup__close-button');

const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImagePreviewFigure = popupImagePreview.querySelector('.popup__figure');
const popupImageElement = popupImagePreviewFigure.querySelector('.popup__image');
const popupImagePreviewFigCaption = popupImagePreviewFigure.querySelector('.popup__figcaption');

export {
  rootElement, headLogoElement, editProfileButton, currentNameElement, currentSpecialityElement,
  addNewCardButton, placesContainer, editProfileForm, addCardForm, popupEditProfile, popupEditProfileForm, inputName, inputSpeciality,
  popupAddNewPlace, popupAddNewPlaceForm, inputPlaceName, inputImageSource, popupCloseButtons,
  popupImagePreview, popupImagePreviewFigure, popupImageElement, popupImagePreviewFigCaption
};
