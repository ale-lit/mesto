//import initialCards from '../scripts/utils/initialCards.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
  rootElement, headLogoElement, editProfileButton, currentNameSelector, currentAboutSelector,
  addNewCardButton, placesContainerSelector, editProfileForm, addCardForm, popupEditProfileSelector, popupImagePreviewSelector, inputName, inputAbout,
  popupAddNewPlaceSelector, settings
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css';


// const cardsList = new Section(
//   {
//     renderer: (item) => {
//       cardsList.addItem(createCard(item));
//     },
//   },
//   placesContainerSelector
// );

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
      // console.log(123 + currentUserId);
    }
    }, placesContainerSelector);
    // RENDER CARDS
    cardsList.renderItems();
  })
});


// const cardsList = new Section({ items: initialCards, renderer: (item) => {
//   cardsList.addItem(createCard(item));
// }
// }, placesContainerSelector);

// POST NEW CARD
// api.getInitialCards().then(initialCards => {
//   const cardsList = new Section({ items: initialCards, renderer: (item) => {
//     cardsList.addItem(createCard(item));
//   }
//   }, placesContainerSelector);
//   // RENDER CARDS
//   cardsList.renderItems();
// })



// .then(result => {
//   //console.log(result);

//    return result;
//  })
//  .catch((err) => {
//    console.log(err);
//  });

// console.log(api.getUserInfo());


// Карточки (пока нету)
// fetch('https://mesto.nomoreparties.co/v1/cohort-33/cards', {
//   headers: {
//     authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c'
//   }
// })
// .then(res => res.json())
// .then((result) => {
//   console.log(333 + result);
// });



// // Edit UserInfo
// fetch('https://mesto.nomoreparties.co/v1/cohort-33/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie1',
//     about: 'Physicist and Chemist'
//   })
// })
// .then(res => res.json())
// .then((result) => {
//   //console.log(result);

//   // const obj = {
//   //   name: result.name,
//   //   speciality: result.about
//   // }

//   // userInfo.setUserInfo(obj);

//   // console.log(result.name);
//   // console.log(result.about);
//   // console.log(result.avatar);

//   // document.querySelector('.profile__avatar').src = result.avatar;
// });

// api.editUserInfo('Петр', 'Продюсер');


// Add New Card
// fetch('https://mesto.nomoreparties.co/v1/cohort-33/cards', {
//   method: 'POST',
//   headers: {
//     authorization: 'f5c43062-fa6e-4cd2-82d1-ae866fc3359c',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   })
// }).then(res => res.json())
// .then((result) => {
//   console.log(result);
// });

//api.postCard('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');



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
  console.log(item);
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
    userInfo.setUserInfo(formData);
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
      console.log(card)
        card.target.classList.toggle('place__like_active');
      // card.target.classList.toggle('place__like_active');
      // card._toggleLike;
    },
    handleDeleteIconClick: (card) => {
      api.deleteCard(card._id)
      .then(() => {
          card._element.remove();
          card._element = null;
        }
      )
    }
  }, '#place', currentUserId);


    // const card = new Card(item, '#place', () => {
    //   popupWithImage.open(item);
    // }, api, currentUser);



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
