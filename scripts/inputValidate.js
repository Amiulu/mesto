const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error-active');
};

//открываем себя 
//Доброго дня дорогой проверяющий, спасибо вам за вашу работу <З в процессе выполнения работы  возникло несколько вопросов, 
//никак не могу разобраться с нижним подчеркивание красного цвета в инспекторе класс popup__input просто перекрывает сам себя 
// и присвоенный ему класс для стилизации нижнего подчеркивания в функции showInputError. Сделала пока грубейший костыль, но 
// вижу что результат плохой. 

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error-active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }; 

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
      setEventListeners(formElement);
    });
  };

  enableValidation(); 
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; 
  

  function toggleButtonState (inputList, buttonElement)  {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_inactive');
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__save-button_inactive');
      buttonElement.disabled = false;
    }
  }; 