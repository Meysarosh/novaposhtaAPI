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
      if (!e.target.classList.contains("filter-apply")) return;
      control();
      let info = document.querySelectorAll("input.helper");
      let colorFilter = [];
      let typeFilter = [];
      let sizeFilter = [];

      info.forEach((el, i) => {
        if (el.checked == true && i < 7) colorFilter.push(el.name);
        if (el.checked == true && i >= 7 && i < 10) typeFilter.push(el.name);
        if (el.checked == true && i >= 10) sizeFilter.push(el.name);
      });

      console.log(colorFilter, typeFilter, sizeFilter);
    });
  }
  generateView() {
    return `
    <div class="filter__color">
    Color:
    <div>
      <input class="helper" type="checkbox" id="beige" name="beige" />
      <label class="helper" for="beige">beige</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="black" name="black" />
      <label class="helper" for="black">black</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="blue" name="blue" />
      <label class="helper" for="blue">blue</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="coral" name="coral" />
      <label class="helper" for="coral">coral</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="green" name="green" />
      <label class="helper" for="green">green</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="grey" name="grey" />
      <label class="helper" for="grey">grey</label>
    </div>
    <div>
      <input
        class="helper"
        type="checkbox"
        id="fuchsia"
        name="fuchsia"
      />
      <label class="helper" for="fuchsia">fuchsia</label>
    </div>
  </div>

  <div class="filter__type">
    Type:
    <div>
      <input class="helper" type="checkbox" id="hard" name="hard" />
      <label class="helper" for="hard">hard</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="soft" name="soft" />
      <label class="helper" for="soft">soft</label>
    </div>
  </div>

  <div class="filter__size">
    Size:
    <div>
      <input class="helper" type="checkbox" id="small" name="small" />
      <label class="helper" for="small">small</label>
    </div>
    <div>
      <input
        class="helper"
        type="checkbox"
        id="medium"
        name="medium"
      />
      <label class="helper" for="medium">medium</label>
    </div>
    <div>
      <input class="helper" type="checkbox" id="large" name="large" />
      <label class="helper" for="large">large</label>
    </div>
  </div>
  <button class="filter-apply">apply</button>`;
  }
}
export default new FilterView();
