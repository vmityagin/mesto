import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.elementPopupPicture = this._popup.querySelector('.popup__picture');
    this.elementPopupSignature = this._popup.querySelector('.popup__signature');
	}

  open(item) {
    this.elementPopupPicture.src = item.link;
    this.elementPopupSignature.alt = item.name;
    this.elementPopupSignature.textContent = item.name;
    super.open();
  }
  }
