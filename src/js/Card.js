//Класс, создающий карточку
export default class Card {
  constructor(container, popupPicture, Image) {
    this.container = container;
    this.popupPicture = popupPicture;
    this.Image = Image;
    
  }
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }
  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      const cardDelete = event.target.closest('.place-card');
      this.container.removeChild(cardDelete);
    }
  }
  openImage(event) {
    if (event.target.classList.contains('place-card__image')) {
      this.popupPicture.classList.add('popup_is-opened');
      let image = event.target.style.backgroundImage.slice(5, -2);
      this.Image.setAttribute('src', image)
    }
  }
  create(nameValue, linkValue, countLikes, id) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
       <div class="place-card__image">
       <button class="place-card__delete-icon"></button>
       </div>
       <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <button class="place-card__like-icon"></button>
       <span class="place-card__count-like"></span>
       </div>`;
    placeCard.querySelector(".place-card__name").textContent = nameValue;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${linkValue})`;
    placeCard.querySelector(".place-card__count-like").textContent = countLikes;
    placeCard.querySelector(".place-card__image").setAttribute('id', id);
    return placeCard;
  }
  setEventListeners(){
    this.container.addEventListener('click', this.like.bind(this));
    this.container.addEventListener('click', this.remove.bind(this));
    this.container.addEventListener('click', this.openImage.bind(this));
  }
}