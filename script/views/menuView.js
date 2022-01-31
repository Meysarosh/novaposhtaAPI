class MenuView {
  menuBtn = document.querySelector(".menu-header__btn");

  menuBtnClick() {
    this.menuBtn.addEventListener("click", function () {
      const menu = document.querySelector(".menu");
      document.querySelector(".menu").style.visibility = "visible";
      document.querySelector(".menu").style.transform =
        "translate(-50%, -50%) scale(1)";
      menu.style.opacity = "1";

      document
        .querySelector(".menu__close")
        .addEventListener("click", function () {
          document.querySelector(".menu").style.visibility = "hidden";
          document.querySelector(".menu").style.transform =
            "translate(-50%, -50%) scale(0.5)";
          menu.style.opacity = "0";
        });
    });
  }
}
export default new MenuView();
