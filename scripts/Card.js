
export class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._cardImage = '.element_image';
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._cardImage = cardElement.querySelector('.element__image');
    return this._element = cardElement;
  }

  _setEventListener() {
    this._element.querySelector('.element__button').addEventListener('click', () =>{
      this._handleLikeActive();
    })
    this._element.querySelector('.element__trash-icon').addEventListener('click', () =>{
      this._removeCardElement();
    })
    this._cardImage.addEventListener('click', () =>{
      this._handleCardClick(this._name, this._link);
    })
  }

  _handleLikeActive() {
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
  }

  _removeCardElement() {
    this._element.remove();
  }

  generateElement() {
    this._element = this._getElement();
    this._setEventListener();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
