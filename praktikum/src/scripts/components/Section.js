// Создайте класс Section, который отвечает за отрисовку элементов на странице
class Section {
  // Первым параметром конструктора принимает объект с двумя свойствами: items и renderer
  constructor({ items, renderer }, selector) {
    //
    this._container = document.querySelector(selector);
    // массив данных, которые нужно добавить на страницу при инициализации класса
    this._initialCards = items;
    // функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
  }

  // публичный метод, который отвечает за отрисовку всех элементов
  addElement() {
    this._initialCards.forEach((element) => {
      this.addItem(element);
    });
  }

  // публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

}

export default Section;
