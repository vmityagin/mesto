export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerHtml = document.querySelector(containerSelector);
  }

  renderItems(data, infoUser) {
    data.forEach(item => this._renderer(item, infoUser))
  }

  addItem(element) {
    this._containerHtml.prepend(element);
  }
}
