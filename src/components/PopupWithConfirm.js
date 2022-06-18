import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this.callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.form');
	}

  setEventListener(idCard) {
    super.setEventListener();
    this._form.addEventListener('submit', () => {
      this.callbackSubmitForm(idCard);
      this.close();
    });
  }
}
