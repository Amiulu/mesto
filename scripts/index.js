//popup
const popupElement = document.querySelector('.popup');  
const popupAdd = document.querySelector('.popup_add');

//poup form
const popupConteiner = popupElement.querySelector('.popup__container');
const popupForm = popupAdd.querySelector('.popup__form');

//button const
const buttonClosePopup = popupElement.querySelector('.popup__close-button'); 
const buttonOpenPopup = document.querySelector('.profile__edit-button');
const submitAddPopup = popupElement.querySelector('.popup__save-button');
const buttonHurt = document.querySelectorAll('.element__hurt');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddClouseButton = popupAdd.querySelector('.popup__close-button_add');
const popupAddButton = popupAdd.querySelector('.popup__add-button');


//input const
const nameInput = popupElement.querySelector('.popup__input_data_name');
const descriptionInput = popupElement.querySelector('.popup__input_data_description');


//Others
const title = document.querySelector('.profile__taitle');
const subtitle = document.querySelector('.profile__subtaitle');
const moreCard = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template')
.content
.querySelector('.element');


/*открываем себя 
Добрый день дорогой проверяющий, я знаю что код ниже похож на деревенский туалет (дыра в полу), но для меня это большой 
прорыв в понимании логики работы и понимания взаимодействия. Так уж получилось что в связи со всеми событиями на меня навалилось много работы,
и с последнего ревью у меня прошло пол года, очень прошу вас писать подробнее как можно исправить существующие ошибки или улучшить код.
Приходится востанавливать все полученные знания заново, спасибо вам за работу!


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
    title.textContent = nameInput.value;
    subtitle.textContent = descriptionInput.value;
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
 const closePopupAdd = function () {
    popupAdd.classList.remove('popup_open');
}
//открытие попап добавления картинки
function openPopupAdd() {
    popupAdd.classList.add('popup_open'); 
}

popupAddClouseButton.addEventListener('click', closePopupAdd);
buttonAdd.addEventListener('click', openPopupAdd);


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
// открытие-закртие фулл скрина 
        const fullscreenPopup = document.querySelector('.photo-fullscreen');
        const fullscreenPicture = fullscreenPopup.querySelector('.popup__image-fullscreen');
        const fullscreenName = fullscreenPopup.querySelector('.popup__title-fullscreen');
        const clouseButttonFullsreen = fullscreenPopup.querySelector('.popup__close-fullscreen');
        cardPath.addEventListener('click', function () {
    fullscreenPopup.classList.add('popup_open');
    fullscreenPicture.src = item.link;
    fullscreenName.textContent = item.name;
});
    clouseButttonFullsreen.addEventListener('click', () => {
        fullscreenPopup.classList.remove('popup_open')
        })
    return oneCard;
};

// Функция перебора массива карточек
function renderCards(){
    initialCards.forEach (newItem => {
        const cardHtml = createCard(newItem);
        moreCard.prepend(cardHtml);
    })
}
renderCards();

//отправка формы
popupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const placeInput = popupAdd.querySelector('.popup__input_data_place').value;
    const imageInput = popupAdd.querySelector('.popup__input_data_image').value;
    const newCard = {
        name: placeInput ,
        link: imageInput
    }
    moreCard.prepend(createCard(newCard));
    closePopupAdd()
    popupForm.reset(); 
});