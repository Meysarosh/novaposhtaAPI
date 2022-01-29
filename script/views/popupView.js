class PopupView {
  popup = document.querySelector(".popup");
  popupWindow = document.querySelector(".popup__window");
  popupCloseBtn = document.querySelector(".popup__close");

  popupCall() {
    this.popup.style.visibility = "visible";
    this.popup.style.opacity = "1";
    this.popupWindow.style.transform = "translate(-50%, -50%) scale(1)";

    this.popup.addEventListener("click", function (el) {
      if (!el.target.classList.contains("popup__close")) return;
      document.querySelector(".popup__window").style.transform =
        "translate(-50%, -50%) scale(0.5)";
      document.querySelector(".popup").style.opacity = "0";
      document.querySelector(".popup").style.visibility = "hidden";
    });
  }
}
export default new PopupView();
