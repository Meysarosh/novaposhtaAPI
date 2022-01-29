class MainView {
  data;
  parentElement = document.querySelector(".shop");
  render(data) {
    this.data = data;
    const markup = this.generateShop();
    this.clearAndPaste(markup);
  }
  clearAndPaste(markup) {
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clickArticle(control) {
    this.parentElement.addEventListener("click", function (el) {
      if (!el.target.closest(".shop__article")) return;
      control(el.target.closest(".shop__article").dataset.id);
    });
  }

  generateShop() {
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
            <div class="shop__article-data">${article.size}</div>
            <div class="shop__article-price">$${article.price}</div>
          </div>`;
  }
}
export default new MainView();