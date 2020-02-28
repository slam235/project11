
export default class UserInfo {
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
