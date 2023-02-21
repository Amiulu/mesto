export default class Card {
    constructor (item, cardTemplate, setNewCard) {
       this._name = item.name;
       this._link = item.link;
       this.cardTemplate = cardTemplate;
       this.setNewCard = setNewCard;
    }
 
    createCard() {
      this.oneCard = this.cardTemplate.cloneNode(true);
 
      this.cardText = this.oneCard.querySelector('.element__sign');
      this.cardPath  =  this.oneCard.querySelector('.element__image');
 
      this.cardText.textContent = this._name;
      this.cardPath.src = this._link;
      this.cardPath.alt =this._link;
     
      this.buttonHurt = this.oneCard.querySelector('.element__hurt');
      this.trashButton = this.oneCard.querySelector('.element__trash');
     
      this._setEventListener();
      return this.oneCard;
    }
 
    _likeCard() {
      this.buttonHurt.classList.toggle('element__hurt_active');
    }
 
    _deleteCard(event) {
        this.oneCard.remove();
    }
    _setEventListener = () => {
     this.buttonHurt.addEventListener('click', () => this._likeCard());
     this.trashButton.addEventListener('click', () => this._deleteCard());
     this.cardPath.addEventListener('click', () => this.setNewCard(this.cardPath, this.cardText));
    }
}