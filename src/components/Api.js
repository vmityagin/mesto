export class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
  }

    getInfromationUser() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me', {
      method: 'GET',
      headers: this.headers
      }).then((res) => {
          return this._getResponseData(res);
        })
    }

    loadCardImages() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
        method: 'GET',
        headers: this.headers
      }).then((res) => {
        return this._getResponseData(res);
      })
    }

    changeProfile(array) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name : `${array.firstname}`,
          about : `${array.career}`
        })
      }).then((res) => {
        return this._getResponseData(res);
      })
    }

    addNewCard(array) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name : array.name,
          link : array.link
        })
      }).then((res) => {
        return this._getResponseData(res);
      })
    }

    deleteCard(idCard) {
      this.link = ('https://mesto.nomoreparties.co/v1/cohort-43/cards/' + `${idCard}`);
      return fetch(this.link, {
        method: 'DELETE',
        headers: this.headers,
      }).then((res) => {
        return this._getResponseData(res);
      })
    }

    likePut(idCard) {
      this.link = ('https://mesto.nomoreparties.co/v1/cohort-43/cards/' + `${idCard}` + '/likes');
      return fetch(this.link, {
        method: 'PUT',
        headers: this.headers,
      }).then((res) => {
          return this._getResponseData(res);
        });
      }

    likeDelete(idCard) {
      this.link = ('https://mesto.nomoreparties.co/v1/cohort-43/cards/' + `${idCard}` + '/likes');
      return fetch(this.link, {
        method: 'DELETE',
        headers: this.headers,
      }).then((res) => {
        return this._getResponseData(res);
      })
    }

    changeAvatarPicture(linkPicture) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me/avatar', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar : linkPicture
        })
      }).then((res) => {
        return this._getResponseData(res);
      })
    }
  }

