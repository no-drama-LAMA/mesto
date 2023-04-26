// все нужные функциям классы и селекторы элементов
// console.log()
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

// Функция включения валидации всех форм
const enableValidation = function(obj) {
  // Массив форм со страницы из псевдомассива
  const setForms = Array.from(obj.forms)
  setForms.forEach((form) => {
    // Импуты внутри форм
    const setInputs = form.querySelectorAll(obj.inputSelector);
    // Кнопка формы
    const button = form.querySelector(obj.submitButtonSelector);
    establishEventListener(setInputs, button, obj.inactiveButtonClass, obj.inputErrorClass, obj.errorClass);
  })
}

// Функция проверки валидности и состояния кнопки при заполнении инпутов
const establishEventListener = function(setInputs, button, inactiveButtonClass, inputErrorClass, errorClass) {
  setInputs.forEach(input => {
    input.addEventListener('input', function() {
      checkInputValidity(input, inputErrorClass, errorClass);
      toggleButtonState(setInputs, button, inactiveButtonClass);
    })
  })
}

// Функция управления текстом ошибки (скрыть, показать)
const checkInputValidity = function(input, inputErrorClass, errorClass) {
  const currentInputErrorContainer = document.querySelector(`#${input.id + '-error'}`);
  if (!input.validity.valid) {
    showInputError(input, currentInputErrorContainer, inputErrorClass, errorClass);
  } else {
    hideInputError(input, currentInputErrorContainer, inputErrorClass, errorClass);
  }
}

// Функция показа ошибки (не валидно)
const showInputError = function(input, currentInputErrorContainer, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  currentInputErrorContainer.classList.add(errorClass);
  currentInputErrorContainer.textContent = input.validationMessage;
}

// Функция скрытия ошибки (валидно)
const hideInputError = function(input, currentInputErrorContainer, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  currentInputErrorContainer.classList.remove(errorClass);
  currentInputErrorContainer.textContent = ' ';
}

// Функция состояния кнопки
const toggleButtonState = function(setInputs, button, inactiveButtonClass) {
  if (hasValidInput(setInputs)) {
    enableButton(button, inactiveButtonClass);
  } else {
    disableButton(button, inactiveButtonClass);
  }
}

// Функция проверки валидности каждого поля
const hasValidInput = function(setInputs) {
  return Array.from(setInputs).every((input) => input.validity.valid)
}

// Функция включения кнопки
const enableButton = function(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
}

// Функция отключения кнопки
const disableButton = function(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', 'disabled');
}

// Функция поведения текстов ошибок формы при открытии
const formOpeningBehavior = function(form) {
  form.querySelectorAll(objectForValidation.inputSelector).forEach((input) => {
    const currentInputErrorContainer = document.querySelector(`#${input.id + '-error'}`);
    if (input.validity.valid) {
      hideInputError(input, currentInputErrorContainer, objectForValidation.inputErrorClass, objectForValidation.errorClass)
    }
  })
}

// Вызов функции всех функций валидации всех валидаций
enableValidation(objectForValidation)
