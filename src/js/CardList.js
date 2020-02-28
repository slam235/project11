//Класс для хранения и отрисовки карточек
export default class CardList {
  constructor(container, card) {
    this.container = container;
    this.card = card; // передаю сюда объект класса с методами new Card();
    this.cards = [];
  }

  addCard(name, link, countLikes, id) {
    const cardElement = this.card.create(name, link, countLikes, id)
    this.cards.push(cardElement);
    this.container.appendChild(cardElement);
    
  }

  render(initialCards) {
    for (let i = 0; i < initialCards.length; i++) {
      let name = initialCards[i].name;
      let link = initialCards[i].link;
      this.addCard(name, link);
    }
  }
}
