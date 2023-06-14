// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// Форма попапа редактирования профиля
const formChangeProfileElement = document.querySelector('#change-profile-form');

// Кнопка открытия попапа редактирования профиля
const popupChangeProfileOpenButton = document.querySelector('.profile__edit-button');

// ДОБАВЛЕНИЕ КАРТОЧКИ

// Форма попапа добавления карточки
const formAddElement = document.querySelector('#add-element-form');

// Кнопка открытия попапа добавления карточки
const popupAddElementOpenButton = document.querySelector('.profile__add-button');

// ОБНОВЛЕНИЕ АВАТАРА

// Форма попапа обновления аватара
const formChangeAvatar = document.querySelector('#change-avatar-form');

// Кнопка открытия попапа обновления аватара
const popupChangeAvatarOpenButton = document.querySelector('.profile__change-avatar-btn');



// Класс шаблона элемента
const templateClass = '.template-element';

// Класс попапа раскрытия картинки
const popupOpenedImageClass = '.popup_open-image';

// Класс контейнера, в который нужно добавлять созданные элементы
const elements = '.elements';

// Класс попапа редактирования профиля
const popupProfileClass = '.popup_profile';

// Класс попапа добавления карточки
const popupAddElementClass = '.popup_add-element';

// Класс попапа обновления аватара
const popupChangeAvatarClass = '.popup_change-avatar';

// Класс попапа удаления карточки
const popupDeleteElementClass = '.popup_delete-element';

// Объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
const profileInfoSet = {
  profileName: '.profile__profile-name',
  profileAbout: '.profile__profile-about',
  profileAvatar: '.profile__avatar'
}

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

export { formChangeProfileElement, popupChangeProfileOpenButton, formAddElement, popupAddElementOpenButton,
  formChangeAvatar, popupChangeAvatarOpenButton, templateClass, popupOpenedImageClass, elements, popupProfileClass,
  popupAddElementClass, popupChangeAvatarClass, popupDeleteElementClass, profileInfoSet, objectForValidation };
