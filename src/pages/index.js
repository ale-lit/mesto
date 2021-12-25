import FormValidator from '../scripts/components/FormValidator.js';
import {
  rootElement, headLogoElement, editProfileButton, currentNameSelector, currentAboutSelector, addNewCardButton,
  placesContainerSelector, editProfileForm, addCardForm, editAvatarForm, popupEditProfileSelector, popupImagePreviewSelector,
  inputName, inputAbout, avatarContainerElement, popupEditAvatarSelector, popupAddNewPlaceSelector, settings
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css';



const popupSubmit = new PopupWithSubmit('.popup_type_submit', (card) => {
  api.deleteCard(card._id)
      .then(() => {
          card._element.remove();
          card._element = null;
        }
      )
});
popupSubmit.setEventListeners();


avatarContainerElement.addEventListener('click', () => {
  popupAvatarEdit.open();
});

const popupAvatarEdit = new PopupWithForm(popupEditAvatarSelector, (formData) => {
    api.changeAvatar(formData.link)
      .then(res => {
        document.querySelector('.profile__avatar').src = res.avatar;
      })
  }
);
popupAvatarEdit.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
    'Content-Type': 'application/json'
  }
});

let currentUserId = '';

// UserInfo
const getUserInfo = api.getUserInfo().then((result) => {
  currentUserId = result._id;
  userInfo.setUserInfo(result);
});


Promise.all([getUserInfo]).then(() => {
  // ADD SAVED CARDS ON LOAD PAGE
  api.getInitialCards().then(initialCards => {
    const cardsList = new Section({ items: initialCards, renderer: (item) => {
      cardsList.addItem(createCard(item, currentUserId));
    }
    }, placesContainerSelector);
    // RENDER CARDS
    cardsList.renderItems();
  })
});

headLogoElement.addEventListener('click', changeTheme);

editProfileButton.addEventListener('click', () => {
  const{name, about} = userInfo.getUserInfo();
  inputName.value = name;
  inputAbout.value = about;
  profileFormValidator.resetValidation();
  popupUserEdit.open();
});

addNewCardButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  popupAddCard.open();
});

const popupAddCard = new PopupWithForm(popupAddNewPlaceSelector, (item) => {
    api.postCard(item.name, item.link)
      .then(res => {
          const cardsList = new Section({ items: res, renderer: (item) => {
            cardsList.addItem(createCard(item, currentUserId));
          }
          }, placesContainerSelector);

          cardsList.addItem(createCard(res, currentUserId));
        }
      )
  }
);
popupAddCard.setEventListeners();


const userInfo = new UserInfo(currentNameSelector, currentAboutSelector);

const popupUserEdit = new PopupWithForm(popupEditProfileSelector, (formData) => {
    api.editUserInfo(formData.name, formData.about)
      .then(() => {
        userInfo.setUserInfo(formData);
      })
  }
);
popupUserEdit.setEventListeners();

// ********************************************
// *** FUNCTIONS ***
// ********************************************

function createCard(data, currentUserId) {

  const card = new Card({
    data,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleLikeClick: (card) => {



      console.log(card);
      if(card._likes.length === 0) {
        api.addLike(card._id)
          .then((res) => {
              card._element.querySelector('.place__like').classList.add('place__like_active');
              card._element.querySelector('.place__like-num').textContent = res.likes.length;
              card._likes = res.likes;
            }
          )
      } else {
        let myLike = false;
        card._likes.forEach(likeData => {
          if(likeData._id === currentUserId) {
            myLike = true;
          }
        })

        if(myLike) {
          api.delLike(card._id)
            .then((res) => {
                card._element.querySelector('.place__like').classList.remove('place__like_active');
                card._element.querySelector('.place__like-num').textContent = res.likes.length;
                card._likes = res.likes;
              }
            )
        } else {
          api.addLike(card._id)
            .then((res) => {
                card._element.querySelector('.place__like').classList.add('place__like_active');
                card._element.querySelector('.place__like-num').textContent = res.likes.length;
                card._likes = res.likes;
              }
            )
        }
      }
    },
    handleDeleteIconClick: (card) => {
      popupSubmit.setId(card);
      popupSubmit.open();
    }
  }, '#place', currentUserId);

    const cardElement = card.generateCard();
    return cardElement;
}

const popupWithImage = new PopupWithImage(popupImagePreviewSelector);
popupWithImage.setEventListeners();


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

const avatarFormValidator = new FormValidator(settings, editAvatarForm);
avatarFormValidator.enableValidation();
