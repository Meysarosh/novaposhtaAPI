import View from "./extendView.js";

class CheckView extends View {
  parentElement = document.querySelector(".popup__window");

  enterCityName(control) {
    document
      .querySelector(".check__input")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        document.querySelector(".check__response").innerHTML = `
      <svg class="cart__btns--clear__icon">
                  <use xlink:href="img/symbol.svg#icon-hour-glass"></use>
                </svg>
      <p class="check__response-text" style="color:rgb(172, 4, 4)">
             Please wait...
              </p>`;
        let input = document.querySelector(".check__input--form").value.trim();
        if (input.length < 3) {
          document.querySelector(".check__response").innerHTML = `
      <p class="check__response-text" style="color:rgb(172, 4, 4)">
             Wrong input! Input must be at least 3 caracters...
              </p>`;
          return;
        }
        let cityName = input[0].toUpperCase() + input.substring(1);
        control(cityName);
      });
  }

  generateView() {
    return `
    <button class="popup__close">&times;</button>
    <div class="check">
            <div class="check__title">
              <h2>
                Here you can check estimated delivery date
              </h2>
            </div>
            <div class="check__description">
              <h3>
                Please enter the name of the city to which you want to deliver:
              </h3>
            </div>
            <form class="check__input">
              <input
                type="text"
                class="check__input--form"
                placeholder="Київ"
              />
              <button type="submit" class="check__input--submit">Request</button>
            </form>
            <div class="check__description-2">
              <h3>
                (Note: City must be located in Ukraine and written only in Ukrainian! E.g.: львів)
              </h3>
            </div>
            <div class="check__response">
              
            </div>
          </div>`;
  }
  generateResponse(cityName, date) {
    let date1 = new Date(date);
    document.querySelector(".check__response").innerHTML = `
      <p class="check__response-text">
                Estimated delivery date of your order to <u>${cityName}</u> is on <u>${
      date1.toDateString().slice(0, 10) +
      "</u>, at <u>" +
      date1.toTimeString().slice(0, 5)
    }</u>
              </p>`;
  }
  errorMessage() {
    document.querySelector(".check__response").innerHTML = `
      <p class="check__response-text" style="color:red">
             Wrong input! Please check your input or there is No such city in Ukraine.
              </p>`;
  }
}
export default new CheckView();
