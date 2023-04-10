export default class UserInfo {
    constructor({avatarSelector, nameSelector, aboutSelector}) {
        this.name = 'userInfo';
        this._avatarElement = document.querySelector(avatarSelector);
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    get userId() {
        return this._id;
    }

    getUserInfo() {
        return {name: this._nameElement.textContent, about: this._aboutElement.textContent, avatar: this._avatarElement.src};
    }

    setUserInfo({_id, cohort, name, about}) {
        this._id = _id;
        this._cohort = cohort;
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }

    setAvatar({avatar}) {
        this._avatarElement.src = avatar;
    }

}