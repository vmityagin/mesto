import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const changeProfileIcon = document.querySelector ('.profile__edit-button');
const addNewCardButton = document.querySelector ('.profile__add-button');

const popupEditProfile = document.querySelector ('.popup_type_edit');
const popupaddNewCard = document.querySelector ('.popup_type_new-card');

const popupTypeImage = document.querySelector('.popup_type_image');

const profileNameText = document.querySelector ('.profile__name');
const profileCareerText = document.querySelector ('.profile__career');
const profileNameInput = document.querySelector ('.form__input_type_name');
const profileCareerInput = document.querySelector ('.form__input_type_career');

const formElementEditProfile = popupEditProfile.querySelector ('.form');
const popupImageElementPicture = popupTypeImage.querySelector('.popup__picture');
const popupImageElementSignature = popupTypeImage.querySelector('.popup__signature');

const inputNameFormNewCard = document.querySelector('.form__input_type_title');
const inputLinkFormNewCard = document.querySelector('.form__input_type_link');
const formNewCard = popupaddNewCard.querySelector('.form');
const sectionDomElements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Дагестан',
    link: './images/elements__image_dagestan.jpg'
  },
  {
    name: 'Сочи',
    link: './images/elements__image_sochi.jpg'
  },
  {
    name: 'Успенский монастырь',
    link: './images/elements__image_uspenskii-monastir.jpg'
  },
  {
    name: 'Москва',
    link: './images/elements__image_moscow.jpg'
  },
  {
    name: 'Самара',
    link: './images/elements__image_shiryaevo.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/elements__image_karachaeva-cherkesiya.jpg'
  },
];

function handleCardClick(name, link) {
  popupImageElementPicture.src = link;
  popupImageElementPicture.alt = name;
  popupImageElementSignature.textContent = name;
  openWindowPopup(popupTypeImage);
};

function handleAddCard() {
  const valueInputName = inputNameFormNewCard.value;
  const valueInputLink = inputLinkFormNewCard.value;
  const arrayNewCardData = {name: valueInputName, link: valueInputLink};
  sectionDomElements.prepend(createCard(arrayNewCardData));
  closeWindowPopup(popupaddNewCard);
  formNewCard.reset();
}

function createCard(array) {
  const newCardContainer = new Card(array, '.template__six-boxes');
  const newCardElement = newCardContainer.generateElement();
  return newCardElement;
}

function openPropfilePopup() {
  profileNameInput.value = profileNameText.textContent;
  profileCareerInput.value = profileCareerText.textContent;
}

// Функция открывает попап
function openWindowPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', escapePopupClose);
}

// Функция скрывает попап
function closeWindowPopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', escapePopupClose);
}

function handleEditProfilePopup() {
  openPropfilePopup();
  openWindowPopup(popupEditProfile)
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
      closeWindowPopup(popup);
    }

    if (evt.target.classList.contains('button_type_cross')) {
      closeWindowPopup(popup);
    }
  });
});

// Находим поля формы в DOM
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit() {
  const profileNameForm = profileNameInput.value;
  const profileCareerForm = profileCareerInput.value;
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  profileNameText.textContent = profileNameForm;
  profileCareerText.textContent = profileCareerForm;
  // Вставьте новые значения с помощью textContent
  closeWindowPopup(popupEditProfile);
}

function escapePopupClose(evt) {
  if(evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_active');
    closeWindowPopup(popupOpened);
  }
}

formNewCard.addEventListener('submit', () => {
  handleAddCard();
  FormValidators['profile-card'].resesValidation();
});

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const FormValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');

    FormValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

initialCards.forEach((item) => {
  const card = new Card(item, '.template__six-boxes');
  const cardElement = card.generateElement();

  document.querySelector('.elements').prepend(cardElement);
})

// Прослушивание клика иконки "Добавить карточку"
addNewCardButton.addEventListener('click', () => {
  FormValidators['profile-card'].resesValidation();
  openWindowPopup(popupaddNewCard);
});

// Прослушивание клика иконки "Изменить профиль"
changeProfileIcon.addEventListener('click', () => {
  FormValidators['profile-edit'].resesValidation();
  handleEditProfilePopup();
});

export {handleCardClick};
