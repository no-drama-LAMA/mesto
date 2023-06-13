class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  // Редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.about,
      })
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  // Обновление аватара пользователя
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  // Постановка и снятие лайка
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {return res.ok ? res.json() : Promise.reject})
  }
}

export default Api;
