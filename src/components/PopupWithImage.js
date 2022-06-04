import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.elementPopupPicture = this._popup.querySelector('.popup__picture');
    this.elementPopupSignature = this._popup.querySelector('.popup__signature');
	}

  open(name, link) {
    this.nameImage = name;
    this.linkImage = link;
    this.elementPopupPicture.src = this.linkImage;
    this.elementPopupSignature.alt = this.nameImage;
    this.elementPopupSignature.textContent = this.nameImage;
    super.open();
  }
  }
