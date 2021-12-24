export default class UserInfo {
  constructor(nameSelector, aboutSelector, api) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector('.profile__avatar')
    this._api = api;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo({name, about, avatar}) {
    this._name.textContent = name;
    this._about.textContent = about;
    if(avatar) this._avatar.src = avatar;
  }
}
