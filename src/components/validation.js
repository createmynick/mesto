export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
function showInputError(form, input, errorMessage, validationConfig) {
  input.classList.add(validationConfig.inputErrorClass);

  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
}
function hideInputError(form, input, validationConfig) {
  input.classList.remove(validationConfig.inputErrorClass);

  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = '';
  formError.classList.remove(validationConfig.errorClass);
}

function checkInputValidity(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, ValidationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
  });

  let formErrors = Array.from(profileForm.querySelectorAll('.popup__input-error'));
  formErrors.forEach(formError => {
    formError.textContent = '';
    formError.classList.remove(validationConfig.errorClass);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}
