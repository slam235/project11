export default class PopupNewPlace {
    constructor(popupWindow, popupOpen, popupClose) {
        this.popupWindow = popupWindow;
        this.popupOpen = popupOpen;
        this.popupClose = popupClose;
        this.popupOpen.addEventListener('click', this.open.bind(this));
        this.popupClose.addEventListener('click', this.close.bind(this));
    }
    open() {
        this.popupWindow.classList.add('popup_is-opened');
    }
    close() {
        this.popupWindow.classList.remove('popup_is-opened');
    }
}