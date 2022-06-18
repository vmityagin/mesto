export class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._containerHtml = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._containerHtml.prepend(element);
  }
}