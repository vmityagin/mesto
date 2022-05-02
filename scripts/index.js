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
const saveButtonCard = popupaddNewCard.querySelector('.form__button_type_save');

const profileNameText = document.querySelector ('.profile__name');
const profileCareerText = document.querySelector ('.profile__career');
const profileNameInput = document.querySelector ('.form__input_type_name');
const profileCareerInput = document.querySelector ('.form__input_type_career');

const cardsContainer = document.querySelector('.elements');
const templateSixBoxes = document.querySelector('.template__six-boxes');

const formElementEditProfile = popupEditProfile.querySelector ('.form');
const popupImageElementPicture = popupTypeImage.querySelector('.popup__picture');
const popupImageElementSignature = popupTypeImage.querySelector('.popup__signature');

const inputNameFormNewCard = document.querySelector('.form__input_type_title');
const inputLinkFormNewCard = document.querySelector('.form__input_type_link');
const formNewCard = popupaddNewCard.querySelector('.form');

// Добавляет карточку на страницу из массива initialCards c помощью функции getCard
function render(arrayCards) {
  const html = arrayCards.map(getCard);
  cardsContainer.prepend(...html);
}

// Копирует из HTML темплейт и возвращает элемент li с содержимым + заполняет данными из массива
function getCard(item) {
  const getTemplateSixBoxes = templateSixBoxes.content.cloneNode(true);

  const imageCard = getTemplateSixBoxes.querySelector('.element__image');
  const titleCard = getTemplateSixBoxes.querySelector('.element__title');
  const likeCard = getTemplateSixBoxes.querySelector('.element__button');
  const trashCard = getTemplateSixBoxes.querySelector('.element__trash-icon');
  titleCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  imageCard.addEventListener('click', () => handlPreviewPicture(item));
  likeCard.addEventListener('click', handlerLikeActive);
  trashCard.addEventListener('click', removeCardElement);

  return getTemplateSixBoxes;
};

const handlPreviewPicture = (data) => {
  popupImageElementPicture.src = data.link;
  popupImageElementPicture.alt = data.name;
  popupImageElementSignature.textContent = data.name;
  openWindowPopup(popupTypeImage);
};

function handleAddCard() {
  const valueInputName = inputNameFormNewCard.value;
  const valueInputLink = inputLinkFormNewCard.value;
  const arrayNewCardData = [{name: valueInputName, link: valueInputLink}];
  render(arrayNewCardData);
  closeWindowPopup(popupaddNewCard);
  formNewCard.reset();
  const buttonSubmit = formNewCard.querySelector('.form__button');
  buttonSubmit.classList.add('form__submit_inactive');
  buttonSubmit.disabled = true;
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

// Прослушивание клика иконки "Изменить профиль"
changeProfileIcon.addEventListener('click', handleEditProfilePopup);
// Прослушивание клика иконки "Крестик-Закрыть профиль"
iconCrossClosePopupEdit.addEventListener('click', () => {closeWindowPopup(popupEditProfile)});

// Прослушивание клика иконки "Добавить карточку"
addNewCardButton.addEventListener('click', () => {openWindowPopup(popupaddNewCard)});
// Прослушивание клика иконки "Крестик-Закрыть добавление карточки"
iconCrossClosePopupNewCard.addEventListener('click', () => {closeWindowPopup(popupaddNewCard)});

// Прослушивание клика по попапу, чтобы он не закрывался
popupEditProfile.addEventListener('click', onOverlayClick);
popupaddNewCard.addEventListener('click', onOverlayClick);
popupTypeImage.addEventListener('click', onOverlayClick);

// Функция, которая не позволяет закрываться попапу по клику в любой области,
// кроме крестика
function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeWindowPopup(event.target);
  }
}

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

function handlerLikeActive(e) {
  e.target.classList.toggle('element__button_active');
}

function removeCardElement(event) {
  const element = event.target.closest('.element');
  element.remove();
}

// Прослушивание клика иконки "Крестик-Закрыть Popup Image"
iconCrossClosePopupImage.addEventListener('click', () => {closeWindowPopup(popupTypeImage)});

function escapePopupClose(evt) {
  if(evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_active');
    closeWindowPopup(popupOpened);
  }
}

formNewCard.addEventListener('submit', handleAddCard);
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
