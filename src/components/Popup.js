export default class Popup {
  constructor(selectorPopup) {
    this._selector = selectorPopup;
  }

  open() {
    this._popup = document.querySelector(this._selector);
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.add('popup_active');
  }

  close() {
    this._popup.classList.remove('popup_active');
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  setEventListener() {
    this._popup.addEventListener('mousedown', (evt) => {

      if (evt.target.classList.contains('popup_active')) {
        this.close();
      }

      if (evt.target.classList.contains('single__cross')) {
        this.close();
      }
    });
  }
  }
