class PopupView {
  popup = document.querySelector(".popup");
  popupWindow = document.querySelector(".popup__window");
  popupCloseBtn = document.querySelector(".popup__close");

  popupCall() {
    this.popup.style.visibility = "visible";
    this.popup.style.opacity = "1";
    this.popupWindow.style.transform = "translate(-50%, -50%) scale(1)";

    const closePopup = function () {
      document.querySelector(".popup__window").style.transform =
        "translate(-50%, -50%) scale(0.5)";
      document.querySelector(".popup").style.opacity = "0";
      document.querySelector(".popup").style.visibility = "hidden";
    };
    this.popup.addEventListener("click", function (el) {
      if (!el.target.classList.contains("popup__close")) return;
      closePopup();
    });
    this.popup.addEventListener("click", function (el) {
      if (el.target.classList.contains("popup")) closePopup();
    });
  }
}
export default new PopupView();
