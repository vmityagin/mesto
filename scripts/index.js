const changeProfileIcon = document.querySelector ('.profile__edit-button');
const addNewCardButton = document.querySelector ('.profile__add-button');

const PopupEditorProfile = document.querySelector ('.popup_type_edit');
const PopupaddNewCard = document.querySelector ('.popup_type_new-card');

const IconCrossClosePopupEdit = PopupEditorProfile.querySelector ('.form__button_type_cross');
const IconCrossClosePopupNewCard = PopupaddNewCard.querySelector ('.form__button_type_cross');
const CreateButtonCard = PopupaddNewCard.querySelector('.form__button_type_create');

const ProfileNameText = document.querySelector ('.profile__name');
const ProfileCareerText = document.querySelector ('.profile__career');
const ProfileNameInput = document.querySelector ('.form__input_type_name');
const ProfileCareerInput = document.querySelector ('.form__input_type_career');

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


const listElements = document.querySelector ('.elements');
const templateSixBoxes = document.querySelector ('.template__six-boxes');
// Добавляет карточку на страницу из массива initialCards c помощью функции getCard
function render(ArrayCards) {
  const html = ArrayCards.map(getCard);
  listElements.prepend(...html);
}

// Копирует из HTML темплейт и возвращает элемент li с содержимым + заполняет данными из массива
function getCard(item) {
  const getTemplateSixBoxes = templateSixBoxes.content.cloneNode(true);

  const titleCard = getTemplateSixBoxes.querySelector('.element__title');
  titleCard.textContent = item.name;

  const ImageCard = getTemplateSixBoxes.querySelector('.element__image');
  ImageCard.src = item.link;

  return getTemplateSixBoxes;
}

render(initialCards);

function handleAddCard (evt) {
  evt.preventDefault();
  let inputNameCard = document.querySelector('.form__input_type_title').value;
  let inputLinkCard = document.querySelector('.form__input_type_link').value;
  const arrayNewCardData = [{name: inputNameCard, link: inputLinkCard}];
  render(arrayNewCardData);
  closeWindowPopup(PopupaddNewCard);
  document.querySelector('.form__input_type_title').value = "";
  document.querySelector('.form__input_type_link').value = "";
}

CreateButtonCard.addEventListener('click', handleAddCard);

// Функция открывает попап для редактирования поля
// и принимает значения карточки в input
function OpenWindowPopup(popup) {
  ProfileNameInput.value = ProfileNameText.textContent;
  ProfileCareerInput.value = ProfileCareerText.textContent;
  popup.classList.add('popup_active');
}

// Функция скрывает попап для редактирования поля
// и принимает значения карточки в input
function closeWindowPopup(popup) {
  popup.classList.remove('popup_active');
}

// Прослушивание клика иконки "Изменить профиль"
changeProfileIcon.addEventListener('click', () => {OpenWindowPopup(PopupEditorProfile)});
// Прослушивание клика иконки "Крестик-Закрыть профиль"
IconCrossClosePopupEdit.addEventListener('click', () => {closeWindowPopup(PopupEditorProfile)});

// Прослушивание клика иконки "Добавить карточку"
addNewCardButton.addEventListener('click', () => {OpenWindowPopup(PopupaddNewCard)});
// Прослушивание клика иконки "Крестик-Закрыть добавление карточки"
IconCrossClosePopupNewCard.addEventListener('click', () => {closeWindowPopup(PopupaddNewCard)});

// Прослушивание клика по попапу, чтобы он не закрывался
PopupEditorProfile.addEventListener('click', () => onOverlayClick(PopupEditorProfile, event));
PopupaddNewCard.addEventListener('click',  () => onOverlayClick(PopupaddNewCard, event));

// Функция, которая не позволяет закрываться попапу по клику в любой области,
// кроме крестика
function onOverlayClick(popupOverlay, event) {
  if (event.target === event.currentTarget) {
    closeWindowPopup(popupOverlay);
  }
}

// Функция, которая сохраняет данные в попапе "Редактирование профиля
const formElement = document.querySelector ('.form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector ('.form__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector ('.form__input_type_career'); // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.
    const profileNameForm = nameInput.value;
    const profileCareerForm = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value
    const profileNameStroke = document.querySelector('.profile__name');
    const profileCareerStroke = document.querySelector('.profile__career');
    // Выберите элементы, куда должны быть вставлены значения полей
    profileNameStroke.textContent = profileNameForm;
    profileCareerStroke.textContent = profileCareerForm;
    // Вставьте новые значения с помощью textContent
    closeWindowPopup(PopupEditorProfile);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

function HandlerLikeActive(e) {
  if (e.target.classList.contains('element__button')) {
    const Element = e.target;
    Element.classList.toggle('element__button_active');
  }
}
listElements.addEventListener('click', HandlerLikeActive);
