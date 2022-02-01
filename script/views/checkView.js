class CheckView {
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

  enterCityName(control) {
    this.parentElement.addEventListener("click", function (e) {
      if (!e.target.classList.contains("check__input--submit")) return;
      let input = document.querySelector(".check__input--form").value.trim();
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
                Here you can check estimated delivery date to your city if you
                order now
              </h2>
            </div>
            <div class="check__description">
              <h3>
                Please enter the name of the city to which you want to deliver:
              </h3>
            </div>
            <div class="check__description-2">
              <h3>
                Important! City must be located in Ukraine and written only in Ukrainian! (Example: Львів)
              </h3>
            </div>
            <div class="check__input">
              <input
                type="text"
                class="check__input--form"
                placeholder="Київ"
              />
              <button type="submit" class="check__input--submit">check</button>
            </div>
            <div class="check__response">
              
            </div>
          </div>`;
  }
  generateResponse(cityName, date) {
    document.querySelector(".check__response").innerHTML = `
      <p class="check__response-text">
                Estimated delivery date of your order to ${cityName} is ${date.slice(
      0,
      16
    )}
              </p>`;
  }
}
export default new CheckView();
