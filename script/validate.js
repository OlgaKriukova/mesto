let formList;

const getInputList = (formElement, inputSelector) => {
  return Array.from(formElement.querySelectorAll(inputSelector));
};

const showInputError = (inputElement, inputErrorClass, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  inputElement.errorElement.textContent = errorMessage;
  inputElement.errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  inputElement.errorElement.classList.remove(errorClass);
  inputElement.errorElement.textContent = '';
};

const checkInputValidity = (inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
 if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, inputErrorClass, errorClass, inactiveButtonClass) => {
  formElement.inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement.inputList, formElement.buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (params) => {
  formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.inputList = getInputList(formElement, params.inputSelector);
    formElement.inputList.forEach((inputElement) => {
      inputElement.errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    });

    formElement.buttonElement = formElement.querySelector(params.submitButtonSelector);

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      formElement.buttonElement.setAttribute('disabled', 'disabled');
    });
    
    setEventListeners(formElement, params.inputErrorClass, params.errorClass, params.inactiveButtonClass); 
  });
};

const getFormElement = (form, formList) => {
  return formList.find(formElement => formElement.name == form.name);
}

const getFormValidity = (form) => {
  return !hasInvalidInput(getFormElement(form, formList).inputList);
}

const clearValidation = (form, inputErrorClass, errorClass, inactiveButtonClass) => {
  const formElement = getFormElement(form, formList);
  
  formElement.inputList.forEach((inputElement) => {
    hideInputError(inputElement, inputErrorClass, errorClass);
  });
  toggleButtonState(formElement.inputList, formElement.buttonElement, inactiveButtonClass);
}
