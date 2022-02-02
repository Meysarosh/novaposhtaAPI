export default class View {
  data;

  render(data) {
    this.data = data;
    const markup = this.generateView();
    this.clearAndPaste(markup);
  }
  clearAndPaste(markup) {
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
