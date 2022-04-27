const changeProfileIcon = document.querySelector ('.profile__edit-button');
const addNewCardButton = document.querySelector ('.profile__add-button');

const popupEditProfile = document.querySelector ('.popup_type_edit');
const popupaddNewCard = document.querySelector ('.popup_type_new-card');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupBoxContainer = document.querySelector('.popup__box');

const iconCrossClosePopupEdit = popupEditProfile.querySelector('.form__button_type_cross');
const iconCrossClosePopupNewCard = popupaddNewCard.querySelector('.form__button_type_cross');
const iconCrossClosePopupImage = popupTypeImage.querySelector('.popup__button-cross');

const createButtonCard = popupaddNewCard.querySelector('.form__button_type_create');

const profileNameText = document.querySelector ('.profile__name');
const profileCareerText = document.querySelector ('.profile__career');
const profileNameInput = document.querySelector ('.form__input_type_name');
const profileCareerInput = document.querySelector ('.form__input_type_career');

const cardsContainer = document.querySelector('.elements');
const templateSixBoxes = document.querySelector('.template__six-boxes');

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
// Функция, которая сохраняет данные в попапе "Редактирование профиля
const formElementEditProfile = popupEditProfile.querySelector ('.form');// Воспользуйтесь методом querySelector()
const popupImageElementPicture = popupTypeImage.querySelector('.popup__picture');
const popupImageElementSignature = popupTypeImage.querySelector('.popup__signature');

const inputNameFormNewCard = document.querySelector('.form__input_type_title');
const inputLinkFormNewCard = document.querySelector('.form__input_type_link');
const formNewCard = popupaddNewCard.querySelector('.form');

// Добавляет карточку на страницу из массива initialCards c помощью функции getCard
function render(ArrayCards) {
  const html = ArrayCards.map(getCard);
  cardsContainer.prepend(...html);
}

// Копирует из HTML темплейт и возвращает элемент li с содержимым + заполняет данными из массива
function getCard(item) {
  const getTemplateSixBoxes = templateSixBoxes.content.cloneNode(true);

  const imageCard = getTemplateSixBoxes.querySelector('.element__image');
  const titleCard = getTemplateSixBoxes.querySelector('.element__title');
  titleCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  imageCard.addEventListener('click', () => handlPreviewPicture(item));
  cardsContainer.addEventListener('click', handlerLikeActive);
  cardsContainer.addEventListener('click', removeCardElement);

  return getTemplateSixBoxes;
};

const handlPreviewPicture = (data) => {
  popupImageElementPicture.src = data.link;
  popupImageElementPicture.alt = data.name;
  popupImageElementSignature.textContent = data.name;
  openWindowPopup(popupTypeImage);
};

render(initialCards);

function handleAddCard() {
  const valueInputName = inputNameFormNewCard.value;
  const valueInputLink = inputLinkFormNewCard.value;
  const arrayNewCardData = [{name: valueInputName, link: valueInputLink}];
  render(arrayNewCardData);
  closeWindowPopup(popupaddNewCard);
  formNewCard.reset();
}

function openPropfilePopup() {
  profileNameInput.value = profileNameText.textContent; //заполняем поля формы
  profileCareerInput.value = profileCareerText.textContent; //вызываем функцию для открытия попапа
}

// Функция открывает попап для редактирования поля
// и принимает значения карточки в input
function openWindowPopup(popup) {
  popup.classList.add('popup_active');
  enableValidation();
}

// Функция скрывает попап для редактирования поля
// и принимает значения карточки в input
function closeWindowPopup(popup) {
  popup.classList.remove('popup_active');
}

// Прослушивание клика иконки "Изменить профиль"
changeProfileIcon.addEventListener('click', () => {openPropfilePopup(); openWindowPopup(popupEditProfile)});
// Прослушивание клика иконки "Крестик-Закрыть профиль"
iconCrossClosePopupEdit.addEventListener('click', () => {closeWindowPopup(popupEditProfile)});

// Прослушивание клика иконки "Добавить карточку"
addNewCardButton.addEventListener('click', () => {openWindowPopup(popupaddNewCard)});
// Прослушивание клика иконки "Крестик-Закрыть добавление карточки"
iconCrossClosePopupNewCard.addEventListener('click', () => {closeWindowPopup(popupaddNewCard)});

// Прослушивание клика по попапу, чтобы он не закрывался
popupEditProfile.addEventListener('click', () => onOverlayClick(popupEditProfile, event));
popupaddNewCard.addEventListener('click',  () => onOverlayClick(popupaddNewCard, event));

// Функция, которая не позволяет закрываться попапу по клику в любой области,
// кроме крестика
function onOverlayClick(popupOverlay, event) {
  if (event.target === event.currentTarget) {
    closeWindowPopup(popupOverlay);
  }
}

// Находим поля формы в DOM
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler() {
  const profileNameForm = profileNameInput.value;
  const profileCareerForm = profileCareerInput.value;
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  profileNameText.textContent = profileNameForm;
  profileCareerText.textContent = profileCareerForm;
  // Вставьте новые значения с помощью textContent
  closeWindowPopup(popupEditProfile);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


function handlerLikeActive(e) {
  if (e.target.classList.contains('element__button')) {
    const element = e.target;
    element.classList.toggle('element__button_active');
  }
}

function removeCardElement(event) {
  if (event.target.classList.contains('element__trash-icon')) {
    const element = event.target.closest('.element');
    element.remove();
  }
}

// Прослушивание клика иконки "Крестик-Закрыть Popup Image"
iconCrossClosePopupImage.addEventListener('click', () => {closeWindowPopup(popupTypeImage)});
popupTypeImage.addEventListener('click',  () => onOverlayClick(popupTypeImage, event));


function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement,inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function isValid(formElement,inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement,inputElement);
  }
}

function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, buttonElement);
      isValid(formElement, inputElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add('form__submit_inactive');
    } else {
      buttonElement.classList.remove('form__submit_inactive');
    }
};

formElementEditProfile.addEventListener('submit', () => {
  enableValidation();
  if(formElementEditProfile.checkValidity()){
    formSubmitHandler();
  } else {
    enableValidation();
  }
});

formNewCard.addEventListener('submit', () => {
  enableValidation();
  if(formNewCard.checkValidity()){
    handleAddCard();
  } else {
    enableValidation();
  }
});


function keyEscapeClosePopup() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('keydown', function(evt) {
      if(evt.key === 'Escape'){
        closeWindowPopup(popupElement);
      }
    });
  });
}

keyEscapeClosePopup();

function escapePopupClose(popupElement) {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      closeWindowPopup(popupElement);
    }
  });
}

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement)=> escapePopupClose(popupElement));
