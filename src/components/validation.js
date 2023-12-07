function showInputError(form, input, errorMessage, ValidationConfig) {
  input.classList.add(ValidationConfig.inputErrorClass);

  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = errorMessage;
  formError.classList.add(ValidationConfig.errorClass);
}

function hideInputError(form, input, ValidationConfig) {
  input.classList.remove(ValidationConfig.inputErrorClass);

  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = '';
  formError.classList.remove(ValidationConfig.errorClass);
}

function checkInputValidity(form, input, ValidationConfig) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, ValidationConfig);
  } else {
    hideInputError(form, input, ValidationConfig);
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
    buttonElement.classList.add(ValidationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(ValidationConfig.inactiveButtonClass);
  }
}

function setEventListeners(formElement, ValidationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(ValidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(ValidationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, ValidationConfig);
      toggleButtonState(inputList, buttonElement, ValidationConfig);
    });
  });
}

export function enableValidation(ValidationConfig) {
  const formList = Array.from(document.querySelectorAll(ValidationConfig.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, ValidationConfig);
  });
}

export function clearValidation(profileForm, ValidationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(ValidationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(ValidationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.classList.remove(ValidationConfig.inputErrorClass);
  });

  let formErrors = Array.from(profileForm.querySelectorAll('.popup__input-error'));
  formErrors.forEach(formError => {
    formError.textContent = '';
    formError.classList.remove(ValidationConfig.errorClass);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(ValidationConfig.inactiveButtonClass);
}
