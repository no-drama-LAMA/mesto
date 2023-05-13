
// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение
class Card {
  // принимает в конструктор её данные и селектор её template-элемента
  constructor(cardSet, templateClass, openPopupOpenedImage) {
    this._cardSet = cardSet;
    this._link = cardSet.link;
    this._name = cardSet.name;
    this._templateClass = templateClass;
    this._openPopupOpenedImage = openPopupOpenedImage;
  }

  // содержит приватные методы, которые работают с разметкой

  // Метод создания клона шаблона разметки карточки
  _createTemplate() {
    const newElement = document. querySelector(this._templateClass).content.querySelector('.element').cloneNode(true);
    return newElement;
  }

  // Метод лайка карточки
  _likeElement = () => {
    this._elementButtonLike.classList.toggle('element__button-like_active');
  }

  // Метод удаления карточки
  _removeElement = () => {
    this._element.remove();
  }

  // Метод открытия попапа раскрытия картинки
  _unwrapPopupOpenedImage = () => {
    this._openPopupOpenedImage(this._cardSet);
  }

  // устанавливают слушателей событий
  _setEventListener() {
    this._elementButtonLike.addEventListener('click', this._likeElement);
    this._elementTrash.addEventListener('click', this._removeElement);
    this._elementImage.addEventListener('click', this._unwrapPopupOpenedImage);
  }

  // Метод создания корточки
  createElement() {
    // Разметка
    this._element = this._createTemplate();
    // Картинка в разметке
    this._elementImage = this._element.querySelector('.element__image');
    // Текст в разметке
    this._elementText = this._element.querySelector('.element__title');
    // Иконка удаления в разметке
    this._elementTrash = this._element.querySelector('.element__trash');
    // Кнопка лайка в разметке
    this._elementButtonLike = this._element.querySelector('.element__button-like');
    // Вставить ссылку в src картинки и текст в alt
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    // Вставить текст 
    this._elementText.textContent = this._name;
    // Слушатель событий
    this._setEventListener();
    // Возвращается готовая карточка
    return this._element
  }
}

export default Card;