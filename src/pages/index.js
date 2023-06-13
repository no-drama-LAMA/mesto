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
// Импорт класса PopupDelete
import PopupDelete from '../scripts/components/PopupDelete.js';
// Импорт класса Api
import Api from '../scripts/components/Api.js';
// Импорт всех констант
import { initialCards, formChangeProfileElement, popupChangeProfileOpenButton, formAddElement, popupAddElementOpenButton,
  formDeleteElement, popupDeleteElementOpenButton, formChangeAvatar, popupChangeAvatarOpenButton, templateClass,
  popupOpenedImageClass, elements, popupProfileClass, popupAddElementClass, popupChangeAvatarClass, popupDeleteElementClass, profileInfoSet, objectForValidation } from '../scripts/utils/constants.js';

// Экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '8c0bfa3a-29d7-4fdb-9051-2e4437aa602f',
    'Content-Type': 'application/json'
  }
});

// Информация о пользователе
const userInfo = new UserInfo(profileInfoSet);

// ПОПАП РАСКРЫТИЯ КАРТИНКИ

const popupOpenedImage = new PopupWithImage(popupOpenedImageClass);
// Слушатель клика закрытия попапа раскрытия картинки
popupOpenedImage.setEventListeners();

// ПОПАП УДАЛЕНИЯ КАРТОЧКИ

// Экземпляр класса PopupDelete
const popupDeleteCard = new PopupDelete(popupDeleteElementClass, ({element, cardId}) => {
  api.deleteCard(cardId)
    .then(() => {
      element.deleteElement();
      popupDeleteCard.close();
    })
    .catch(((error) => console.error(`Ошибка удаления карточки ${error}`)))
});
// Слушатель клика закрытия попапа удаления карточки
popupDeleteCard.setEventListeners();

// Экземпляр класса Card и генерация разметки
function createCard(element) {
  const newAddedElement = new Card(element, templateClass, popupOpenedImage.open, popupDeleteCard.open, (element, cardId) => {
    if (element.classList.contains('.element__button-like_active')) {
      api.deleteLikeCard(cardId)
        .then((res) => {
          newAddedElement.switchLikes(res.likes);
        })
        .catch(((error) => console.error(`Ошибка удаления лайка ${error}`)));
    } else {
      api.likeCard(cardId)
        .then((res) => {
          newAddedElement.switchLikes(res.likes)
        })
        .catch(((error) => console.error(`Ошибка добавления лайка ${error}`)))
    }
  });
  const newElement = newAddedElement.createElement();
  return newElement;
}

// Отрисовка элементов на странице
const section = new Section((element) => {
    section.addItemToEnd(createCard(element));
  }, elements);

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const newPopupChangeProfile = new PopupWithForm(popupProfileClass, (data) => {
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({ title: res.name, about: res.about, avatar: res.avatar });
      newPopupChangeProfile.close();
    })
    .catch(((error) => console.error(`Ошибка изменения профиля ${error}`)))
});
// Слушатель клика закрытия попапа редактирования профиля
newPopupChangeProfile.setEventListeners();

// Открыть попап редактирования профиля

popupChangeProfileOpenButton.addEventListener('click', function () {
  validatorFormChangeProfile.removeErrorTextWhenOpening();
  newPopupChangeProfile.setInputValues(userInfo.getUserInfo());
  newPopupChangeProfile.open();
});

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ

const newPopupAddElement = new PopupWithForm(popupAddElementClass, (data) => {
  Promise.all([api.getUserInfo(), api.addNewCard(data)])
    .then(([userData, cardData]) => {
      cardData.masterId = userData._id;
      section.addItemToBeginning(createCard(cardData));
      newPopupAddElement.close();
    })
    .catch(((error) => console.error(`Ошибка добавления карточки ${error}`)))
});
// Слушатель клика закрытия попапа добавления карточки
newPopupAddElement.setEventListeners();

// Открыть попап добавления карточки

popupAddElementOpenButton.addEventListener('click', function () {
  validatorFormAddElement.removeErrorTextWhenOpening();
  newPopupAddElement.open();
});

// ПОПАП ОБНОВЛЕНИЯ АВАТАРА

const newPopupChangeAvatar = new PopupWithForm(popupChangeAvatarClass, (data) => {
  api.setAvatar(data)
    .then((res) => {
      userInfo.setUserInfo({ title: res.name, about: res.about, avatar: res.avatar });
      newPopupChangeAvatar.close();
    })
    .catch(((error) => console.error(`Ошибка обновления аватара ${error}`)))
});

// Слушатель клика закрытия попапа обновления аватара
newPopupChangeAvatar.setEventListeners();

// Открыть попап обновления аватара
popupChangeAvatarOpenButton.addEventListener('click', function () {
  validatorFormChangeAvatar.removeErrorTextWhenOpening();
  newPopupChangeAvatar.open();
})

// ВАЛИДАЦИЯ

// Для каждой проверяемой формы создайте экземпляр класса FormValidator

// экземпляр класса FormValidator для формы добавления карточки
const validatorFormAddElement = new FormValidator(objectForValidation, formAddElement);
validatorFormAddElement.enableValidation();

// экземпляр класса FormValidator для формы редактирования профиля
const validatorFormChangeProfile = new FormValidator(objectForValidation, formChangeProfileElement);
validatorFormChangeProfile.enableValidation();

// экземпляр класса FormValidator для формы обновления аватара
const validatorFormChangeAvatar = new FormValidator(objectForValidation, formChangeAvatar);
validatorFormChangeAvatar.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardSet]) => {
    cardSet.forEach((element) => element.masterId = userData._id);
    userInfo.setUserInfo({ title: userData.name, about: userData.about, avatar: userData.avatar });
    section.addElement(cardSet);
  })
  .catch((error) => console.error(`Ошибка создания страницы ${error}`))
