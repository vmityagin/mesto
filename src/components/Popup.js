export default class Popup {
  constructor(selectorPopup) {
    this._selector = selectorPopup;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_active');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
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

  renderLoading(textButtonLoad) {
    this._form.querySelector('.form__submit').textContent = textButtonLoad;
  }
  }
