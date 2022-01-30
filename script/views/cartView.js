class CartView {
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

  clickCartBtn(control) {
    document
      .querySelector(".shopping-cart__btn")
      .addEventListener("click", function () {
        control();
      });
  }
  clearCartBtn(control) {
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".cart__btns--clear")) return;
      control();
    });
  }
  quantityBtns(control) {
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".cart__item__quantity-btns")) return;
      let id = e.target.closest(".cart__item__quantity-btns").dataset.id;
      let num;
      e.target.classList.contains("btn--plus") ? (num = 1) : (num = -1);
      control(id, num);
    });
  }

  generateView() {
    let total = 0;
    return `
    <button class="popup__close">&times;</button>
      <div class="cart">
            <div class="cart__message">Items in your cart:</div>
            ${this.data
              .map((obj) => {
                total += obj.price * obj.quantity;
                return `<div class="cart__item">
            <img
              src="${obj.img[0]}"
              alt="item photo"
              class="cart__item__img"
            />
            <p class="cart__item__info">${obj.name}</p>
            <p class="cart__item__price">$${obj.price}</p>

            <p class="cart__item__quantity">x ${obj.quantity}</p>
            <div class="cart__item__quantity-btns" >
              <button class="cart__item__quantity-btns btn--plus" data-id="${obj.id}">+</button>
              <button class="cart__item__quantity-btns btn--minus" data-id="${obj.id}">-</button>
            </div>
          </div>`;
              })
              .join("")}
            <div class="cart__total">TOTAL: $${total.toFixed(2)}</div>
            <div class="cart__btns">
              <button class="cart__btns--clear">
                <svg class="cart__btns--clear__icon">
                  <use xlink:href="img/symbol.svg#icon-trash"></use>
                </svg>
                <span class="cart__btns--clear__text">CLEAR CART</span>
              </button>
              <button class="cart__btns--order">
                <svg class="cart__btns--order__icon">
                  <use xlink:href="img/symbol.svg#icon-credit-card"></use>
                </svg>
                <span class="cart__btns--order__text">ORDER</span>
              </button>
            </div>
          </div>`;
  }
}
export default new CartView();
