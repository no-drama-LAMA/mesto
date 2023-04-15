// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// Попап редактирования профиля
const popupChangeProfile = document.querySelector('.popup_profile');
// Крестик для закрытия попапа редактирования профиля
const popupCloseButtonElement = popupChangeProfile.querySelector('.popup__close-button');
// Кнопка открытия попапа редактирования профиля
const popupChangeProfileOpenButton = document.querySelector('.profile__edit-button');

// Форма попапа редактирования профиля
const formChangeProfileElement = popupChangeProfile.querySelector('.popup__form');

// Поля формы попапа редактирования профиля
const nameInput = formChangeProfileElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formChangeProfileElement.querySelector('.popup__input_type_about');

// Элементы профиля, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__profile-name');
const profileAbout = document.querySelector('.profile__profile-about');


// ДОБАВЛЕНИЕ КАРТОЧКИ

// Попап добавления карточки
const popupAddElement = document.querySelector('.popup_add-element');
// Крестик для закрытия попапа добавления карточки
const popupAddElementCloseButton = popupAddElement.querySelector('.popup__close-button');
// Кнопка открытия попапа добавления карточки
const popupAddElementOpenButton = document.querySelector('.profile__add-button');

// Форма попапа добавления карточки
const formAddElement = popupAddElement.querySelector('.popup__form');

// Поля формы попапа добавления карточки
const formAddElementName = formAddElement.querySelector('.popup__input_type_name');
const formAddElementImg = formAddElement.querySelector('.popup__input_type_about');

// РАСКРЫТИЕ КАРТИНКИ

// Попап раскрытия картинки
const popupOpenedImage = document.querySelector('.popup_open-image');
// Крестик для закрытия попапа добавления карточки
const popupOpenedImageCloseButton = popupOpenedImage.querySelector('.popup__close-button');
// Картинка внутри попапа раскрытия картинки
const imageFromOpenedImage = popupOpenedImage.querySelector('.popup__image');
// Подпись картинки
const textFromOpenedImage = popupOpenedImage.querySelector('.popup__element-text');


// ДЛЯ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ ИЗ МАССИВА

// Шаблон елемента
const elementTemplate = document.querySelector('.template-element').content;
// Секция для добавления элементов
const elements = document.querySelector('.elements');

// Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// Открыть попап редактирования профиля
popupChangeProfileOpenButton.addEventListener('click', function () {
  openPopup(popupChangeProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
});

// Закрыть попап редактирования профиля
popupCloseButtonElement.addEventListener('click', function () {
  closePopup(popupChangeProfile);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
const handleFormSubmit = function (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupChangeProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formChangeProfileElement.addEventListener('submit', handleFormSubmit);

// ШЕСТЬ КАРТОЧЕК "ИЗ КОРОБКИ"

// Массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция создания элемента
function createElement (item) {
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__title').textContent = item.name;
  newElement.querySelector('.element__image').src = item.link;
  newElement.querySelector('.element__image').alt = item.name;


  // Картинка для попапа раскрытия картинки
  const popupOpenedImageOpenButton = newElement.querySelector('.element__image');
  // Открытие папопа раскрытия картинки
  popupOpenedImageOpenButton.addEventListener('click', function () {
    imageFromOpenedImage.src = item.link;
    imageFromOpenedImage.alt = item.name;
    textFromOpenedImage.textContent = item.name;
    openPopup(popupOpenedImage);
  });

  // Закрытие папопа раскрытия картинки
  popupOpenedImageCloseButton.addEventListener('click', function () {
    closePopup(popupOpenedImage);
  });

  // Удаление карточки
  setEventListeners(newElement);

  // Лайк карточки
  const likeElement = newElement.querySelector('.element__button-like');
  likeElement.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });

  return newElement
}

// Добавление елемента в начало секции галереи
initialCards.forEach((element) => {
  const newAddedElement = createElement(element);
  elements.append(newAddedElement);
});

// Открыть попап добавления карточки
popupAddElementOpenButton.addEventListener('click', function () {
  openPopup(popupAddElement);
});

// Закрыть попап добавления карточки
popupAddElementCloseButton.addEventListener('click', function () {
  closePopup(popupAddElement);
});

//Функция добавления новой карточки
const addElement = function (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const sampleNewAddElement = {
    name: formAddElementName.value,
    link: formAddElementImg.value
  };

  //Сделайте так, чтобы при клике на «сохранить» новая карточка попадала в
  // начало контейнера с ними. А диалоговое окно после добавления автоматически закрывалось.
  const newAddElement = createElement(sampleNewAddElement);
  elements.prepend(newAddElement);
  closePopup(popupAddElement);
  //Очистить поля формы
  evt.target.reset();
}

//Чтобы создавать новые карточки, добавьте обработчик событий submit. Сделайте это
// аналогично прошлому спринту, в котором вы настраивали редактирование информации о пользователе.
// Прикрепляем обработчик к форме
formAddElement.addEventListener('submit', addElement);

// Функция удаления элемента

function removeElement (event) {
  const card = event.target.closest('.element');
  card.remove();
}

function setEventListeners (newElement) {
  newElement.querySelector('.element__trash').addEventListener('click', removeElement);
}

// ПОПАП РАСКРЫТИЯ КАРТИНКИ

// Открыть попап добавления карточки
popupAddElementOpenButton.addEventListener('click', function () {
  openPopup(popupAddElement);
});

// Закрыть попап добавления карточки
popupAddElementCloseButton.addEventListener('click', function () {
  closePopup(popupAddElement);
});


// Функция открытия папопа раскрытия картинки

