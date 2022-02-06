import View from "./extendView.js";

class OrderView extends View {
  parentElement = document.querySelector(".popup__window");

  enterCityName(control) {
    document
      .querySelector(".order__input")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        let input = document
          .querySelector(".order__input--form")
          .value.trim()
          .toLowerCase();
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

  enterContactData(control) {
    document
      .querySelector(".order__input--final")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let inputName = document
          .querySelector(".input--name")
          .value.trim()
          .toLowerCase();
        let name = inputName[0].toUpperCase() + inputName.substring(1);
        let phone = document.querySelector(".input--phone").value;
        document.querySelector(".order__step").innerHTML = `
    <div class="order__message">Congratulations!</div>
    <p class="check__response-text">Dear, ${name}, we received and soon will process your order.<br>You always can check your orders in menu/my orders.</p>
    `;
        document.querySelector(".order__response").style.visibility = "visible";
        control(name, phone);
      });
  }
  resultFromStep1(cityName, cost, itemsCost) {
    return `<p>Shipping cost by NovaPoshta to <u>${cityName}</u>: <span class="order__total__price">$${cost.toFixed(
      2
    )}<span></p>
    <p>Total price of your order is<span class="order__total__price">$${(
      itemsCost + cost
    ).toFixed(2)}<span></p>`;
  }

  orderStep2(cityName, date, cost) {
    let date1 = new Date(date);
    let itemsCost = this.data.reduce((acum, el) => {
      acum += el.quantity * el.price;
      return acum;
    }, 0);
    document
      .querySelector(".order__total")
      .insertAdjacentHTML(
        "beforeend",
        this.resultFromStep1(cityName, cost, itemsCost)
      );
    document.querySelector(".order__step").innerHTML = `
    <div class="order__message">Step 2: please, fill in your contact details:</div>
    <form class="order__input--final">
    <input
        type="text"
        class="order__input--form input--name"
        placeholder="Name"
    />
    <input
        type="text"
        class="order__input--form input--phone"
        placeholder="Phone number"
    />
    <button type="submit" class="order__input--submit">SUBMIT</button>
    </form>
    
      `;
    document.querySelector(".order__response").style.visibility = "hidden";
    document.querySelector(".order__response").innerHTML = `
      <p class="check__response-text">
                Estimated delivery date of your order to <u>${cityName}</u> is on <u>${
      date1.toDateString().slice(0, 10) +
      "</u>, at <u>" +
      date1.toTimeString().slice(0, 5)
    }</u>
              </p>`;
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
            <div class="order__total"><p>${quantity} ${
      quantity == 1 ? "item" : "items"
    } of total price: <span class="order__total__price">$${total.toFixed(
      2
    )}<span></p>
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
            <div class="order__response"></div>
    </div>`;
  }
  errorMessage() {
    document.querySelector(".order__response").innerHTML = `
      <p class="check__response-text" style="color:rgb(172, 4, 4)">
             Wrong input! Please check your input or there is No such city in Ukraine.
              </p>`;
  }
}
export default new OrderView();
