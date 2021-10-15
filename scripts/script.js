// Добавляем смену оформления
const headLogo = document.querySelector('.header__logo');
const root = document.querySelector('.root');
const place = document.querySelectorAll('.place');

function changeTheme() {
  root.classList.toggle('root_light');
  headLogo.classList.toggle('header__logo_light');
  console.log(place);
  //place.classList.toggle('place_light');
}

headLogo.addEventListener('click', changeTheme);
