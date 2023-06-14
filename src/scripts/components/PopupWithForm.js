// Импорт класса Popup
import Popup from "./Popup.js";

// Создайте класс PopupWithForm, который наследует от Popup
class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._buttonText = this._submitButton.textContent;
  }

  // метод, который собирает данные всех полей формы
  _getInputValues() {
    this._formFieldData = {};
    this._inputs.forEach(input => {
      this._formFieldData[input.name] = input.value;
    })
    return this._formFieldData;
  }

  // метод, который принимает данные формы
  setInputValues(infoSet) {
    this._inputs.forEach((input) => {
      input.value = infoSet[input.name];
    })
  }

  // Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading();
      this._formSubmitCallback(this._getInputValues());
    })
  }

  // сменa текста в кнопке сабмита
  renderLoading() {
    this._submitButton.textContent = "Сохранение...";
  }

  // вернуть текст кнопки сабмита
  resetLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  // не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
