// Change theme
const root = document.querySelector('.root');
const headLogo = root.querySelector('.header__logo');
const place = root.querySelectorAll('.place');
const editButton = root.querySelector('.profile__edit-button');
const currName = root.querySelector('.profile__name');
const currSpeciality = root.querySelector('.profile__speciality');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const form = popup.querySelector('.popup__form');
const inputName = popup.querySelector('#input-name');
const inputSpeciality = popup.querySelector('#input-speciality');

function changeTheme() {
  root.classList.toggle('root_light');
  headLogo.classList.toggle('header__logo_light');
  editButton.classList.toggle('profile__edit-button_light');
  place.forEach(element => {
    element.classList.toggle('place_light');
  });
}

headLogo.addEventListener('click', changeTheme);


// Open Popup
function openPopup() {
  inputName.setAttribute('value', currName.textContent);
  inputSpeciality.setAttribute('value', currSpeciality.textContent);
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

// Close Popup
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);


// ch2
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  currName.textContent = inputName.value;
  currSpeciality.textContent = inputSpeciality.value;
  closePopup();
});

// Add button
const addButton = document.querySelector('.profile__add-button');
function noFunctionalAlert() {
  alert('Данный функционал пока не реализован :(');
}
addButton.addEventListener('click', noFunctionalAlert);
