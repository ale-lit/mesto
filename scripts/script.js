// Change theme
const headLogo = document.querySelector('.header__logo');
const root = document.querySelector('.root');
const editButton = document.querySelector('.profile__edit-button');
const place = document.querySelectorAll('.place');

function changeTheme() {
  root.classList.toggle('root_light');
  headLogo.classList.toggle('header__logo_light');
  editButton.classList.toggle('profile__edit-button_light');
  place.forEach(element => {
    element.classList.toggle('place_light');
  });
}

headLogo.addEventListener('click', changeTheme);


// Popup
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

editButton.addEventListener('click', function(){
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});


// Add button
const addButton = document.querySelector('.profile__add-button');
function noFunctionalAlert() {
  alert('Данный функционал пока не реализован..');
}
addButton.addEventListener('click', noFunctionalAlert);


// Change name
const currName = document.querySelector('.profile__name');
const currSpeciality = document.querySelector('.profile__speciality');
const inputName = document.querySelector('#input-name');
const inputSpeciality = document.querySelector('#input-speciality');

//currName.textContent = '123';

inputName.setAttribute('value', currName.textContent);
inputSpeciality.setAttribute('value', currSpeciality.textContent);
