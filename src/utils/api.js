class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson)
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, { headers: this._headers })

  }

  editUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  putLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  }

  changeAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers:   {
    "Content-Type": "application/json",
    authorization: '9b21d05c-2df0-403f-90b6-aed7cbecb94d'
  }
})

export default api; 

