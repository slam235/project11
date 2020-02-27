'use strict';

(function () {/* Переменные */
  const placesList = document.querySelector('.places-list');
  const popupClose = document.querySelector('.popup__close');
  const popupButton = document.querySelector('.popup__button');
  const popup = document.querySelector('.popup');
  const userInfoButton = document.querySelector('.user-info__button');
  const form = document.forms.new;
  const formUser = document.forms.newUser;
  const popupEdit = document.querySelector('.popup-edit');
  const editButton = document.querySelector('.button-edit');
  const editClose = document.querySelector('.popup-edit__close');
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  const saveButton = document.querySelector('.popup-edit__button');
  const popupPicture = document.querySelector('.popup-picture');
  const pictureClose = document.querySelector('.popup-picture__close');
  const Image = document.querySelector('.image');
  const errorName = document.querySelector('.popup-edit__error_name');
  const errorAbout = document.querySelector('.popup-edit__error_about');
  const user = formUser.elements.nameUser;
  const about = formUser.elements.aboutUser;

  const countLike = document.querySelector('.place-card__count-like');



  const card = new Card(placesList, popupPicture, Image);
  const placeslist = new CardList(placesList, card); //добавил card вторым аргументом и получил доступ к методам класса Card
  const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort7',
    headers: {
      authorization: '2e7ad386-bc9f-4fcc-9e0a-4fb577a7c3d0',
      'Content-Type': 'application/json'
    }
  });
  api.getUserInfo()
    .then((data) => {
      console.log(data);
      userinfo.setUserInfo(data.name, data.about);
      userinfo.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });

  api.getCards()
    .then((cards) => {
      console.log(cards)
      for (let i = 0; i < cards.length; i++) {
        placeslist.addCard(cards[i].name, cards[i].link, cards[i].likes.length, cards[i]._id)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  

  



  const editFormValid = new FormValidator(formUser, saveButton, errorName, errorAbout, user, about);
  editFormValid.setEventListeners();
  const userinfo = new UserInfo(user.value, about.value, userInfoName, userInfoJob);
  formUser.addEventListener('submit', function (event) {
    event.preventDefault();

    /*
       Надо исправить: все изменения на странице должны происходить, только после того, как
       сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
       данные на странице сохраняться, то это может ввести пользователя в заблуждение.
    
       Поэтому сохранение данных пользователя на странице и закрытие попапа нужно делать только
       после ответа сервера
  
      -------------------------------------------
      Код который должен выполнится после ответа сервера:
        userinfo.setUserInfo(user.value, about.value);
        userinfo.updateUserInfo();
        popupEdit.classList.remove('popup_is-opened');
      должен располагаться в блоке then т.к.  при вызове api.editUserInfo
      выполнение не приостанавливается до того момента как сервер ответит, а 
      запрос на сервер отправляется и код продолжает выполняться дальше, а когда сервер ответит
      будет выполнен код блоке then
    */
    api.editUserInfo(user.value, about.value)
      .then(() => {
        userinfo.setUserInfo(user.value, about.value)
        userinfo.updateUserInfo()
        popupEdit.classList.remove('popup_is-opened')
      })
      .catch((err) => {
        console.log(err);
      });
    //document.forms.newUser.reset();

    editFormValid.setSubmitButtonState();


  })


  card.setEventListeners();


  //placeslist.render(initialCards); 
  const places = new Popup(popup, userInfoButton, popupClose);
  const edit = new Popup(popupEdit, editButton, editClose, user, about, userInfoName, userInfoJob);
  const picture = new Popup(popupPicture, Image, pictureClose);


  const userPlace = document.querySelector('.popup__input_type_link-url');
  const errorNamePlace = document.querySelector('.popup__error_name');
  const errorLink = document.querySelector('.popup__error_link');
  const namePlace = form.elements.name;
  const link = form.elements.link;
  // Обработчик события input формы добавить новое место
  function inputHandlerPlace() {
    const name = event.currentTarget.elements.name;
    const link = event.currentTarget.elements.link;

    if (name.value.length === 0 || link.value.length === 0) {
      popupButton.setAttribute('disabled', true);
      popupButton.classList.add('popup__button_disabled')
    } else {
      popupButton.removeAttribute('disabled');
      popupButton.classList.remove('popup__button_disabled')
    }
    checkInputValidityPlace();
  }

  function checkInputValidityPlace() {

    if (link.validity.valueMissing) {

      errorLink.textContent = 'Это обязательное';
      return;

    } if (link.validity.tooShort || link.validity.tooLong) {
      errorLink.textContent = 'Должно быть от 2 до 30 символов';
      return;

    }
    if (link.validity.typeMismatch) {
      errorLink.textContent = "Здесь должна быть ссылка";
      return;
    } else {
      errorLink.textContent = '';
    }
  }
  
  /* Слушатели событий */

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    api.sendCard(form.elements.name.value, form.elements.link.value)
      .then(() => {
        placeslist.addCard(form.elements.name.value, form.elements.link.value)
        form.reset();
        popup.classList.remove('popup_is-opened');
      })
      .catch((err) => {
        console.log(err);
      })

    inputHandlerPlace();
  });

  form.addEventListener('input', inputHandlerPlace); // обработчик ввода данных в форму новое место

}());


