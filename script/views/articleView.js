class ArticleView {
  data;
  parentElement = document.querySelector(".popup__window");
  cartBtn = document.querySelector(".article__order-box__btn");

  render(data) {
    this.data = data;
    const markup = this.generateView();
    this.clearAndPaste(markup);
  }
  clearAndPaste(markup) {
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //cart btn
  cartBtnListener(control) {
    document
      .querySelector(".article__order-box__btn")
      .addEventListener("click", function (e) {
        control();
      });
  }
  changeBtn(quantity) {
    document.querySelector(
      ".article__order-box__btn__text"
    ).innerHTML = `${quantity} ${quantity == 1 ? "pc" : "pcs"} IN CART`;
    document.querySelector(".article__order-box__btn").style.color = "black";
    document.querySelector(".article__order-box__btn").style.border =
      "1px solid black";
    document.querySelector(".article__order-box__btn__icon").style.fill =
      "black";
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

    const nextImg = function () {
      Math.abs(position) + 1 < slides.length ? position-- : (position = 0);
      goToSlide();
      return position;
    };

    const prevImg = function () {
      position == 0 ? (position = 0 - slides.length + 1) : position++;
      goToSlide();
      return position;
    };

    goToSlide();
    sliderBtnRight.addEventListener("click", nextImg);
    sliderBtnLeft.addEventListener("click", prevImg);
    dotsContainer.addEventListener("click", function (el) {
      if (!el.target.classList.contains("article__dots__dot")) return;
      position = 0 - +el.target.dataset.slide;
      goToSlide();
      return position;
    });
    document.addEventListener("keydown", function (event) {
      event.key == "ArrowRight" && nextImg();
      event.key == "ArrowLeft" && prevImg();
    });
    //////////tuochscreen slider
    let touchstart;
    let touchend;
    document
      .querySelector(".article__slider")
      .addEventListener("touchstart", function (e) {
        touchstart = e.changedTouches[0].clientX;
      });
    document
      .querySelector(".article__slider")
      .addEventListener("touchend", function (e) {
        touchend = e.changedTouches[0].clientX;

        if (touchstart - touchend > 60) nextImg();
        if (touchstart - touchend < -60) prevImg();
      });
    /////////////////////
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
        <div class="article__order-box__price">Price: $${this.data.price}</div>
        <button class="article__order-box__btn">
          <svg class="article__order-box__btn__icon">
            <use xlink:href="img/symbol.svg#icon-shopping-cart"></use>
          </svg>
          <span class="article__order-box__btn__text">ADD TO CART</span>
        </button>
      </div>
      <div class="article__details">
        <p class="article__details__text">Size: ${this.data.size}</p>
        <p class="article__details__text">
        ${this.data.details}
        </p>
      </div>
    </div>`;
  }
}
export default new ArticleView();
