import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this.callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.form');
	}

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', () => {
      this.callbackSubmitForm(this._idCard);
    });
  }

  saveIdCard(idCard) {
    return this._idCard = idCard;
  }

  setElementCard(element) {
    this._element = element;
  }

  returnElement() {
    return this._element;
  }

  renderLoading(textButtonLoad) {
    super.renderLoading(textButtonLoad);
  }
}
