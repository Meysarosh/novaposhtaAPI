import View from "./extendView.js";

class OrderView extends View {
  parentElement = document.querySelector(".popup__window");

  enterCityName(control) {
    document
      .querySelector(".order__input")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        let input = document.querySelector(".order__input--form").value.trim();
        if (input.length < 3) {
          document.querySelector(".order__response").innerHTML = `
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
    let total = 0;
    let quantity = 0;
    return `
    <button class="popup__close">&times;</button>
    <div class="order">
            <div class="order__message">Here you can complete your order:</div>
            ${this.data
              .map((obj, i) => {
                total += obj.price * obj.quantity;
                quantity += obj.quantity;
                return `
                <div class="order__item">
                <p class="order__item__info">${i + 1}. ${obj.name}</p>
                <p class="order__item__price">$${obj.price}</p>

                <p class="order__item__quantity">x ${obj.quantity}</p>
            
                </div>`;
              })
              .join("")}
            <div class="order__total">${quantity} ${
      quantity == 1 ? "item" : "items"
    } of total price: <span class="order__total__price">$${total.toFixed(
      2
    )}<span>
            </div>
            <div class="order__step">
                <div class="order__message">Step 1: specify your city to claculate shipping cost.</div>
                <form class="order__input">
                <input
                    type="text"
                    class="order__input--form"
                    placeholder="Київ"
                />
                <button type="submit" class="order__input--submit">NEXT &rarr;</button>
                </form>
                <div class="order__description-2">
                <h3>
                    (Note: City must be located in Ukraine and written only in Ukrainian! E.g.: львів)
                </h3>
                </div>
            </div>    
    </div>`;
  }
}
export default new OrderView();
