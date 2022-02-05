import View from "./extendView.js";

class MainView extends View {
  parentElement = document.querySelector(".shop");
  colors;

  clickArticle(control) {
    this.parentElement.addEventListener("click", function (el) {
      if (!el.target.closest(".shop__article")) return;
      if (el.target.classList.contains("color-box")) return;
      if (el.target.classList.contains("color-div")) return;
      control(el.target.closest(".shop__article").id);
    });
  }
  clickColorDiv(control) {
    this.parentElement.addEventListener("click", function (el) {
      if (!el.target.classList.contains("color-div")) return;
      let nextId = el.target.id;
      let prevId = el.target.closest(".shop__article").id;
      control(prevId, nextId);
    });
  }

  cartPreview(quantity) {
    const itemsincart = document.querySelector(".itemsincart");
    if (quantity == 0) {
      itemsincart.style.visibility = "hidden";
      itemsincart.innerHTML = "";
    } else {
      itemsincart.style.visibility = "visible";
      itemsincart.innerHTML = `<span class="itemsincart__num">${quantity}</span>`;
    }
  }
  filterPreview(quantity) {
    const filtersApplied = document.querySelector(".filtersApplied");
    if (quantity == 0) {
      filtersApplied.style.visibility = "hidden";
      filtersApplied.innerHTML = "";
    } else {
      filtersApplied.style.visibility = "visible";
      filtersApplied.innerHTML = `<span class="filtersApplied__num">${quantity}</span>`;
    }
  }
  logoAndTextClick(control) {
    document.querySelector(".logo").addEventListener("click", function () {
      control();
    });
    document
      .querySelector(".header__text")
      .addEventListener("click", function () {
        control();
      });
  }

  backToTopBtn() {
    //INTERSECTION OBSERVER
    let btn = document.querySelector(".back-to-top__btn");
    let options = {
      root: null,
      rootMargin: `250px`,
      threshold: 0,
    };
    let target = document.querySelector(".header");

    let callback = function (entries, observer) {
      let entry = entries[0];

      if (!entry.isIntersecting) {
        btn.style.visibility = "visible";
      } else {
        btn.style.visibility = "hidden";
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(target);
    ///ONCLICK EVENT LISTENER
    btn.addEventListener("click", function () {
      target.scrollIntoView({ behavior: "smooth" });
    });
  }

  footerMenu(control) {
    document
      .querySelector(".footer__menu")
      .addEventListener("click", function (e) {
        if (e.target.classList.contains("menu-cart")) control("cart");
        if (e.target.classList.contains("menu-check")) control("check");
        if (e.target.classList.contains("menu-policy")) control("policy");
      });
  }

  generateView() {
    if (this.data.length == 0) {
      return this.generateMessage();
    } else {
      let firstColor = [];
      let leftColors = [];
      this.data.forEach(function (el, i, arr) {
        if (firstColor.find((obj) => obj.id.slice(0, 6) == el.id.slice(0, 6)))
          return;
        let curArr = arr.filter(
          (obj) => obj.id.slice(0, 6) == el.id.slice(0, 6)
        );
        firstColor.push(curArr[0]);
        if (curArr.length > 1) leftColors.push(curArr);
      });
      this.colors = leftColors;
      return firstColor.map(this.generateArticle).join("");
    }
  }
  generateColorDivs() {
    this.colors.forEach((arr) => {
      let curId = arr[0].id.slice(0, 6);
      document.getElementById(`${curId}box`).innerHTML = arr
        .map(
          (el) =>
            `<div id="${el.id}" class="color-div color-div--${el.color}">
            <img src="${el.img[0]}" alt="fantom" class="color-div-img">
            </div>`
        )
        .join("");
    });
  }

  generateArticle(article) {
    return `
          <div class="shop__article" id="${article.id}">
            <svg class="shop__article__icon shop__article__icon-hidden">
              <use xlink:href="img/symbol.svg#icon-shopping-cart"></use>
            </svg>
            
            <img
              src="${article.img[0]}"
              alt="front-view"
              class="shop__article-img"
            />
            
            <div id="${article.id.slice(0, 6)}box" class="color-box" "></div>
            <div class="shop__article-title">${article.name}</div>
            <div class="shop__article-data">${article.dimensions}</div>
            <div class="shop__article-price">$${article.price}</div>
          </div>
          `;
  }
  replaceArticle(article) {
    return `
            <svg class="shop__article__icon shop__article__icon-hidden">
              <use xlink:href="img/symbol.svg#icon-shopping-cart"></use>
            </svg>
            
            <img
              src="${article.img[0]}"
              alt="front-view"
              class="shop__article-img"
            />
            
            <div id="${article.id.slice(0, 6)}box" class="color-box" "></div>
            <div class="shop__article-title">${article.name}</div>
            <div class="shop__article-data">${article.dimensions}</div>
            <div class="shop__article-price">$${article.price}</div>
          `;
  }
  generateMessage() {
    return `<h2>Sorry, <br> there is no result that matches Your search...<br>Click on logo to reload.</h2>`;
  }
}
export default new MainView();
