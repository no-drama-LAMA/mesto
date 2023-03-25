// весь попап
const popupElement = document.querySelector(".popup");
//Закрыть попап
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
//Открыть попап
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

const popupSubmitButtonElement = document.querySelector(".popup__submit-button");

// Находим форму в DOM
let formElement = popupElement.querySelector(".popup__form");

// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__change-profile-input_type_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".popup__change-profile-input_type_about");

// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector(".profile__profile-name");
let profileAbout = document.querySelector(".profile__profile-about");

// Функция открытия попапа
const openPopup = function () {
    popupElement.classList.add("popup_opened");
    nameInput.textContent = profileName.value;
    jobInput.textContent = profileAbout.value;
};

// Функция закрытия попапа
const closePopup = function () {
    popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
const handleFormSubmit = function (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
