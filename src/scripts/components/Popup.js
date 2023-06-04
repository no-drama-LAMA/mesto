class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(selector) {
    // Попап
    this._popup = document.querySelector(selector);
    // Крестик закрытия попапа
    this._closeButton = this._popup.querySelector('.popup__close-button');

  }

  // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.

  // Метод закрытия попапа нажатием кнопки Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  // Метод закрытия попапа на крестик
  _closePopupByCloseButton = () => {
    this.close();
  }

  // Метод закрытия попапа кликом на оверлей
  _closeByPressLMB = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    this._closeButton.addEventListener('click', this._closePopupByCloseButton);
    this._popup.addEventListener('click', this._closeByPressLMB);
  }

  // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.

  // Метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

export default Popup;
