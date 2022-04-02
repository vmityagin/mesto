let changeProfileIcon = document.querySelector ('.profile__edit-button');
let EditorProfile = document.querySelector ('.popup');
let IconClosePopup = document.querySelector ('.form__сross');
let ProfileNameText = document.querySelector ('.profile__name');
let ProfileCareerText = document.querySelector ('.profile__career');
let ProfileNameInput = document.querySelector ('.form__input_name');
let ProfileCareerInput = document.querySelector ('.form__input_career');

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

let formElement = document.querySelector ('.form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector ('.form__input_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector ('.form__input_career'); // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.
    let profileNameForm = nameInput.value;
    let profileCareerForm = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value
    let profileNameStroke = document.querySelector('.profile__name');
    let profileCareerStroke = document.querySelector('.profile__career');
    // Выберите элементы, куда должны быть вставлены значения полей
    profileNameStroke.textContent = profileNameForm;
    profileCareerStroke.textContent = profileCareerForm;
    // Вставьте новые значения с помощью textContent
    toggleWindowPopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
