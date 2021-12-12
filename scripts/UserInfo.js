export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      about: document.querySelector(this._aboutSelector).textContent
    };
  }

  setUserInfo(name, about) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._aboutSelector).textContent = about;
  }
}
