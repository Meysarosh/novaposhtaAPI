import * as data from "./data.js";
import mainView from "./views/mainView.js";
import articleView from "./views/articleView.js";
import popupView from "./views/popupView.js";
import searchBoxView from "./views/searchBoxView.js";
import cartView from "./views/cartView.js";
import menuView from "./views/menuView.js";
import policyView from "./views/policyView.js";
import checkView from "./views/checkView.js";
//////////////LOCAL STORAGE
const setLocalStorage = function (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};
const getLocalStorage = function () {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return;
  data.state.cart = cart;
};
/////////////////SHOW ARTICLES (from data) IN SHOP
const showShop = function () {
  mainView.render(data.articles);
  getLocalStorage();
  checkCart();
};
//////////////////SHOW ARTICLE ONCLICK
let curArticle;

const openArticle = function (id) {
  [curArticle] = data.articles.filter((article) => article.id == id);
  articleView.render(curArticle);
  popupView.popupCall();
  articleView.generateSlide();

  articleView.cartBtnListener(addToCart);

  if (data.state.cart.find((el) => el.id == curArticle.id)) {
    let index = data.state.cart.findIndex((el) => el.id == curArticle.id);
    articleView.changeBtn(data.state.cart[index].quantity);
  }
};
////////////////////CART FUNCTIONALITY
const generateCart = function () {
  let itemsInCart = [];
  data.state.cart.map((el) => {
    let [item] = data.articles.filter((article) => article.id == el.id);
    item.quantity = el.quantity;
    itemsInCart.push(item);
  });
  cartView.render(itemsInCart);
};
const openCart = function () {
  generateCart();
  popupView.popupCall();
};
const clearCart = function () {
  data.state.cart = [];
  generateCart();
  checkCart();
  setLocalStorage("cart", data.state.cart);
};

const adjustCard = function (id, num) {
  let index = data.state.cart.findIndex((el) => el.id == id);
  data.state.cart[index].quantity += num;
  data.state.cart = data.state.cart.filter((obj) => obj.quantity > 0);
  generateCart();
  checkCart();
  setLocalStorage("cart", data.state.cart);
};

const addToCart = function () {
  if (data.state.cart.find((el) => el.id == curArticle.id)) {
    let index = data.state.cart.findIndex((el) => el.id == curArticle.id);
    data.state.cart[index].quantity++;
    articleView.changeBtn(data.state.cart[index].quantity);
  } else {
    data.state.cart.push({ id: curArticle.id, quantity: 1 });
    articleView.changeBtn(1);
  }
  checkCart();
  setLocalStorage("cart", data.state.cart);
};
const checkCart = function () {
  let pcsInCart;
  if (data.state.cart.length == 0) {
    pcsInCart = 0;
  } else {
    pcsInCart = data.state.cart.reduce(function (acum, el) {
      acum += el.quantity;
      return acum;
    }, 0);
  }
  mainView.cartPreview(pcsInCart);
};
/////////////////////SEARCH FUNCTIONALITY
const searchControl = function (text) {
  let searchResult = data.articles.filter((el) =>
    el.name.toLowerCase().includes(text.toLowerCase())
  );
  if (searchResult.length == 0) return;
  mainView.render(searchResult);
};
///////////////////PAGE RELOAD
const reloadPage = function () {
  location.reload();
};
//////////////BACK TO TOP BUTTON
mainView.backToTopBtn();

//////////////////MENU
const controlMenu = function (comand) {
  if (comand == "show") menuView.showMenu();
  if (comand == "hide") menuView.hideMenu();
  if (comand == "cart") {
    menuView.hideMenu();
    openCart();
  }
  if (comand == "check") {
    menuView.hideMenu();
    popupView.popupCall();
    checkView.render("");
  }
  if (comand == "contacts") {
    menuView.hideMenu();
    menuView.goToContacts();
  }
  if (comand == "policy") {
    menuView.hideMenu();
    popupView.popupCall();
    policyView.render("");
  }
};
////////////Check delivery date
const controlCityRequest = async function (cityName) {
  console.log(cityName);
  const cityList = await data.requestCityList();
  const cityRef = cityList.filter((obj) => obj.Description == cityName)[0].Ref;
  const date = await data.requestDeliveryDate(cityRef);
  checkView.generateResponse(cityName, date);
};

///////FUNCTIONS CALL
showShop();
mainView.clickArticle(openArticle);
mainView.logoAndTextClick(reloadPage);
searchBoxView.searchBoxCall();
searchBoxView.searchFor(searchControl);
menuView.menuBtnClick(controlMenu);
cartView.clickCartBtn(openCart);
cartView.clearCartBtn(clearCart);
cartView.quantityBtns(adjustCard);
checkView.enterCityName(controlCityRequest);
