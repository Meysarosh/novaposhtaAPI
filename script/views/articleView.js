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

  ///slider

  generateSlide() {
    const dotsContainer = document.querySelector(".article__dots");
    const dots = document.querySelectorAll(".article__dots__dot");
    const slides = document.querySelectorAll(".article__slider-img");
    const sliderBtnLeft = document.querySelector(
      ".article__slider-button--left"
    );
    const sliderBtnRight = document.querySelector(
      ".article__slider-button--right"
    );
    let position = 0;

    const goToSlide = function () {
      slides.forEach(function (slide, i) {
        slide.style.transform = `translateX(${(position + i) * 100}%)`;
      });
      if (document.querySelector(".article__dots__dot--active"))
        document
          .querySelector(".article__dots__dot--active")
          .classList.remove("article__dots__dot--active");
      dots[Math.abs(position)].classList.add("article__dots__dot--active");
    };
    goToSlide();

    sliderBtnRight.addEventListener("click", function () {
      Math.abs(position) + 1 < slides.length ? position-- : (position = 0);
      goToSlide();
      return position;
    });
    sliderBtnLeft.addEventListener("click", function () {
      position == 0 ? (position = 0 - slides.length + 1) : position++;
      goToSlide();
      return position;
    });
    dotsContainer.addEventListener("click", function (el) {
      if (!el.target.classList.contains("article__dots__dot")) return;
      position = 0 - +el.target.dataset.slide;
      goToSlide();
      return position;
    });
  }
  ///
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
        ${this.data.img.map(
          (el, i) => `<img
        src="${this.data.img[i]}"
        alt="front-view"
        class="article__slider-img"
      />`
        )}
        
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
      ${this.data.img
        .map(
          (el, i) =>
            `<button class="article__dots__dot" data-slide="${i}"></button>`
        )
        .join("")}
        
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
