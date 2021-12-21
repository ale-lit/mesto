export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка получения карточек: ${res.status}`);
      })
      .then(result => {
       // console.log(result);

        const resul = result;


        return resul;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка получения информации о пользователе: ${res.status}`);
      })
      .then((result) => {
        return result;

        // console.log(result);

        // const obj = {
        //   name: result.name,
        //   speciality: result.about
        // }

        // userInfo.setUserInfo(obj);

        // console.log(result.name);
        // console.log(result.about);
        // console.log(result.avatar);

        //document.querySelector('.profile__avatar').src = result.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка получения информации о пользователе: ${res.status}`);
      })
      .then((result) => {
        return result;

        // console.log(result);

        // const obj = {
        //   name: result.name,
        //   speciality: result.about
        // }

        // userInfo.setUserInfo(obj);

        // console.log(result.name);
        // console.log(result.about);
        // console.log(result.avatar);

        //document.querySelector('.profile__avatar').src = result.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка получения информации о пользователе: ${res.status}`);
      })
      .then((result) => {
        return result;

        // console.log(result);

        // const obj = {
        //   name: result.name,
        //   speciality: result.about
        // }

        // userInfo.setUserInfo(obj);

        // console.log(result.name);
        // console.log(result.about);
        // console.log(result.avatar);

        //document.querySelector('.profile__avatar').src = result.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}