const changeProfileIcon = document.querySelector ('.profile__edit-button');
const EditorProfile = document.querySelector ('.popup');
const IconClosePopup = document.querySelector ('.form__button_type_cross');
const ProfileNameText = document.querySelector ('.profile__name');
const ProfileCareerText = document.querySelector ('.profile__career');
const ProfileNameInput = document.querySelector ('.form__input_type_name');
const ProfileCareerInput = document.querySelector ('.form__input_type_career');

const listElements = document.querySelector ('.elements');
const templateSixBoxes = document.querySelector ('.template__six-boxes');
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

/* Добавляет карточку на страницу из массива initialCards c помощью функции getCard*/
function render() {
  const html = initialCards.map(getCard);
  listElements.append(...html);
}

/* Копирует из HTML темплейт и возвращает элемент li с содержимым + заполняет данными из массива */
function getCard(item) {
  const getTemplateSixBoxes = templateSixBoxes.content.cloneNode(true);

  const titleCard = getTemplateSixBoxes.querySelector('.element__title');
  titleCard.textContent = item.name;

  const ImageCard = getTemplateSixBoxes.querySelector('.element__image');
  ImageCard.src = item.link;

  return getTemplateSixBoxes;
}

render();

function toggleWindowPopup() {
  ProfileNameInput.value = ProfileNameText.textContent;
  ProfileCareerInput.value = ProfileCareerText.textContent;
  EditorProfile.classList.toggle('popup_active');
}

changeProfileIcon.addEventListener('click', toggleWindowPopup);
IconClosePopup.addEventListener('click', toggleWindowPopup);

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    toggleWindowPopup();
  }
}
EditorProfile.addEventListener('click', onOverlayClick);

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
    toggleWindowPopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
