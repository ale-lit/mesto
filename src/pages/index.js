import FormValidator from '../scripts/components/FormValidator.js';
import {
  headLogoElement, editProfileButton, currentNameSelector, currentAboutSelector, currentAvatarSelector, addNewCardButton,
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
import {changeTheme} from '../scripts/utils/utils.js';
import './index.css';

const popupConfirmation = new PopupWithSubmit('.popup_type_submit', (card) => {
  api.deleteCard(card._id)
      .then(() => {
          card._element.remove();
          card._element = null;
          popupConfirmation.close();
        }
      )
      .catch((err) => {
        console.log(err);
      });
});
popupConfirmation.setEventListeners();

avatarContainerElement.addEventListener('click', () => {
  popupAvatarEdit.open();
});

const popupAvatarEdit = new PopupWithForm(popupEditAvatarSelector, (formData) => {
    api.changeAvatar(formData.link)
      .then(res => {
        userInfo.setUserInfo(res);
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarEdit.setButtonText();
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

let currentUserId;

const cardsList = new Section((item) => {
    cardsList.addItem(createCard(item, currentUserId));
  }, placesContainerSelector
);

// UserInfo
api.getUserInfo()
  .then((result) => {
    currentUserId = result._id;
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });

// ADD SAVED CARDS ON LOAD PAGE
api.getAllNeededData()
  .then(data => {
    cardsList.renderItems(data[0]);
  })
  .catch((err) => {
    console.log(err);
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
          cardsList.addItem(createCard(res, currentUserId));
          popupAddCard.close();
        }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.setButtonText();
      })
  }
);
popupAddCard.setEventListeners();

const userInfo = new UserInfo(currentNameSelector, currentAboutSelector, currentAvatarSelector);

const popupUserEdit = new PopupWithForm(popupEditProfileSelector, (formData) => {
    api.editUserInfo(formData.name, formData.about)
      .then(() => {
        userInfo.setUserInfo(formData);
        popupUserEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUserEdit.setButtonText();
      })
  }
);
popupUserEdit.setEventListeners();

function createCard(data, currentUserId) {
  const card = new Card({
    data,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleLikeClick: (id, isLiked) => {
      if (isLiked) {
        api.delLike(id)
            .then((res) => {
                card.updateLikes(res.likes);
              }
            )
            .catch((err) => {
              console.log(err);
            });
      } else {
        api.addLike(id)
          .then((res) => {
              card.updateLikes(res.likes, true);
            }
          )
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteIconClick: (card) => {
      popupConfirmation.setId(card);
      popupConfirmation.open();
    }
  }, '#place', currentUserId);

    const cardElement = card.generateCard();
    return cardElement;
}

const popupWithImage = new PopupWithImage(popupImagePreviewSelector);
popupWithImage.setEventListeners();

// VALIDATION FORMS
const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(settings, addCardForm);
newCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, editAvatarForm);
avatarFormValidator.enableValidation();
