import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.elementPopupPicture = this._popup.querySelector('.popup__picture');
    this.elementPopupSignature = this._popup.querySelector('.popup__signature');
	}

  open(item) {
    this.elementPopupPicture.src = item.linkCard;
    this.elementPopupSignature.alt = item.nameCard;
    this.elementPopupSignature.textContent = item.nameCard;
    super.open();
  }
  }
