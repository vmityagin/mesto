import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import dagestan from '../../images/elements__image_dagestan.jpg';
import sochi from '../../images/elements__image_sochi.jpg';
import uspenMonastir from '../../images/elements__image_uspenskii-monastir.jpg';
import moscow from '../../images/elements__image_moscow.jpg';
import shiryaevo from '../../images/elements__image_shiryaevo.jpg';
import cherkesiya from '../../images/elements__image_karachaeva-cherkesiya.jpg';

import {
  domCardContainer,
  changeProfileIcon,
  addNewCardButton,
  inputNameForm,
  inputCareerForm
} from '../utils/constants.js';

import './index.css';

const initialCards = [
  {
    titleCard: 'Дагестан',
    linkCard: dagestan
  },
  {
    titleCard: 'Сочи',
    linkCard: sochi
  },
  {
    titleCard: 'Успенский монастырь',
    linkCard: uspenMonastir
  },
  {
    titleCard: 'Москва',
    linkCard: moscow
  },
  {
    titleCard: 'Самара',
    linkCard: shiryaevo
  },
  {
    titleCard: 'Карачаево-Черкесия',
    linkCard: cherkesiya
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

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
domCardContainer
);

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListener();

function createCard(item) {
  const newCardContainer = new Card(item, '.template__six-boxes', () => {
    popupImage.open(item);
  });
  const newCardElement = newCardContainer.generateElement();
  return newCardElement;
}

cardsList.renderItems();

const formNewCard = new PopupWithForm({
  selectorPopup: '.popup_type_new-card',
  callbackSubmitForm: (formData) => {
    cardsList.addItem(createCard(formData));
  }
});

formNewCard.setEventListener();

const classUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorCareer: '.profile__career',
})

addNewCardButton.addEventListener('click', () => {
  formValidators['profile-card'].resetValidation();
  formNewCard.open();
})

const formProfileUser = new PopupWithForm({
  selectorPopup: '.popup_type_edit',
  callbackSubmitForm: (item) => {
    classUserInfo.setUserInfo(item);
  }
});

formProfileUser.setEventListener();

changeProfileIcon.addEventListener('click', () => {
  formValidators['profile-edit'].resetValidation();
  const domUserInformationContainer = classUserInfo.getUserInfo();
  inputNameForm.value = domUserInformationContainer.name;
  inputCareerForm.value = domUserInformationContainer.career;
  formProfileUser.open();
})
