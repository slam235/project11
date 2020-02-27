
class UserInfo {
    constructor(user, about, userInfoName, userInfoJob) {
        this.user = user;
        this.about = about;
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;

    }
    setUserInfo(newUser, newAbout) {
        this.user = newUser;
        this.about = newAbout;
    }
    updateUserInfo() {
        this.userInfoName.textContent = this.user;
        this.userInfoJob.textContent = this.about;
    }
}



/*
    Наследование класса отвечающего за отображение данных пользователя от
    класса отвечающего за валидацию формы немного нелогичным, лучше было передать экземпляр FormValidator
    в конструктор UserInfo если нужно было использовать методы FormValidator
*/
/*class UserInfo extends FormValidator {
    constructor(nameForm, saveButton, errorName, errorAbout, user, about, userInfoName, userInfoJob) {
        super(nameForm, saveButton, errorName, errorAbout, user, about);
        //this.user = user;
        //this.about = about;
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
    }
    setUserInfo(newUser, newAbout) {
        this.user = newUser;
        this.about = newAbout;
        //this.updateUserInfo();
    }
    updateUserInfo() {
        //api.editUserInfo(this.user, this.about);
        this.userInfoName.textContent = this.user;
        this.userInfoJob.textContent = this.about;


        //super.setSubmitButtonState();

    }
}
*/