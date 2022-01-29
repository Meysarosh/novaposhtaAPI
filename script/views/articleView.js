class ArticleView {
  data;
  parentElement = document.querySelector(".popup__window");
  render(data) {
    this.data = data;
    const markup = this.generateView();
    this.clearAndPaste(markup);
  }
  clearAndPaste(markup) {
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  generateView() {
    return `
    <button class="popup__close">&times;</button>
    <div class="article">
      <div class="article__title">${this.data.name}</div>
      <div class="article__slider">
        <button
          class="article__slider-button article__slider-button--left"
        >
          <svg class="article__icon">
            <use
              xlink:href="img/symbol.svg#icon-chevron-with-circle-left"
            ></use>
          </svg>
        </button>
        <img
          src="${this.data.img[0]}"
          alt="front-view"
          class="article__slider-img"
        />

        <button
          class="article__slider-button article__slider-button--right"
        >
          <svg class="article__icon">
            <use
              xlink:href="img/symbol.svg#icon-chevron-with-circle-right"
            ></use>
          </svg>
        </button>
      </div>
      <div class="article__dots">
        <button class="article__dots__dot" data-slide=""></button>
        <button
          class="article__dots__dot article__dots--active"
          data-slide=""
        ></button>
        <button class="article__dots__dot" data-slide=""></button>
      </div>
      <div class="article__order-box">
        <div class="article__order-box__price">$${this.data.price}</div>
        <button class="article__order-box__btn">
          <svg class="article__order-box__btn__icon">
            <use xlink:href="img/symbol.svg#icon-shopping-cart"></use>
          </svg>
          <span class="article__order-box__btn__text">ADD TO CART</span>
        </button>
      </div>
      <div class="article__details">
        <p class="article__details__text">${this.data.size}</p>
        <p class="article__details__text">
        ${this.data.details}
        </p>
      </div>
    </div>`;
  }
}
export default new ArticleView();
