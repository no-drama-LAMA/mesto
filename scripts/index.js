// Импорт объекта для добавления первых 6 карточек на страницу
import initialCards from './constants.js'
// Импорт класса Card
import Card from './Card.js';
// Импорт класса FormValidator
import FormValidator from './FormValidator.js';

// Все попапы
const popups = document.querySelectorAll('.popup')

// Все крестики закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// Попап редактирования профиля
const popupChangeProfile = document.querySelector('.popup_profile');
// Крестик для закрытия попапа редактирования профиля
//const popupCloseButtonElement = popupChangeProfile.querySelector('.popup__close-button');
// Кнопка открытия попапа редактирования профиля
const popupChangeProfileOpenButton = document.querySelector('.profile__edit-button');
// Кнопка "Сохранить"
//const popupChangeProfileSubmitButton = popupChangeProfile.querySelector('.popup__submit-button');
// Инпуты попапа редактирования профиля
//const popupChangeProfileInputs = popupChangeProfile.querySelectorAll('.popup__input');

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
//const popupAddElementCloseButton = popupAddElement.querySelector('.popup__close-button');
// Кнопка открытия попапа добавления карточки
const popupAddElementOpenButton = document.querySelector('.profile__add-button');
// Кнопка "Создать"
//const popupAddElementSubmitButton = popupAddElement.querySelector('.popup__submit-button');
// Инпуты попапа добавления карточки
//const popupAddElementInputs = popupAddElement.querySelectorAll('.popup__input');

// Форма попапа добавления карточки
const formAddElement = popupAddElement.querySelector('.popup__form');

// Поля формы попапа добавления карточки
const formAddElementName = formAddElement.querySelector('.popup__input_type_name');
const formAddElementImg = formAddElement.querySelector('.popup__input_type_about');

// РАСКРЫТИЕ КАРТИНКИ

// Попап раскрытия картинки
const popupOpenedImage = document.querySelector('.popup_open-image');
// Крестик для закрытия попапа добавления карточки
//const popupOpenedImageCloseButton = popupOpenedImage.querySelector('.popup__close-button');
// Картинка внутри попапа раскрытия картинки
const imageFromOpenedImage = popupOpenedImage.querySelector('.popup__image');
// Подпись картинки
const textFromOpenedImage = popupOpenedImage.querySelector('.popup__element-text');

// ДЛЯ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ ИЗ МАССИВА

// Шаблон елемента
//const elementTemplate = document.querySelector('.template-element').content;
// Секция для добавления элементов
const elements = document.querySelector('.elements');
//
// Класс  шаблона элемента
const templateClass = '.template-element';

// все нужные для валидации функциям классы и селекторы элементов
const objectForValidation = {
  // formSelector: '.popup__form',
  // Все формы на странице хранятся в виде псевдомассива в свойстве document.forms
  forms: document.forms, // псевдомассив форм
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Для каждой проверяемой формы создайте экземпляр класса FormValidator

// экземпляр класса FormValidator для формы добавления карточки
const validatorFormAddElement = new FormValidator(objectForValidation, formAddElement);
validatorFormAddElement.enableValidation();

// экземпляр класса FormValidator для формы редактирования профиля
const validatorFormChangeProfile = new FormValidator(objectForValidation, formChangeProfileElement);
validatorFormChangeProfile.enableValidation();

// Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByPressEsc);
};

// Функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByPressEsc);
};

// Функция закрытия попапов на крестик
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Функция закрытия попапа нажатием кнопки
const closeByPressEsc = function (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

// Функция закрытия попапа кликом на оверлей
const closeByPressLMB = function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
}

popups.forEach(function(element) {
  element.addEventListener('click', closeByPressLMB)
})

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// Открыть попап редактирования профиля
popupChangeProfileOpenButton.addEventListener('click', function () {
  validatorFormChangeProfile.removeErrorTextWhenOpening();
  openPopup(popupChangeProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  //removeErrorTextWhenOpening(formChangeProfileElement);
  //toggleButtonState(popupChangeProfileInputs, popupChangeProfileSubmitButton, objectForValidation.inactiveButtonClass)
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

// Функция открытия попапа раскрытия картинки
const openPopupOpenedImage = function(item) {
  imageFromOpenedImage.src = item.link;
  imageFromOpenedImage.alt = item.name;
  textFromOpenedImage.textContent = item.name;
  openPopup(popupOpenedImage);
}

// Функция добавления елемента в начало секции
const addElementToStart = function(container, element) {
  container.prepend(element);
}

// Добавление елемента в начало секции галереи
initialCards.forEach((element) => {
  addElementToStart(elements, addNewElement(element))
});

// ШЕСТЬ КАРТОЧЕК "ИЗ КОРОБКИ"

// Функция создания элемента
function addNewElement (element) {
  const newAddedElement = new Card(element, templateClass, openPopupOpenedImage);
  const newElement = newAddedElement.createElement();
  return newElement;
}

// Открыть попап добавления карточки
popupAddElementOpenButton.addEventListener('click', function () {
  validatorFormAddElement.removeErrorTextWhenOpening();
  openPopup(popupAddElement);
  //removeErrorTextWhenOpening(formAddElement);
  //toggleButtonState(popupAddElementInputs, popupAddElementSubmitButton, objectForValidation.inactiveButtonClass);
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
  addElementToStart(elements, addNewElement(sampleNewAddElement));
  closePopup(popupAddElement);
  //Очистить поля формы
  evt.target.reset();
}

//Чтобы создавать новые карточки, добавьте обработчик событий submit. Сделайте это
// аналогично прошлому спринту, в котором вы настраивали редактирование информации о пользователе.
// Прикрепляем обработчик к форме
formAddElement.addEventListener('submit', addElement);

// Функция удаления элемента
/*function removeElement (event) {
  const card = event.target.closest('.element');
  card.remove();
}*/

/*function setEventListeners (newElement) {
  newElement.querySelector('.element__trash').addEventListener('click', removeElement);
}*/
