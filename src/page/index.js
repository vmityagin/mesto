import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {
  domCardContainer,
  changeProfileIcon,
  addNewCardButton,
  inputNameForm,
  inputCareerForm,
  changeAvatarPicture
} from '../utils/constants.js';

import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'b34abb99-bb9c-49f0-b4ee-93cb66614104'
  }
});

Promise.all([
  api.getInfromationUser(),
  api.loadCardImages()
])
.then(([info, initialCards]) => {
  classUserInfo.setUserInfo(info);
  const cardsList = new Section({
    renderer: (item) => {
      if (info._id === item.owner._id) {
        cardsList.addItem(createCard(item, true));
      } else {
        cardsList.addItem(createCard(item, false))
      }
    }
  },
  domCardContainer
  );
  cardsList.renderItems(initialCards);
})
.catch((err) => {
  console.log(err);
});

const classUserInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorCareer: '.profile__career',
  selectorAvatar: '.profile__avatar'
})

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


const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListener();

const popupConfirm = new PopupWithConfirm('.popup_type_confirm', (idCardClass) => {
  formValidators['confirm-form'].renderLoading('Удаляю...');
  api.deleteCard(idCardClass)
  .then(() => {
    popupConfirm.close();
    const element = popupConfirm.returnElement();
    element.remove();
  })
  .catch((err) => {console.log(err)})
  .finally(() => {formValidators['confirm-form'].renderLoading('Да');});
});

popupConfirm.setEventListener();

function createCard(item, checkUserId) {
  const newCardContainer = new Card(item, '.template__six-boxes', () => {
    popupImage.open(item);
  }, (idCard, elementCard) => {
    popupConfirm.open();
    popupConfirm.saveIdCard(idCard);
    popupConfirm.getElementCard(elementCard);
  },
  (data) => {
    api.likePut(data._id)
    .then((res) => {
      newCardContainer.changeNumberLikes(res);
      newCardContainer.toggleButtonLike();
    })
    .catch((err) => {
      console.log(err);
    })
  },
  (data) => {
    api.likeDelete(data._id)
    .then((res) => {
      newCardContainer.changeNumberLikes(res);
      newCardContainer.toggleButtonLike();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  );
  newCardContainer.getStatusIdUser(checkUserId);
  const newCardElement = newCardContainer.generateElement();
  return newCardElement;
}

const formNewCard = new PopupWithForm({
  selectorPopup: '.popup_type_new-card',
  callbackSubmitForm: (formdata) => {
    formValidators['profile-card'].renderLoading('Создаю...');
    api.addNewCard(formdata)
    .then((newCard) => {
      const cardsListDomContainer = new Section(()=>{},domCardContainer);
      cardsListDomContainer.addItem(createCard(newCard));
      formNewCard.close();
    })
    .catch((err) => {console.log(err);})
    .finally(() => {formValidators['profile-card'].renderLoading('Создать');})
  }

});

formNewCard.setEventListener();

const formNewAvatar = new PopupWithForm({
  selectorPopup: '.popup_type_avatar',
  callbackSubmitForm: (formdata) => {
    formValidators['profile-avatar'].renderLoading('Сохраняю...');
    api.changeAvatarPicture(formdata.link)
    .then((userInfo) => {
      classUserInfo.setUserInfo(userInfo);
      formNewAvatar.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {formValidators['profile-avatar'].renderLoading('Сохранить');});
  }
  }
)

formNewAvatar.setEventListener();

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
    formValidators['profile-edit'].renderLoading('Сохраняю...');
    api.changeProfile(item)
    .then((res) => {
      classUserInfo.setUserInfo(res);
      formProfileUser.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formValidators['profile-edit'].renderLoading('Сохранить');
    });

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
