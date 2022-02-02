class SearchBoxView {
  searchBtn = document.querySelector(".search");

  searchBoxCall() {
    this.searchBtn.addEventListener("click", function () {
      const searchBox = document.querySelector(".search-box");
      searchBox.style.visibility = "visible";
      searchBox.style.height = "5rem";
    });
  }

  searchFor(control) {
    document
      .querySelector(".search-box")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let searchBoxInput = document.querySelector(".search-box__input").value;
        control(searchBoxInput);
      });
  }
}
export default new SearchBoxView();
