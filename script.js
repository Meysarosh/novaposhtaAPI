// function capitalize(word) {
//     return word[0].toUpperCase() + word.substring(1).toLowerCase();
// }
const header = document.querySelector(".header");
const main = document.querySelector(".main");

header.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("btn")) return;
  header.style.opacity = "0";
  header.style.visibility = "hidden";
  main.style.visibility = "visible";
  main.style.opacity = "1";
});
