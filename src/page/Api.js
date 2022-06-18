export class Api {
  constructor() {
    this.headersRequest = {
      authorization: 'b34abb99-bb9c-49f0-b4ee-93cb66614104',
      'Content-Type': 'application/json'
    };
    }

    getInfromationUser(serverlink) {
      this.link = serverlink;
      return fetch(this.link, {
        method: 'GET',
        headers: this.headersRequest
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    loadCardImages(serverlink) {
      this.link = serverlink;
      return fetch(this.link, {
        method: 'GET',
        headers: this.headersRequest
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    changeProfile(serverlink, array) {
      this.link = serverlink;
      return fetch(this.link, {
        method: 'PATCH',
        headers: this.headersRequest,
        body: JSON.stringify({
          name : `${array.firstname}`,
          about : `${array.career}`
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    addNewCard(serverlink, array) {
      this.link = serverlink;
      return fetch(this.link, {
        method: 'POST',
        headers: this.headersRequest,
        body: JSON.stringify({
          name : array.name,
          link : array.link
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    deleteCard(serverlink, idCard) {
      this.link = (`${serverlink}`+ `${idCard}`);
      return fetch(this.link, {
        method: 'DELETE',
        headers: this.headersRequest,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    likePut(serverlink, idCard) {
      this.link = (`${serverlink}`+ `${idCard}` + '/likes');
      return fetch(this.link, {
        method: 'PUT',
        headers: this.headersRequest,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    likeDelete(serverlink, idCard) {
      this.link = (`${serverlink}`+ `${idCard}` + '/likes');
      return fetch(this.link, {
        method: 'DELETE',
        headers: this.headersRequest,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }

    changeAvatarPicture(serverlink, linkPicture) {
      this.link = serverlink;
      return fetch(this.link, {
        method: 'PATCH',
        headers: this.headersRequest,
        body: JSON.stringify({
          avatar : linkPicture
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Возникла ошибка при отправке запроса на сервер: ${res.status}`);
      })
    }
  }

