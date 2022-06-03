import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(name, link, selectorPopup) {
    super(selectorPopup);
    this._linkImage = link;
    this._nameImage = name;
	}

  open() {
    this.popup = document.querySelector(this._selector);
    this.popup.querySelector('.popup__picture').src = this._linkImage;
    this.popup.querySelector('.popup__signature').alt = this._nameImage;
    this.popup.querySelector('.popup__signature').textContent = this._nameImage;
    super.open();
  }
  }
