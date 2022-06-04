export class Card {
  constructor(data, selector, rendererPopupImage) {
    this._name = data.titleCard;
    this._link = data.linkCard;
    this._selector = selector;
    this.rendererPopupImage = rendererPopupImage;
  }

  generateElement() {
    this._element = this._getElement();
    this._setEventListener();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
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
    this._button = this._element.querySelector('.element__button');
    this._trashButton = this._element.querySelector('.element__trash-icon');

    this._button.addEventListener('click', () =>{
      this._handleLikeActive();
    })
    this._trashButton.addEventListener('click', () =>{
      this._removeCardElement();
    })

    this._cardImage.addEventListener('click', this.rendererPopupImage);
  }

  _handleLikeActive() {
    this._button.classList.toggle('element__button_active');
  }

  _removeCardElement() {
    this._element.remove();
  }

}
