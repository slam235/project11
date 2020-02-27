const form = document.forms.new;
const submit = document.querySelector('.user-info__button');
const user = formUser.elements.nameUser;
user.addEventListener('input', handleValidate)

submit.addEventListener('click', sendForm);

function handleValidate(event) {
    resetElement(event.target); // так как в объекте евент содержится наш элемент, с которым происходит валидация, получаем к нему доступ через event.target 
    validate(event.target);
}

function isPasswordMatch(element) {
    if (element.id !== password.id && element.id !== passwordRepeat.id) {
        return true;
    }
    if (password.value === passwordRepeat.value) {
        resetError(password);
        resetError(passwordRepeat);
        return true;
    }
    return false;
}

function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`) //элемент ошики например поле id='username' c id='error-username'

    if (!element.checkValidity()) { //у каждого объекта поля ввода - есть специальный метод checkValidity(),  проверяет на валидность по атрибутам, которые мы изначально в разметку указываем если у поля есть условия required(обязательность ввода)
        console.log(element.validationMessage); //в свойстве объекта элемент - будет сообщение об ошибке https://htmlweb.ru/html/form/form_input_validate.php
        errorElement.textContent = element.validationMessage;
        activateError(errorElement);
        return false;
    } else if (isPasswordMatch(element)) {
        const errorMessage = 'Пароли должны совпадать!';
        errorElement.textContent = errorMessage;
        activateError(element);
        return false;
    }
    return true;

}

function sendForm(event) {
    event.preventDefault();

    const inputs = Array.from(form.elements);   //массив элементов полей ввода, form.elements - все инпуты в форме Они там хранятся не в форме массива - поэтому переводим их в массив array.from
    let isValidForm = true; //создатим переменную, которая по умолчанию true, так называемый флажок
    inputs.forEach((elem) => { //проитерируем элемент, пройдемся по каждому элементу
        if (elem.id !== submit.id) { //если элемент не равен кнопки - потому что туда мы ничего не вводим
            if (!validate(elem)) isValidForm = false; // validate, некая функция, которая принимает элемент формы, eсли у нас хоть один элемент не валиден, то мы выставляем флажок false;
        }
    });
    if (isValidForm) {
        console.log('Success!'); // если все тру - значит все прошло - все отлично
    } else {
        console.log('form is not validate =(')
    }
}

function activateError(element) { //присваивает родительскому элементу класс
    element.parentNode.classList.add('input-container__invalid');
}
function resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
}