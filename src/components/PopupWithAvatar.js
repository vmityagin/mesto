import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
  constructor({selectorPopup, callbackSubmitForm}) {
    super(selectorPopup);
    this.callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
	}

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', () => {
      this.callbackSubmitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
