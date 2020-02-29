
export default class Popup {
    constructor(popupWindow, popupOpen, popupClose, user, about, userInfoName, userInfoJob) {
      this.popupWindow = popupWindow;
      this.popupOpen = popupOpen;
      this.popupClose = popupClose;
      this.user = user;
      this.about = about;
      this.userInfoName = userInfoName;
      this.userInfoJob = userInfoJob;
      this.popupOpen.addEventListener('click', this.open.bind(this));
      this.popupClose.addEventListener('click', this.close.bind(this));
    }
    open() {
      this.popupWindow.classList.add('popup_is-opened');
      
        this.user.value = this.userInfoName.textContent //подставляет текущие значения впопап форму
        this.about.value = this.userInfoJob.textContent
      
    }
    close() {
      this.popupWindow.classList.remove('popup_is-opened');
    }
  }