/*
  Ревью по проектной работе 9:

  Отлично, что данные с сервера загружаются и отправляются, но к организации кода есть ряд замечаний:

  Надо исправить:
  - класс Api не должен сам изменять страницу, только возвращать данные. Нужно вынести работу со страницей
    из класса Api и разместить обработку полученных данных (отрисовку карточек, данных пользователя и обновление данных пользователя)
    там где методы класса Api вызываются. Как это сделать показал на примере метода getCards
  - все изменения на странице должны происходить, только после того, как
    сервер ответил подтверждением. Поэтому сохранение данных пользователя на странице нужно делать только после ответа сервера
  - не везде корректно выполнена проверка, что запрос выполнился успешно (res.ok), если запрос выполнился неудачно
    должен возвращаться отклоненный промис
  - не хватает обработки ошибок на случай если запрос на сервер выполнился неудачно,
    обработчик ошибок - блок catch должен быть в конце цепочки обработки промиса. Сейчас достаточно вывести ошибку
    в консоль, но на реальном проекте лучше всетаки сообщить об этом пользователю
    Пример обработки ошибок есть в конце задания к работе
  - при открытии попапа редактирования профиля в поля формы должны подставлять текущие данные пользователя ранее загруженные с сервера,
    сейчас всегда поля пустые, независимо от того, что пришло с сервера и отображено на странице
  - когда код расположен в разных файлах, его нужно
	  заключать в модули, т.к. если файлов будет много, то в разных
  	файлах могут появится функции или переменные с одинаковыми именами,
	  они будут переопределять друг друга. Модуль должен предоставлять
	  наружу только минимально необходимый api
	  Для создании модулей можно воспользоваться IIFE, подробнее:
	  https://learn.javascript.ru/closures-module
    https://habr.com/ru/company/ruvds/blog/419997/
    Нужно обернуть в IIFE как минимум содержимое файла script.js


*/


/*
  Большая часть замечаний исправлена, но остались ещё места которые необходимо исправить:
  - данные пользователя все ещё сохраняются на странице до ответа сервера, нужно разместить код сохранения данных в блоке then
  - при сохранении данных пользователя падает ошибка
  Uncaught TypeError: Cannot read property 'length' of undefined
    at UserInfo.setSubmitButtonState (FormValidator.js:25)
  - при открытии попапа редактирования профиля в поля формы должны подставлять текущие данные пользователя ранее загруженные с сервера,
    сейчас всегда поля пустые, независимо от того, что пришло с сервера и отображено на странице

*/
