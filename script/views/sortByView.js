import View from "./extendView.js";
class SortByView extends View {
  parentElement = document.querySelector(".helper__box");

  sortByCall(control) {
    document
      .querySelector(".helper__btns__sortby__btn")
      .addEventListener("click", function () {
        control();
      });
  }
  sortByBtns(control) {
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("helper__box-btns")) return;
      if (e.target.classList.contains("price-acs")) control("price-acs");
      if (e.target.classList.contains("price-des")) control("price-des");
      if (e.target.classList.contains("capacity-acs")) control("capacity-acs");
      if (e.target.classList.contains("capacity-des")) control("capacity-des");
    });
  }
  generateView() {
    return `
    <div class="sortby">
  <button class="price-acs helper__box-btns">price &uarr;</button>
  <button class="price-des helper__box-btns">price &darr;</button>
  <button class="capacity-acs helper__box-btns">capacity &uarr;</button>
  <button class="capacity-des helper__box-btns">capacity &darr;</button>
  </div>`;
  }
}
export default new SortByView();
