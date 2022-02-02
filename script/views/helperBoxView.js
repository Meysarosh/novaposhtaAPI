class HelperBoxView {
  parentElement = document.querySelector(".helper__box");

  showBox() {
    this.parentElement.style = `
    visibility: visible;
    padding: 1rem;
    margin-bottom: 2rem;`;
  }
  hideBox() {
    this.parentElement.style = `
    visibility: hidden;
    padding: 0;
    margin-bottom: 0;
    height: 0;`;
    document.querySelector(".filter-apply").style.display = "none";
  }
}
export default new HelperBoxView();
