'use strict';
import '../pages/index.css';

import Api from './api';
import Card from './Card';
import CardList from './CardList';
import FormValidator from './FormValidator';
import Popup from './Popup';
import UserInfo from './UserInfo';

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
    baseUrl: 'https://praktikum.tk/cohort7',
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
    api.editUserInfo(user.value, about.value)
      .then(() => {
        userinfo.setUserInfo(user.value, about.value)
        userinfo.updateUserInfo()
        popupEdit.classList.remove('popup_is-opened')
      })
      .catch((err) => {
        console.log(err);
      });
    

    editFormValid.setSubmitButtonState();


  })


  card.setEventListeners();


  
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



