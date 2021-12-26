export default class UserInfo {
  constructor(nameSelector, aboutSelector, currentAvatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(currentAvatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo({name, about, avatar}) {
    if(name) this._name.textContent = name;
    if(about) this._about.textContent = about;
    if(avatar) this._avatar.src = avatar;
  }
}
