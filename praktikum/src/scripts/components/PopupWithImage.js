// Импорт класса Popup
import Popup from "./Popup.js";

// Создайте класс PopupWithImage, который наследует от Popup
class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageFromOpenedImage = this._popup.querySelector('.popup__image');
    this._textFromOpenedImage = this._popup.querySelector('.popup__element-text');
  }

  // должен перезаписывать родительский метод open
  open = (cardSet) => {
    // нужно вставлять в попап картинку с src изображения и подписью к картинке
    this._imageFromOpenedImage.src = cardSet.link;
    this._imageFromOpenedImage.alt = cardSet.name;
    this._textFromOpenedImage.textContent = cardSet.name;
    super.open();
  }
}


export default PopupWithImage;
