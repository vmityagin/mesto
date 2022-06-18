import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from './Api.js';

import {
  domCardContainer,
  changeProfileIcon,
  addNewCardButton,
  inputNameForm,
  inputCareerForm,
  nameUserDom,
  careerUserDom,
  avatarUserDom,
  changeAvatarPicture
} from '../utils/constants.js';

import './index.css';

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

/* const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
domCardContainer
);

cardsList.renderItems(); */

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListener();

const popupConfirm = new PopupWithConfirm('.popup_type_confirm', (idCardClass) => {
  api.deleteCard('https://mesto.nomoreparties.co/v1/cohort-43/cards/', `${idCardClass}`);
});

function createCard(item) {
  const newCardContainer = new Card(item, '.template__six-boxes', () => {
    popupImage.open(item);
  }, (idCard) => {
    popupConfirm.open();
    popupConfirm.setEventListener(idCard);
  },
  (data) => {
    api.likePut('https://mesto.nomoreparties.co/v1/cohort-43/cards/', `${data._id}`)
    .then((res) => {
      newCardContainer.changeNumberLikes(res);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  (data) => {
    api.likeDelete('https://mesto.nomoreparties.co/v1/cohort-43/cards/', `${data._id}`)
    .then((res) => {
      newCardContainer.changeNumberLikes(res);
    })
    .catch((err) => {
      console.log(err);
    })
  });
  const newCardElement = newCardContainer.generateElement();
  return newCardElement;
}

const formNewCard = new PopupWithForm({
  selectorPopup: '.popup_type_new-card',
  callbackSubmitForm: (formdata) => {
    renderLoading(formNewCard, true, 'Создаю...');
    api.addNewCard('https://mesto.nomoreparties.co/v1/cohort-43/cards', formdata)
    .then((res) => {
      const createCardList = new Section({
        data: res,
        renderer: (item) => {
          cardsList.addItem(createCard(item));
        },
        domCardContainer
      });
      createCardList.addItem(createCard(res));
    })
    .catch((err) => {console.log(err);})
    .finally(() => {renderLoading(formNewCard, true, 'Создать')})
  }

});

formNewCard.setEventListener();

const formNewAvatar = new PopupWithAvatar({
  selectorPopup: '.popup_type_avatar',
  callbackSubmitForm: (formdata) => {
    renderLoading(formNewAvatar, true, 'Сохраняю...');
    api.changeAvatarPicture('https://mesto.nomoreparties.co/v1/cohort-43/users/me/avatar', formdata.link)
    .then((res) => {
      avatarUserDom.src = res.avatar;
    })
    .catch((err) => {console.log(err);})
    .finally(() => {renderLoading(formNewAvatar, true, 'Сохранить')});
  }
  }
)

formNewAvatar.setEventListener();

const classUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorCareer: '.profile__career',
})

addNewCardButton.addEventListener('click', () => {
  formValidators['profile-card'].resetValidation();
  formNewCard.open();
})

changeAvatarPicture.addEventListener('click', () => {
  formValidators['profile-avatar'].resetValidation();
  formNewAvatar.open();
})

const formProfileUser = new PopupWithForm({
  selectorPopup: '.popup_type_edit',
  callbackSubmitForm: (item) => {
    renderLoading(formProfileUser, true, 'Сохраняю...');
    api.changeProfile('https://mesto.nomoreparties.co/v1/cohort-43/users/me', item)
    .then(() => {
      changeUserInfoFromServer();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(formProfileUser, true, 'Сохранить');
    });

  }
});

formProfileUser.setEventListener();

function renderLoading(classSelector, isLoading, textButtonLoad) {
  if (isLoading) {
    classSelector._form.querySelector('.form__submit').textContent = textButtonLoad;
  } else {
    classSelector._form.querySelector('.form__submit').textContent = textButtonLoad;
  }
};

changeProfileIcon.addEventListener('click', () => {
  formValidators['profile-edit'].resetValidation();
  const domUserInformationContainer = classUserInfo.getUserInfo();
  inputNameForm.value = domUserInformationContainer.name;
  inputCareerForm.value = domUserInformationContainer.career;
  formProfileUser.open();
})

const api = new Api();

function changeUserInfoFromServer() {
  api.getInfromationUser('https://mesto.nomoreparties.co/v1/cohort-43/users/me')
    .then((result) => {
      nameUserDom.textContent = result.name;
      careerUserDom.textContent = result.about;
      avatarUserDom.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
}

changeUserInfoFromServer();

api.loadCardImages('https://mesto.nomoreparties.co/v1/cohort-43/cards')
.then((result) => {
 console.log(result);
 const cardsList = new Section({
  data: result,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
domCardContainer
);
cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
})
