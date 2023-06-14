import Popup from "./Popup.js";

class PopupDelete extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._buttonText = this._submitButton.textContent;
  }

  // Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading();
      this._formSubmitCallback({element: this._element, cardId: this._cardId})
    })
  }

  // сменa текста в кнопке сабмита
  renderLoading() {
    this._submitButton.textContent = "Удаление...";
  }

  // вернуть текст кнопки сабмита
  resetLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  open = ({element, cardId}) => {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }
}

export default PopupDelete;
