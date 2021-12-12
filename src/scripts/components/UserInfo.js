export default class UserInfo {
  constructor(nameSelector, specialitySelector) {
    this._name = document.querySelector(nameSelector);
    this._speciality = document.querySelector(specialitySelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      speciality: this._speciality.textContent
    };
  }

  setUserInfo({name, speciality}) {
    this._name.textContent = name;
    this._speciality.textContent = speciality;
  }
}
