import View from "./extendView.js";
class FilterView extends View {
  parentElement = document.querySelector(".helper__box");

  filterCall(control) {
    document
      .querySelector(".helper__btns__filter__btn")
      .addEventListener("click", function () {
        control();
      });
  }
  applyBtn(control) {
    this.parentElement.addEventListener("click", function (e) {
      if (
        !e.target.classList.contains("filter__btns--apply") &&
        !e.target.classList.contains("filter__btns--clear")
      )
        return;
      let info = document.querySelectorAll("input.helper");
      let colorFilter = [];
      let typeFilter = [];
      let sizeFilter = [];

      if (e.target.classList.contains("filter__btns--apply")) {
        info.forEach((el, i) => {
          if (el.checked == true && i < 7) colorFilter.push(el.name);
          if (el.checked == true && i >= 7 && i < 9) typeFilter.push(el.name);
          if (el.checked == true && i >= 9) sizeFilter.push(el.name);
        });
      }
      if (e.target.classList.contains("filter__btns--clear")) {
        colorFilter = [];
        typeFilter = [];
        sizeFilter = [];
      }
      // console.log(colorFilter, typeFilter, sizeFilter);
      control(colorFilter, typeFilter, sizeFilter);
    });
  }
  generateView() {
    const colors = [
      "beige",
      "black",
      "blue",
      "coral",
      "green",
      "grey",
      "burgundy",
    ];
    const types = ["hard", "soft"];
    const sizes = ["small", "medium", "large"];

    return `
    <div class="filter__color">
    Colours:
    ${colors
      .map(
        (color) => `<div>
    <input class="helper" type="checkbox" id="${color}" name="${color}" ${
          this.data.find((el) => el == color) ? "checked" : ""
        } />
    <label class="helper" for="${color}">${color}</label>
  </div>`
      )
      .join("")}
  </div>

  <div class="filter__type">
    Types:
${types
  .map(
    (type) => `<div>
<input class="helper" type="checkbox" id="${type}" name="${type}" ${
      this.data.find((el) => el == type) ? "checked" : ""
    }/>
<label class="helper" for="${type}">${type}</label>
</div>`
  )
  .join("")}
  </div>

  <div class="filter__size">
    Sizes:
    ${sizes
      .map(
        (size) => `<div>
    <input class="helper" type="checkbox" id="${size}" name="${size}" ${
          this.data.find((el) => el == size) ? "checked" : ""
        }/>
    <label class="helper" for="${size}">${size}</label>
  </div>`
      )
      .join("")}
    
  </div>
  <div class="filter__btns">
  <button class="filter__btns--apply">apply</button>
  ${
    this.data.length > 0
      ? ` <button class="filter__btns--clear">clear</button>`
      : ""
  }
  </div>`;
  }
}
export default new FilterView();
