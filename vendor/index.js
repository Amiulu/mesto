const popupElement = document.querySelector('.popup');  
const popupConteiner = popupElement.querySelector('.popup__container');
const buttonClosePopup = popupElement.querySelector('.popup__close-button'); 
const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonSavePopup = popupElement.querySelector('.popup__save-button');
let nameInput = popupElement.querySelector('.popup__subtitle');
let description = popupElement.querySelector('.popup__subtitle-description');
let title = document.querySelector('.profile__taitle');
let subtitle = document.querySelector('.profile__subtaitle');

let activeHurt = document.querySelectorAll('.element__hurt').forEach (activeHurt => { 
    activeHurt.addEventListener('click', function () {
        activeHurt.classList.toggle('element__hurt_active');
    });
});

buttonOpenPopup.addEventListener('click', function() {
    popupElement.classList.add('popup__open');
});

const closePopup = function () {
    popupElement.classList.remove('popup__open');
}
buttonClosePopup.addEventListener('click', closePopup);


const closePopupOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup ();
    }
}
popupElement.addEventListener('click', closePopupOverlay);

function addTextSubtitle(evt){
evt.preventDefault();
title.textContent = nameInput.value;
subtitle.textContent = description.value;
closePopup();
}

popupConteiner.addEventListener('submit', addTextSubtitle);
buttonSavePopup.addEventListener('click', closePopupOverlay);