const popup = document.querySelector(".popup");
const popupWindow = document.querySelector(".popup__window");
const shop = document.querySelector(".shop");

shop.addEventListener("click", function (el) {
  el.preventDefault;
  if (!el.target.classList.contains("shop__tov")) return;
  // popup.style.display = "block";
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
  popupWindow.style.transform = "translate(-50%, -50%) scale(1)";
});
popup.addEventListener("click", function (el) {
  el.preventDefault();
  if (!el.target.classList.contains("popup__close")) return;
  // popup.style.display = "none";
  popup.style.opacity = "0";
  popup.style.visibility = "hidden";
  popupWindow.style.transform = "translate(-50%, -50%) scale(0.5)";
});
