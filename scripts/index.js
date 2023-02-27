//Павел спасибо за ваши комментари, было интересно. 

/*1.Импорт*/

import Card from "./Card.js";
import { initialCards } from "./cards.js";
import FormValidator from "./FormValidator.js";

/*2.Переменные*/

//popup
const popupElement = document.querySelector('.popup');
const popupProfiel = document.querySelector('.popup_type_profiel')
const popupAdd = document.querySelector('.popup_type_add');
const popupFullscreen = document.querySelector('.popup_type_photo-fullscreen');

//poup form
const popupConteiner = popupElement.querySelector('.popup__container');
const popupForm = popupElement.querySelector('.popup__form');
const popupFormAdd = popupAdd.querySelector('.popup__form-add')

//button const
const buttonClosePopup = popupProfiel.querySelector('.popup__close-button'); 
const buttonOpenPopup = document.querySelector('.profile__edit-button');
const submitAddPopup = popupElement.querySelector('.popup__save-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonSaveAdd = popupAdd.querySelector('.popup__add-button');
const popupAddButtonClouse = popupAdd.querySelector('.popup__close-button_add');
const buttonClosePopupImage = popupFullscreen.querySelector('.popup__close-fullscreen');

//input const
const popupInputName = popupElement.querySelector('.popup__input_data_name');
const popupInputDescription = popupElement.querySelector('.popup__input_data_description');
const popupInputPlace= popupAdd.querySelector('.popup__input_data_place');
const popupInputImage = popupAdd.querySelector('.popup__input_data_image');

//Others
const title = document.querySelector('.profile__taitle');
const subtitle = document.querySelector('.profile__subtaitle');
const moreCard = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template')
.content
.querySelector('.element');
const pictureAssignImageCard = popupFullscreen.querySelector('.popup__image-fullscreen');
const pictureAssignPlaceCard = popupFullscreen.querySelector('.popup__title-fullscreen');

const settingsInput = {
  form: '.popup__form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  saveButtonInactive: 'popup__save-button_inactive',
  inputTypeError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error-active'
};

const popupList = Array.from(document.querySelectorAll('.popup')); //константа для поиска всех попапов

const validationFormProfile = validationForm (popupForm); //создаем экземпляры класса 
const validationFormAddPlace = validationForm (popupFormAdd); //создаем экземпляры класса 

/*3.Функции*/

function openPopupAll (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}

// Функция закрытия попапа через Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
}

// Попап с профилем закрытие 
 function closePopup(popupClouse) {
    document.removeEventListener('keydown', closePopupEsc);  // удаляй ненужные слушатели
    popupClouse.classList.remove('popup_open');
}

// Редактирование текста профиля 
function addTextSubtitle(evt) {
  evt.preventDefault();
  title.textContent = popupInputName.value;
  subtitle.textContent = popupInputDescription.value;
  closePopup (popupProfiel);
}

function createCard(item) {
  const card = new Card(item, cardTemplate, setNewCard);
  const newCard = card.createCard();
  return newCard;
}

const setNewCard = (cardImage, cardText) => {
  pictureAssignImageCard.src = cardImage.src;
  pictureAssignImageCard.alt = cardImage.alt;
  pictureAssignPlaceCard.textContent = cardText.textContent;
  openPopupAll(popupFullscreen);
};

// Функция перебора массива карточек
initialCards.forEach ((item) => {
  sendCard(item);
})

//отправка формы
function sendPlaceInfo (event) {
  event.preventDefault();
  const testValidForm = resetValidationForm(popupFormAdd);
  const flashData = {
    name: popupInputPlace.value,
    link: popupInputImage.value
  }
  sendCard(flashData);
  closePopup(popupAdd);
  popupFormAdd.reset(); 
};

//функция передачи элемента
function sendCard(element) {
  moreCard.prepend(createCard(element));
}

function validationForm (formElement) {
  const validForm = new FormValidator (settingsInput, formElement);
  validForm.enableValidation();
  return validForm;
}

function resetValidationForm (formElement) {
  const popupFormValid = new FormValidator (settingsInput, formElement);
  popupFormValid.resetValidation();
  return popupFormValid;
}
/*4.Обработчики*/

//открытие попапа
buttonAdd.addEventListener('click', (event) => {
  openPopupAll(popupAdd); 
});

buttonOpenPopup.addEventListener('click', (event) => {
  openPopupAll(popupProfiel)
});

//закрытие попапа кликом на оверлей
popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
  popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
    const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-down')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
    closePopup(popup); // если один из классов присутствует, то закрываем попап
    }
  })
})

//отправка формы
popupForm.addEventListener('submit', addTextSubtitle);
popupFormAdd.addEventListener('submit', sendPlaceInfo);




