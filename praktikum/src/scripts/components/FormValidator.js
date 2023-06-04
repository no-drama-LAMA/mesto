// Создайте класс FormValidator, который настраивает валидацию полей формы
class FormValidator {
  // принимает в конструктор объект настроек с селекторами и классами формы
  // принимает вторым параметром элемент той формы, которая валидируется
  constructor(object, form) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._form = form;
    // Кнопка формы
    this._submitButton = form.querySelector(this._submitButtonSelector);
    // Импуты формы
    this._inputSet = form.querySelectorAll(this._inputSelector);
  }

  // имеет приватные методы, которые обрабатывают форму:

  // Метод показа ошибки (не валидно)
  _showInputError() {
    this._input.classList.add(this._inputErrorClass);
    this._currentInputErrorContainer.textContent = this._input.validationMessage;
  }

  // Метод скрытия ошибки (валидно)
  _hideInputError() {
    this._input.classList.remove(this._inputErrorClass);
    this._currentInputErrorContainer.textContent = ' ';
  }

  // изменяют состояние кнопки сабмита

  // Метод включения кнопки
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  // Метод отключения кнопки
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  // проверяют валидность поля

  // Метод проверки валидности каждого поля
  _hasValidInput() {
    return Array.from(this._inputSet).every((input) => input.validity.valid);
  }

  // Метод состояния кнопки
  _toggleButtonState() {
    if (this._hasValidInput()) {
      this._enableButton();
    } else {
      this._disableButton(this._submitButton);
    }
  }

  // Метод управления текстом ошибки (скрыть, показать)
  _checkInputValidity() {
    this._currentInputErrorContainer = this._form.querySelector(`#${this._input.id + '-error'}`);
    if (this._input.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  // Метод проверки валидности и состояния кнопки при заполнении инпутов
  _establishEventListener() {
    this._inputSet.forEach((input) => {
      input.addEventListener('input', () => {
        this._input = input;
        this._checkInputValidity();
        this._toggleButtonState();
      })
    })
  }

  // имеет публичный метод enableValidation, который включает валидацию формы

  // Метод включения валидации всех форм
  enableValidation() {
    this._establishEventListener();
  }

  // Метод поведения текстов ошибок формы при открытии
  removeErrorTextWhenOpening() {
    this._inputSet.forEach((input) => {
      this._input = input;
      this._currentInputErrorContainer = document.querySelector(`#${this._input.id + '-error'}`);
      if (!input.validity.valid) {
        this._hideInputError();
      }
    })
    this._disableButton();
  }
}

export default FormValidator;
