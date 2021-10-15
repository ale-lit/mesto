// Cмена оформления
const headLogo = document.querySelector('.header__logo');
const root = document.querySelector('.root');
const place = document.querySelectorAll('.place');

function changeTheme() {
  root.classList.toggle('root_light');
  headLogo.classList.toggle('header__logo_light');
  place.forEach(element => {
    element.classList.toggle('place_light');
  });
}

headLogo.addEventListener('click', changeTheme);


// Popup
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

addButton.addEventListener('click', function(){
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});
