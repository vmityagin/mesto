export class Card {
  constructor(data, selector, rendererPopupImage, renderPopupConfirm, handlerLikeActive, handlerLikeNotActive) {
    this.data = data;
    this._name = this.data.name;
    this._link = this.data.link;
    this._ownerId = this.data.owner._id;
    this._cardId = this.data._id;
    this._selector = selector;
    this.rendererPopupImage = rendererPopupImage;
    this.renderPopupConfirm = renderPopupConfirm;
    this.handlerLikeActive = handlerLikeActive;
    this.handlerLikeNotActive = handlerLikeNotActive;
  }

  generateElement() {
    this._element = this._getElement();
    this._setEventListener();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this.changeNumberLikes(this.data);
    return this._element;
  }

  changeNumberLikes(arrayLikes) {
    this._element.querySelector('.element__count').textContent = arrayLikes.likes.length;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._cardImage = cardElement.querySelector('.element__image');

    this._element = cardElement;
    return this._element;
  }

  getStatusIdUser(booleanStatus) {
    this._booleanStatus = booleanStatus;
  }

  _setEventListener() {
    this._button = this._element.querySelector('.element__button');
    this._trashButton = this._element.querySelector('.element__trash-icon');
    if (this._booleanStatus) {
      this._trashButton.classList.add('element__trash-icon_active');
    }

    this._button.addEventListener('click', () =>{
      if (!this._button.classList.contains('element__button_active')) {
        this.handlerLikeActive(this.data);
      } else {
        this.handlerLikeNotActive(this.data);
      }
    })
    this._trashButton.addEventListener('click', () =>{
      this.renderPopupConfirm(this._cardId, this._element);
    })

    this._cardImage.addEventListener('click', this.rendererPopupImage);
  }

  toggleButtonLike() {
    this._button.classList.toggle('element__button_active');
  }

}
