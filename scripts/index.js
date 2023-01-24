//popup
const popupElement = document.querySelector('.popup');
const popupProfiel = document.querySelector('.popup_type_profiel')
const popupAdd = document.querySelector('.popup_type_add');
const fullscreenPopup = document.querySelector('.popup_type_photo-fullscreen');

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
const popupAddClouseButton = popupAdd.querySelector('.popup__close-button_add');
const popupAddButton = popupAdd.querySelector('.popup__add-button');
const clouseButttonFullsreen = fullscreenPopup.querySelector('.popup__close-fullscreen');


//input const
const nameInput = popupElement.querySelector('.popup__input_data_name');
const descriptionInput = popupElement.querySelector('.popup__input_data_description');
const placeInput = popupAdd.querySelector('.popup__input_data_place');
const imageInput = popupAdd.querySelector('.popup__input_data_image');


//Others
const title = document.querySelector('.profile__taitle');
const subtitle = document.querySelector('.profile__subtaitle');
const moreCard = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template')
.content
.querySelector('.element');
const fullscreenPicture = fullscreenPopup.querySelector('.popup__image-fullscreen');
const fullscreenName = fullscreenPopup.querySelector('.popup__title-fullscreen');

//константа для поиска всех попапов
const popupList = Array.from(document.querySelectorAll('.popup'))

//открываем себя 
//Евгений спасибо за ваши комментарии!

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
    title.textContent = nameInput.value;
    subtitle.textContent = descriptionInput.value;
    closePopup (popupProfiel);
}
popupForm.addEventListener('submit', addTextSubtitle);


//закрытие попапа добавления картинки
popupAddClouseButton.addEventListener('click', (event) => {
  closePopup(popupAdd);
});
//открытие попап добавления картинки
buttonAdd.addEventListener('click', (event) => {
  openPopupAll(popupAdd); 
});

// Функция создания карточки + взаимодействие с созданнной картой 
function createCard(item) {
    const oneCard = cardTemplate.cloneNode(true);
    const cardText = oneCard.querySelector('.element__sign');
    cardText.textContent = item.name;
    const cardPath  =  oneCard.querySelector('.element__image');
    cardPath.alt = item.name;
    cardPath.src = item.link;
// внутри создаваемых карточек нашли элемент лайка + слушатель
    const buttonHurt = oneCard.querySelector('.element__hurt');
    buttonHurt.addEventListener('click', function () {
        buttonHurt.classList.toggle('element__hurt_active');
    });
// внутри создаваемых карточек нашли помойку + слушатель
    const trashButton = oneCard.querySelector('.element__trash');
        trashButton.addEventListener('click', function( event ) {
            event.target.closest('.element').remove();
        })
// открытие-закртие фулл скрина присвоение значений
    cardPath.addEventListener('click', (event) => {
    openPopupAll(fullscreenPopup);
    fullscreenPicture.src = item.link;
    fullscreenName.textContent = item.name;
});
    return oneCard;
};
//Слушатель закрытия фулскрина вынесен за границы создания карточек 
clouseButttonFullsreen.addEventListener('click', (event) => {
  closePopup(fullscreenPopup);
});

// Функция перебора массива карточек
function renderCards(){
    initialCards.forEach (newItem => {
        const cardHtml = createCard(newItem);
        moreCard.prepend(cardHtml);
    })
}
renderCards();

//отправка формы
popupFormAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = {
        name: placeInput.value,
        link: imageInput.value
    }
    moreCard.prepend(createCard(newCard));
    closePopupAdd()
    popupForm.reset(); 
});