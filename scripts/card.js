export default class Card {
  constructor (item, cardTemplate, setNewCard) {
      this._name = item.name;
      this._link = item.link;
      this.cardTemplate = cardTemplate;
      this.setNewCard = setNewCard;
  }

  createCard() {
    this._сardElement = this.cardTemplate.cloneNode(true);
 
    this._cardText = this._сardElement.querySelector('.element__sign');
    this._cardImage  =  this._сardElement.querySelector('.element__image');

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt =this._link;
    
    this._buttonHurt = this._сardElement.querySelector('.element__hurt');
    this._trashButton = this._сardElement.querySelector('.element__trash');
    
    this._setEventListener();
    return this._сardElement;
  }

  _likeCard() {
    this._buttonHurt.classList.toggle('element__hurt_active');
  }

  _deleteCard() {
    this._сardElement.remove();
    this._сardElement = null;
  }

  _setEventListener = () => {
    this._buttonHurt.addEventListener('click', () => this._likeCard());
    this._trashButton.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this.setNewCard(this._cardImage, this._cardText));
  }
}