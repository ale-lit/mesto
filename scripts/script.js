// Change theme
const root = document.querySelector('.root');
const headLogo = document.querySelector('.header__logo');
const place = document.querySelectorAll('.place');
const editButton = document.querySelector('.profile__edit-button');
const currName = document.querySelector('.profile__name');
const currSpeciality = document.querySelector('.profile__speciality');
const inputName = document.querySelector('#input-name');
const inputSpeciality = document.querySelector('#input-speciality');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

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


// Add button
const addButton = document.querySelector('.profile__add-button');
function noFunctionalAlert() {
  alert('Данный функционал пока не реализован :(');
}
addButton.addEventListener('click', noFunctionalAlert);


// ch2
const form = document.querySelector('.popup__form');

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  currName.textContent = inputName.value;
  currSpeciality.textContent = inputSpeciality.value;
  closePopup();
});
