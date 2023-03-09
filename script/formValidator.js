"use strict";

export class FormValidator {
    constructor(params, formElement) {
        this._formSelector = params.formSelector;
        this._inputSelector = params.inputSelector;
        this._submitButtonSelector = params.submitButtonSelector;
        this._inactiveButtonClass = params.inactiveButtonClass;
        this._inputErrorClass = params.inputErrorClass;
        this._errorClass = params.errorClass;
        this._formElement = formElement;
    }
    
    _getInputList() {
        return Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
      inputElement.classList.add(this._inputErrorClass);
      inputElement.errorElement.textContent = errorMessage;
      inputElement.errorElement.classList.add(this._errorClass);
    }
    
    _hideInputError(inputElement) {
      inputElement.classList.remove(this._inputErrorClass);
      inputElement.errorElement.classList.remove(this._errorClass);
      inputElement.errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'disabled');
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
      }
    }

    _setEventListeners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }

    _openFormHandler() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      this._toggleButtonState();
    }

    enableValidation() {
        this._inputList = this._getInputList();

        this._inputList.forEach((inputElement) => {
            inputElement.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        });
      
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._buttonElement.setAttribute('disabled', 'disabled');
          this._formElement.isValid = !this._hasInvalidInput();
        });

        this._formElement.addEventListener('open', () => {
          this._openFormHandler();
        });
        
        this._setEventListeners();        
    }
};