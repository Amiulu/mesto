//popup
const popupElement = document.querySelector('.popup');  
const popupAdd = document.querySelector('.popup_type_add');
const fullscreenPopup = document.querySelector('.popup_type_photo-fullscreen');

//poup form
const popupConteiner = popupElement.querySelector('.popup__container');
const popupForm = popupElement.querySelector('.popup__form');
const popupFormAdd = popupAdd.querySelector('.popup__form-add')

//button const
const buttonClosePopup = popupElement.querySelector('.popup__close-button'); 
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


/*открываем себя 
Евгений спасибо за ваши комментарии!


 Попап с профилем открытие */
const openPopup = function() {
    popupElement.classList.add('popup_open');
    document.addEventListener('keydown', ClosePopupEsc);
    popupElement.addEventListener('click', ClosePopupOverlay);
    nameInput.value = title.textContent;
    descriptionInput.value = subtitle.textContent;
};

// Функция закрытия попапа через Esc
function ClosePopupEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_open');
      closePopup(openedPopup);
    }
  }
// Функция закрытия попапа кликом на оверлей
  function ClosePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  }

/* Попап с профилем закрытие */
buttonOpenPopup.addEventListener('click', openPopup);
const closePopup = function () {
    popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', ClosePopupEsc);
    popupElement.removeEventListener('click', ClosePopupOverlay);
}

/* Редактирование текста профиля */
buttonClosePopup.addEventListener('click', closePopup);
function addTextSubtitle(evt){
    evt.preventDefault();
    const nameInput = popupElement.querySelector('.popup__input_data_name').value;
    const descriptionInput = popupElement.querySelector('.popup__input_data_description').value;
    title.textContent = nameInput;
    subtitle.textContent = descriptionInput;
closePopup();
}

popupForm.addEventListener('submit', addTextSubtitle);

/* работа с массивом карточек ------------------------------*/
const initialCards = [
    {
      name: 'Алтайские просторы',
      link: 'https://images.unsplash.com/photo-1662503792746-2e1d3af41b7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1992&q=80'
    },
    {
      name: 'Карельская глушь',
      link: 'https://images.unsplash.com/photo-1673646384080-0dd8da7edf2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Деревня Бизяр',
      link: 'https://images.unsplash.com/photo-1599140182177-45d2184c4844?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'Гора Шаманка',
      link: 'https://images.unsplash.com/photo-1605639743310-db006cc1b95a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Топи севера',
      link: 'https://images.unsplash.com/photo-1623430618732-6df749201127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Дикий восток',
      link: 'https://images.unsplash.com/photo-1567687311355-9280c6bc4b0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    }
  ];
//закрытие попапа добавления картинки
popupAddClouseButton.addEventListener('click', () => {
    popupAdd.classList.remove('popup_open');
});
//открытие попап добавления картинки
buttonAdd.addEventListener('click', () => {
    popupAdd.classList.add('popup_open'); 
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
    cardPath.addEventListener('click', function () {
    fullscreenPopup.classList.add('popup_open');
    fullscreenPicture.src = item.link;
    fullscreenName.textContent = item.name;
});
    return oneCard;
};
//Слушатель закрытия фулскрина вынесен за границы создания карточек 
function clouseFullscreen() {
        fullscreenPopup.classList.remove('popup_open')
        }
clouseButttonFullsreen.addEventListener('click', clouseFullscreen);

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