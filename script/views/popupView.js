class PopupView {
  popup = document.querySelector(".popup");
  popupWindow = document.querySelector(".popup__window");

  popupCall() {
    this.popup.style.visibility = "visible";
    this.popup.style.opacity = "1";
    this.popupWindow.style.transform = "translate(-50%, -50%) scale(1)";
  }
  hidePopup() {
    this.popupWindow.style.transform = "translate(-50%, -50%) scale(0.5)";
    this.popup.style.opacity = "0";
    this.popup.style.visibility = "hidden";
  }
  closePopup(control) {
    this.popup.addEventListener("click", function (el) {
      if (
        el.target.classList.contains("popup") ||
        el.target.classList.contains("popup__close")
      )
        control();
    });
  }
}
export default new PopupView();
