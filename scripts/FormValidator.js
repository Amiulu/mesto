  export default class FormValidator {

  constructor(settingsInput, formElement) {
      this._settingsInput = settingsInput;
      this._formElement = formElement;
  }

  _showInputError = (inputElement) => {
      this.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._settingsInput.inputTypeError);
      this.errorElement.textContent = inputElement.validationMessage;
      this.errorElement.classList.add(this._settingsInput.inputErrorActive);
  };

  _hideInputError = (inputElement) => {
    this.errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settingsInput.inputTypeError);
    this.errorElement.classList.remove(this._settingsInput.inputErrorActive);
    this.errorElement.textContent = '';
  };

  _isValid = (inputElement) => {
  if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }; 

  _setEventListeners = () => {
    this.inputList = Array.from(this._formElement.querySelectorAll(this._settingsInput.input));
    this.buttonElement = this._formElement.querySelector(this._settingsInput.saveButton);
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
     });
  };

  enableValidation = () => {
      this._setEventListeners();
  };

  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState();
  }

  _hasInvalidInput () {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; 

  _toggleButtonState ()  {
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add(this._settingsInput.saveButtonInactive);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this._settingsInput.saveButtonInactive);
      this.buttonElement.disabled = false;
    }
  }
}