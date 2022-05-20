import { handlPreviewPicture } from "./index.js";
export const initialCards = [
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

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return this._element = cardElement;
  }

  _setEventListener() {
    this._element.querySelector('.element__button').addEventListener('click', () =>{
      this._handleLikeActive();
    })
    this._element.querySelector('.element__trash-icon').addEventListener('click', () =>{
      this._removeCardElement();
    })
    this._element.querySelector('.element__image').addEventListener('click', () =>{
      handlPreviewPicture(this._name, this._link);
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.template__six-boxes');
  const cardElement = card.generateElement();

  document.querySelector('.elements').prepend(cardElement);
})
