const config = {
  formElement: ".popup__form",
  inputElement: ".popup__input-form",
  buttonElement: ".popup__button-save",
  disabledButtonClass: "popup__button-save_disabled",
  errorInputMessage: "popup__input-form_error",
  errorMessageClass: "error-message_visible"
};



const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
 
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(config.errorMessageClass);
  inputElement.classList.add(config.errorInputMessage);
};

const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  errorElement.textcontent = "";
  errorElement.classList.add(config.errorMessageClass);
  inputElement.classList.remove(config.errorInputMessage);
};

const getErrorMessage = (inputElement) => {
  
  const VALUE_MISSING_ERROR_MESSAGE = "Вы пропустили это поле."


  const defaultErrorHandler = (inputElement) => {
    if(inputElement.validity.valueMissing) {
      return VALUE_MISSING_ERROR_MESSAGE;
    }
    return inputElement.validationMessage;
  };
  
  const urlErrorHandler = (inputElement) => {
     if(inputElement.validity.valueMissing) {
      return VALUE_MISSING_ERROR_MESSAGE;
    }

    return "Введите адрес сайта.";
  };

  const errorHandlers = {
    url: urlErrorHandler,
    DEFAULT: defaultErrorHandler
  };
  
  const errorHandler = errorHandlers[inputElement.name] || errorHandlers.DEFAULT;;

  return errorHandler(inputElement);
};

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorMessage = getErrorMessage(inputElement);
  
  if(isInputNotValid) {
    showError(formElement, inputElement, errorMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, submitButtonElement, config) => {
  const inputElements =  Array.from(inputList);
  const hasInvalidInput = inputElements.some (inputElement => {
    return !inputElement.validity.valid;
  });

  if(hasInvalidInput) {
    submitButtonElement.classList.add(config.disabledButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(config.disabledButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};


const setIventListeners = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputElement);
  const submitButtonElement = formElement.querySelector(config.buttonElement);

  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement, config);
    };

    inputElement.addEventListener("input", handleInput);

  };
  toggleButtonState(inputList, submitButtonElement, config);
  inputList.forEach(inputListIterator);

};


const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formElement);
  const formListIterator = (formElement, buttonElement, disabledButtonClass) => {
    const handleformSubmit = (event) => {
      event.preventDefault();
    };

     formElement.addEventListener("submit", handleformSubmit);

     setIventListeners(formElement, config);
   };

   formList.forEach(formListIterator);

  };


enableValidation(config);