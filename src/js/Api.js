export default class Api {
    constructor(options) {
        this.options = options;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers
        })
            .then(this._getResponseData);
    }

    getCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers
        })
            .then(this._getResponseData);
    }

    editUserInfo(userName, aboutUser) {

        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: userName,
                about: aboutUser
            })
        })
            .then(this._getResponseData);
    }
    sendCard(namePlace, linkPlace) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: namePlace,
                link: linkPlace
            })
        })
            .then(this._getResponseData);
    }
    deleteCard(cardId){
        return fetch(`${this.options.baseUrl}/cards/` + cardId, {
            method:'DELETE',
            headers: this.options.headers,
        })
        .then(this._getResponseData);
    }
}
