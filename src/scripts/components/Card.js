
// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение
class Card {
  // принимает в конструктор её данные и селектор её template-элемента
  constructor(cardSet, templateClass, openPopupOpenedImage, openPopupDeleteCard, changeLikeButton) {
    // console.log(cardSet)
    this._cardSet = cardSet;
    this._link = cardSet.link;
    this._name = cardSet.name;
    this._likes = cardSet.likes;
    this._likesCount = cardSet.likes.length;
    this._masterId = cardSet.masterId;
    this._userId = cardSet.owner._id;
    this._cardId = cardSet._id;
    this._templateClass = templateClass;
    this._openPopupOpenedImage = openPopupOpenedImage;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._changeLikeButton = changeLikeButton;
  }

  // содержит приватные методы, которые работают с разметкой

  // Метод создания клона шаблона разметки карточки
  _createTemplate() {
    const newElement = document. querySelector(this._templateClass).content.querySelector('.element').cloneNode(true);
    return newElement;
  }

  // Метод лайка карточки
  _likeElement = () => {
    this._changeLikeButton(this._elementButtonLike, this._cardId);
  }

  // Метод открытия попапа при клике на кнопку удаления карточки
  _removeElement = () => {
    this._openPopupDeleteCard({element: this, cardId: this._cardId});
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

  // метод вывода кнопки удаления карточки
  _hideDeleteButton() {
    if (this._masterId !== this._userId) {
      this._elementTrash.style.display = 'none'
    }
  }

  // метод проверки количества лайков
  _checkLikes() {
    this._likes.forEach((element) => {
      if (element._id === this._masterId) {
        this._elementButtonLike.classList.add('element__button-like_active');
        return
      }
    });
    this._elementLikeCounter.textContent = this._likesCount;
  }

  switchLikes(arr) {
    this._elementButtonLike.classList.toggle('element__button-like_active');
    this._elementLikeCounter.textContent = arr.length;
  }

  // метод удаления карточки
  deleteElement () {
    this._element.remove();
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
    // Счетчик лайков
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    // Вставить ссылку в src картинки и текст в alt
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    // Вставить текст
    this._elementText.textContent = this._name;
    // Посчитать количество лайков карточки
    this._checkLikes();
    // Отобразить иконку удаления
    this._hideDeleteButton();
    // Слушатель событий
    this._setEventListener();
    // Возвращается готовая карточка
    return this._element
  }
}

export default Card;
