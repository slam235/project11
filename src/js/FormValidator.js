//Класс для валидации полей формы
export default class FormValidator {
    constructor(nameForm, saveButton, errorName, errorAbout, user, about) {
        this.nameForm = nameForm;
        this.saveButton = saveButton;
        this.errorName = errorName;
        this.errorAbout = errorAbout;
        this.user = user;
        this.about = about;
    }
    checkInputValidity(value, error) {
        if (value === 0) {

            error.textContent = 'Это обязательное поле';

        } else if (value === 1 || value > 30) {
            error.textContent = 'Должно быть от 2 до 30 символов';

        } else {
            error.textContent = '';
        }
    }
    setSubmitButtonState() {

        if (this.user.value.length < 2 || this.about.value.length < 2 || this.user.value.length > 30 || this.about.value.length > 30) {

            this.saveButton.setAttribute('disabled', true);
            this.saveButton.classList.add('popup__button_disabled')

        } else {
            this.saveButton.removeAttribute('disabled');
            this.saveButton.classList.remove('popup__button_disabled')

        }
        this.checkInputValidity(this.user.value.length, this.errorName);
        this.checkInputValidity(this.about.value.length, this.errorAbout);
    }
    setEventListeners() {
        this.nameForm.addEventListener('input', this.setSubmitButtonState.bind(this))
    }
}

// Валидация формы через массив инпутов
/*
class FormValidator {
    constructor(nameForm, saveButton, errorName, errorAbout, user, about) {
        this.nameForm = nameForm;
        this.saveButton = saveButton;
        this.errorName = errorName;
        this.errorAbout = errorAbout;
        this.user = user;
        this.about = about;
        
    }

    checkInputValidity(element) {
        const errorElement = document.querySelector(`#error-${element.id}`);

        this.resetError(errorElement);

        if (element.validity.valueMissing) {
            const errorMessage = "Это обязательное поле";
            errorElement.textContent = errorMessage;
            this.activateError(errorElement);
            return false;
        } if (element.validity.tooShort || element.validity.tooLong) {
            const errorMessage = "Должно быть от 2 до 30 символов";
            errorElement.textContent = errorMessage;
            this.activateError(errorElement);
            return false;
        } if (element.validity.typeMismatch) {
            const errorMessage = "Здесь должна быть ссылка";
            errorElement.textContent = errorMessage;
            this.activateError(errorElement);
            return false;
        } {
            return true;
        }
    }

    activateError(element) {
        element.parentNode.classList.add('input-container__invalid');
    }

    resetError(element) {
        element.parentNode.classList.remove('input-container__invalid');
        element.textContent = '';
    }

    inputEditHandler(inputs) {
        
        const popupEditButton = document.querySelector('.popup__edit_button');
        if (Array.from(inputs).every((input) => this.checkInputValidity(input))) {
            popupEditButton.removeAttribute('disabled');
            popupEditButton.classList.remove('popup__edit_button-disabled');
        } else {
            popupEditButton.setAttribute('disabled', true);
            popupEditButton.classList.add('popup__edit_button-disabled');
        }
    }

    setSubmitButtonState(inputs) {
        // event.preventDefault();

        const submit = document.querySelector('#submit');

        const isValidForm = Array.from(inputs).every((input) => this.checkInputValidity(input));

        [inputs].forEach(element => {

            if (element.type != submit.type) {
                if (!this.checkInputValidity(element)) isValidForm = false;
            }
        });

        if (isValidForm) {
        //   this.userInfo.updateUserInfo(username, aboutUser);
        api.editUserInfo(username.value, aboutUser.value);
          document.querySelector('.popup__edit').classList.remove('popup_is-opened');
        }
    }

    handleValidate(event) {
        this.checkInputValidity(event.target);
    }

}
*/