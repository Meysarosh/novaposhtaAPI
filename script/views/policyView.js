import View from "./extendView.js";

class PolicyView extends View {
  parentElement = document.querySelector(".popup__window");

  generateView() {
    return `<button class="popup__close">&times;</button>
    <div class="policy">
  <h2 class="policy__header">Our shop policy:</h2>
  <ol class="policy__list">
    <li class="policy__list__item">General Therms:</li><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, expedita nulla aliquid libero, quasi quae doloremque, explicabo ab consectetur minima ad unde facilis itaque nam necessitatibus nemo magni accusantium odit?</p>
    <li class="policy__list__item">Payment:</li><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, expedita nulla aliquid libero, quasi quae doloremque, explicabo ab consectetur minima ad unde facilis itaque nam necessitatibus nemo magni accusantium odit?</p>
    <li class="policy__list__item">Shipping:</li><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, expedita nulla aliquid libero, quasi quae doloremque, explicabo ab consectetur minima ad unde facilis itaque nam necessitatibus nemo magni accusantium odit?</p>
  </ol>
</div>
    `;
  }
}
export default new PolicyView();
