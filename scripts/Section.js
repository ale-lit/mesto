export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });

    // this._initialArray.forEach((item) => {
    //   const card = new Card(item, '#place');
    //   const cardElement = card.generateCard();
    //   this.setItem(cardElement);
    // });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
