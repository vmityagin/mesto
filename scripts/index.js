let popupEditor = document.querySelector ('.profile__edit-button');
let EditorProfile = document.querySelector ('.popup');
let IconClosePopup = document.querySelector ('.popup__icon-close');

function toggleWindowPopup() {
  EditorProfile.classList.toggle('popup_active');
}

popupEditor.addEventListener('click', toggleWindowPopup);
IconClosePopup.addEventListener('click', toggleWindowPopup);

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    toggleWindowPopup();
  }
}
EditorProfile.addEventListener('click', onOverlayClick);

// Находим форму в DOM
let formElement = document.querySelector ('.form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector ('.form__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector ('.form__career'); // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    let profileName = nameInput.value;
    let profileCareer = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value
    let profileNameStroke = document.querySelector('.profile__name');
    let profileCareerStroke = document.querySelector('.profile__career');
    // Выберите элементы, куда должны быть вставлены значения полей
    profileNameStroke.textContent = profileName;
    profileCareerStroke.textContent = profileCareer;
    // Вставьте новые значения с помощью textContent
    toggleWindowPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
