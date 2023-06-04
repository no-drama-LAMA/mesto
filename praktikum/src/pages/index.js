// добавьте импорт главного файла стилей
import './index.css';
// Импорт класса Card
import Card from '../scripts/components/Card.js';
// Импорт класса FormValidator
import FormValidator from '../scripts/components/FormValidator.js';
// Импорт класса PopupWithImage
import PopupWithImage from '../scripts/components/PopupWithImage.js';
// Импорт класса Section
import Section from '../scripts/components/Section.js';
// Импорт класса UserInfo
import UserInfo from '../scripts/components/UserInfo.js';
// Импорт класса PopupWithForm
import PopupWithForm from '../scripts/components/PopupWithForm.js';
// Импорт всех констант
import { initialCards, formChangeProfileElement, popupChangeProfileOpenButton, formAddElement, popupAddElementOpenButton, templateClass,
  popupOpenedImageClass, elements, popupProfileClass, popupAddElementClass, profileInfoSet, objectForValidation } from '../scripts/utils/constants.js';


// Информация о пользователе
const userInfo = new UserInfo(profileInfoSet);

// ПОПАП РАСКРЫТИЯ КАРТИНКИ

const popupOpenedImage = new PopupWithImage(popupOpenedImageClass);
popupOpenedImage.setEventListeners();

// Отрисовка элементов на странице
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const newAddedElement = new Card(element, templateClass, popupOpenedImage.open);
    const newElement = newAddedElement.createElement();
    return newElement;
  }
}, elements);

section.addElement();

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const newPopupChangeProfile = new PopupWithForm(popupProfileClass, (evt) => {
  // evt.preventDefault();
  userInfo.setUserInfo(newPopupChangeProfile._getInputValues());
  newPopupChangeProfile.setInputValues(userInfo.getUserInfo())
  newPopupChangeProfile.close();
});
// Слушатель клика закрытия попапа редактирования профиля
newPopupChangeProfile.setEventListeners();

// Открыть попап редактирования профиля

popupChangeProfileOpenButton.addEventListener('click', function () {
  validatorFormChangeProfile.removeErrorTextWhenOpening();
  newPopupChangeProfile.open();
});

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ

const newPopupAddElement = new PopupWithForm(popupAddElementClass, (element) => {
  // evt.preventDefault();
  section.addItem(element);
  // section.addItem(section.renderer(newPopupAddElement.getInputValues()));
  newPopupAddElement.close();
});
// Слушатель клика закрытия попапа добавления карточки
newPopupAddElement.setEventListeners();

// Открыть попап добавления карточки

popupAddElementOpenButton.addEventListener('click', function () {
  validatorFormAddElement.removeErrorTextWhenOpening();
  newPopupAddElement.open();
});

// ВАЛИДАЦИЯ

// Для каждой проверяемой формы создайте экземпляр класса FormValidator

// экземпляр класса FormValidator для формы добавления карточки
const validatorFormAddElement = new FormValidator(objectForValidation, formAddElement);
validatorFormAddElement.enableValidation();

// экземпляр класса FormValidator для формы редактирования профиля
const validatorFormChangeProfile = new FormValidator(objectForValidation, formChangeProfileElement);
validatorFormChangeProfile.enableValidation();
