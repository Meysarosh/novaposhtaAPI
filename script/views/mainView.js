import View from "./extendView.js";

class MainView extends View {
  parentElement = document.querySelector(".shop");

  clickArticle(control) {
    this.parentElement.addEventListener("click", function (el) {
      if (!el.target.closest(".shop__article")) return;
      control(el.target.closest(".shop__article").dataset.id);
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
    return this.data.map(this.generateArticle).join("");
  }

  generateArticle(article) {
    return `
          <div class="shop__article" data-id="${article.id}">
            <img
              src="${article.img[0]}"
              alt="front-view"
              class="shop__article-img"
            />
            <div class="shop__article-title">${article.name}</div>
            <div class="shop__article-data">${article.dimensions}</div>
            <div class="shop__article-price">$${article.price}</div>
          </div>`;
  }
}
export default new MainView();
