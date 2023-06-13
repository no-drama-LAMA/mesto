import Popup from "./Popup.js";

class PopupDelete extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  // Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Удаление...";
      this._formSubmitCallback({element: this._element, cardId: this._cardId})
    })
  }

  open = ({element, cardId}) => {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }
}

export default PopupDelete;
