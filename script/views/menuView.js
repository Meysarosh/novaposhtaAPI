class MenuView {
  menuBtn = document.querySelector(".menu-header__btn");
  menu = document.querySelector(".menu");

  menuBtnClick(control) {
    this.menuBtn.addEventListener("click", function () {
      control("show");
      document
        .querySelector(".menu__close")
        .addEventListener("click", function () {
          control("hide");
        });
      document
        .querySelector(".menu-cart")
        .addEventListener("click", function () {
          control("cart");
        });
      document
        .querySelector(".menu-contacts")
        .addEventListener("click", function () {
          control("contacts");
        });
      document
        .querySelector(".menu-policy")
        .addEventListener("click", function () {
          control("policy");
        });
      document
        .querySelector(".menu-check")
        .addEventListener("click", function () {
          control("check");
        });
    });
  }
  showMenu() {
    this.menu.style.visibility = "visible";
    this.menu.style.transform = "translate(-50%, -50%) scale(1)";
    this.menu.style.opacity = "1";
  }
  hideMenu() {
    this.menu.style.visibility = "hidden";
    this.menu.style.transform = "translate(-50%, -50%) scale(0.5)";
    this.menu.style.opacity = "0";
  }
  goToContacts() {
    document.querySelector(".footer").scrollIntoView({ behavior: "smooth" });
  }
}
export default new MenuView();
