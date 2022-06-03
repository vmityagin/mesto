import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import { Section } from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import dagestan from '../images/elements__image_dagestan.jpg';
import sochi from '../images/elements__image_sochi.jpg';
import uspenMonastir from '../images/elements__image_uspenskii-monastir.jpg';
import moscow from '../images/elements__image_moscow.jpg';
import shiryaevo from '../images/elements__image_shiryaevo.jpg';
import cherkesiya from '../images/elements__image_karachaeva-cherkesiya.jpg';

import {
  domCardContainer,
  changeProfileIcon,
  addNewCardButton,
  inputNameForm,
  inputCareerForm

} from './utils/constants.js';

import '../page/index.css';



const initialCards = [
  {
    name: 'Дагестан',
    link: dagestan
  },
  {
    name: 'Сочи',
    link: sochi
  },
  {
    name: 'Успенский монастырь',
    link: uspenMonastir
  },
  {
    name: 'Москва',
    link: moscow
  },
  {
    name: 'Самара',
    link: shiryaevo
  },
  {
    name: 'Карачаево-Черкесия',
    link: cherkesiya
  },
];

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

function createCardsMethod(data) {
  const cardsList = new Section({
    data: data,
    renderer: (item) => {
      const newCardContainer = new Card(item, '.template__six-boxes');

      const newCardElement = newCardContainer.generateElement();

      cardsList.addItem(newCardElement);
    }
  },
  domCardContainer
  );

  cardsList.renderItems();
}

createCardsMethod(initialCards);

const formNewCard = new PopupWithForm({
  selectorPopup: '.popup_type_new-card',
  callbackSubmitForm: (formData) => {
    createCardsMethod([formData]);
  }
});

formNewCard.setEventListener();

addNewCardButton.addEventListener('click', () => {
  formValidators['profile-card'].resetValidation();
  formNewCard.open();
})

const formProfileUser = new PopupWithForm({
  selectorPopup: '.popup_type_edit',
  callbackSubmitForm: () => {
    const objectNewInformation = new UserInfo({
      selectorName: '.form__input_type_name',
      selectorCareer: '.form__input_type_career',
    })
    objectNewInformation.setUserInfo();
  }
});

formProfileUser.setEventListener();

changeProfileIcon.addEventListener('click', () => {
  formValidators['profile-edit'].resetValidation();
  const userObject = new UserInfo({
    selectorName: '.profile__name',
    selectorCareer: '.profile__career'
  })
  const userDomObject = userObject.getUserInfo();
  inputNameForm.value = userDomObject.name;
  inputCareerForm.value = userDomObject.career;

  formProfileUser.open();
})
