const settingsInput = {
  form: '.popup__form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  saveButtonInactive: 'popup__save-button_inactive',
  inputTypeError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error-active'
};

const showInputError = (formElement, inputElement, settingsInput) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settingsInput.inputTypeError);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settingsInput.inputErrorActive);
};

const hideInputError = (formElement, inputElement, settingsInput) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settingsInput.inputTypeError);
    errorElement.classList.remove(settingsInput.inputErrorActive);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settingsInput) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, settingsInput);
    } else {
      hideInputError(formElement, inputElement, settingsInput);
    }
  }; 

const setEventListeners = (formElement, settingsInput) => {
    const inputList = Array.from(formElement.querySelectorAll(settingsInput.input));
    const buttonElement = formElement.querySelector(settingsInput.saveButton);
    toggleButtonState(inputList, buttonElement, settingsInput);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settingsInput);
        toggleButtonState(inputList, buttonElement, settingsInput);
      });
    });
  };

  const enableValidation = (settingsInput) => {
    const formList = Array.from(document.querySelectorAll(settingsInput.form));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
      setEventListeners(formElement, settingsInput);
    });
  };

  enableValidation(settingsInput); 
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; 
  

  function toggleButtonState (inputList, buttonElement, settingsInput)  {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settingsInput.saveButtonInactive);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settingsInput.saveButtonInactive);
      buttonElement.disabled = false;
    }
  }; 