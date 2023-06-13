// Создайте класс Section, который отвечает за отрисовку элементов на странице
class Section {
  // Первым параметром конструктора принимает объект с двумя свойствами: items и renderer
  constructor(renderer, selector) {
    //
    this._container = document.querySelector(selector);
    // функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
  }

  // публичный метод, который отвечает за отрисовку всех элементов
  addElement(data) {
    data.forEach((element) => {
      this._renderer(element);
    });
  }

  // публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  // в начало
  addItemToBeginning(element) {
    this._container.prepend(element);
  }

  // в конец
  addItemToEnd(element) {
    this._container.append(element);
  }
}

export default Section;
