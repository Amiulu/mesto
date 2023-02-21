import Card from "./card.js";
import { initialCards } from "./cards.js";
import FormValidator from "./inputValidate.js";

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
const buttonHurt = document.querySelectorAll('.element__hurt');
const buttonAdd = document.querySelector('.profile__add-button');
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

//константа для поиска всех попапов
const popupList = Array.from(document.querySelectorAll('.popup'))

function openPopupAll (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}

//закрытие попапа кликом на оверлей
popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
    popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
      const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
        closePopup(popup); // если один из классов присутствует, то закрываем попап
      }
    })
  })

// Функция закрытия попапа через Esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_open');
      closePopup(openedPopup);
    }
  }

/* Попап с профилем закрытие */
 function closePopup (popupClouse) {
    document.removeEventListener('keydown', closePopupEsc);  // удаляй ненужные слушатели
    popupClouse.classList.remove('popup_open');
}

buttonOpenPopup.addEventListener('click', (event) => {
  openPopupAll(popupProfiel)
});

buttonClosePopup.addEventListener('click', (event) => { 
  closePopup(popupProfiel)
});
/* Редактирование текста профиля */
function addTextSubtitle(evt){
    evt.preventDefault();
    title.textContent = popupInputName.value;
    subtitle.textContent = popupInputDescription.value;
    closePopup (popupProfiel);
}
popupForm.addEventListener('submit', addTextSubtitle);


//закрытие попапа добавления картинки
popupAddButtonClouse.addEventListener('click', (event) => {
  closePopup(popupAdd);
});

//открытие попап добавления картинки
buttonAdd.addEventListener('click', (event) => {
  openPopupAll(popupAdd); 
});

function createCard(item) {
  const card = new Card(item, cardTemplate, setNewCard);
  const newCard = card.createCard();
  return newCard;
}

const setNewCard = (cardPath, cardText) => {
  pictureAssignImageCard.src = cardPath.src;
  pictureAssignImageCard.alt = cardPath.alt;
  pictureAssignPlaceCard.textContent = cardText.textContent;
  openPopupAll(popupFullscreen);
};

//Слушатель закрытия фулскрина вынесен за границы создания карточек 
buttonClosePopupImage.addEventListener('click', (event) => {
  closePopup(popupFullscreen);
});

// Функция перебора массива карточек
    initialCards.forEach ((item) => {
        const cardHtml = createCard(item);
        moreCard.prepend(cardHtml);
    })

//отправка формы
popupFormAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const flashData = {
        name: popupInputPlace.value,
        link: popupInputImage.value
    }
    moreCard.prepend(createCard(flashData));
    closePopup(popupAdd)
    popupFormAdd.reset(); 
});

function validationForm (formElement) {
  const validForm = new FormValidator (settingsInput, formElement);
  validForm.enableValidation();
  return validForm;
}
const validationFormProfile = validationForm (popupForm);
const validationFormAddPlace = validationForm (popupFormAdd);