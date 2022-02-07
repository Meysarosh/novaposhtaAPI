class HelperBoxView {
  parentElement = document.querySelector(".helper__box");

  showBox(comand) {
    this.parentElement.style = `
    visibility: visible;
    padding: 1rem;
    height: ${comand == "filter" ? "30rem" : "5rem"};
    margin-bottom: 2rem;
    opacity: 1;`;
  }
  hideBox() {
    this.parentElement.innerHTML = "";
    this.parentElement.style = `
    visibility: hidden;
    padding: 0;
    margin-bottom: 0;
    height: 0;
    opacity: 0;`;
  }
}
export default new HelperBoxView();
