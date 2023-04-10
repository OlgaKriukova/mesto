export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this.likeCard = this.likeCard.bind(this);
        this.delCard = this.delCard.bind(this);
    }
  
    getInitialCards() {
        return fetch(this._baseUrl+'/cards', {
            headers: {
              authorization: this._authorization
            }})
            .then(res => {
                console.log('getInitialCards - then - '+res.ok);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    addCard({name, link}) {
        return fetch(this._baseUrl+'/cards', {
                     method: 'POST',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({name: name, link: link})
               })
            .then(res => {
                console.log('addCard - then - '+res.ok);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }); 
    }

    delCard(cardId) {
        console.log(this._baseUrl+'/cards/'+cardId);
        return fetch(this._baseUrl+'/cards/'+cardId, {
                     method: 'DELETE',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     }
               })
            .then(res => {
                console.log('delCard - then - '+res.ok);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }); 
    }

    likeCard(cardId, active) {
        let method;
        if (active) {method = 'PUT';}
        else {method = 'DELETE';} 

        return fetch(this._baseUrl+'/cards/'+cardId+'/likes', {
            method: method,
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            }})
        .then(res => {
            console.log('likeCard - then - '+res.ok);
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }); 
    }

    getUserInfo() {
        return fetch(this._baseUrl+'/users/me', {
            headers: {
              authorization: this._authorization
            }})
            .then(res => {
                console.log('getUserInfo - then - '+res.ok);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    setUserInfo({name, about}) {
        return fetch(this._baseUrl+'/users/me', {
                     method: 'PATCH',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({name: name, about: about})
               })
            .then(res => {
                console.log('setUserInfo - then - '+res.ok);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }); 
    }

    setUserAvatar({avatar}) {
        return fetch(this._baseUrl+'/users/me/avatar', {
                     method: 'PATCH',
                     headers: {
                     authorization: this._authorization,
                     'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({avatar: avatar})
               })
            .then(res => {
                console.log('setUserAvatar - then - '+res.ok);
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }); 
    }
}
