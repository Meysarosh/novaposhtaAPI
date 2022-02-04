import * as data from "./data.js";
import mainView from "./views/mainView.js";
import articleView from "./views/articleView.js";
import popupView from "./views/popupView.js";
import searchBoxView from "./views/searchBoxView.js";
import cartView from "./views/cartView.js";
import menuView from "./views/menuView.js";
import policyView from "./views/policyView.js";
import checkView from "./views/checkView.js";
import helperBoxView from "./views/helperBoxView.js";
import filterView from "./views/filterView.js";
import sortByView from "./views/sortByView.js";
//////////////LOCAL STORAGE
const setLocalStorage = function (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
};
const getLocalStorage = function () {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return;
  data.state.cart = cart;
};
////////////close popup
const controlClosePopup = function () {
  popupView.hidePopup();
};
/////////////////SHOW ARTICLES (from data) IN SHOP
const showShop = function () {
  mainView.render(data.articles);
  mainView.generateColorDivs();
  getLocalStorage();
  checkCart();
  checkFilter();
  checkArticleInCart();
};
const checkArticleInCart = function () {
  document.querySelectorAll(".shop__article").forEach((el) => {
    if (data.state.cart.find((obj) => obj.id == el.dataset.id)) {
      el.children[0].classList.remove("shop__article__icon-hidden");
    } else {
      el.children[0].classList.add("shop__article__icon-hidden");
    }
    // if (el.)
    // (el.children[0]);
  });
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
const fromArticleToCart = function () {
  controlClosePopup();

  setTimeout(function () {
    openCart();
  }, 150);
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
  checkArticleInCart();
  setLocalStorage("cart", data.state.cart);
};

const adjustCard = function (id, num) {
  let index = data.state.cart.findIndex((el) => el.id == id);
  data.state.cart[index].quantity += num;
  data.state.cart = data.state.cart.filter((obj) => obj.quantity > 0);
  generateCart();
  checkCart();
  checkArticleInCart();
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
  checkArticleInCart();
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
const formCartToArticle = function (id) {
  controlClosePopup();

  setTimeout(function () {
    openArticle(id);
  }, 150);
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
    checkView.enterCityName(controlCityRequest);
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
  try {
    const cityList = await data.requestCityList();
    const cityRef = cityList.filter((obj) => obj.Description == cityName)[0]
      .Ref;
    if (cityRef.length == 0) throw new Error();
    const date = await data.requestDeliveryDate(cityRef);
    checkView.generateResponse(cityName, date);
  } catch (err) {
    checkView.errorMessage();
  }
};
/////////////////////SEARCH FUNCTIONALITY
let searchResult = [];
const searchControl = function (text) {
  searchResult = data.articles.filter((el) =>
    el.name.toLowerCase().includes(text.toLowerCase())
  );
  mainView.render(searchResult);
  mainView.generateColorDivs();
  checkArticleInCart();
  filteredData = [];
  filters = [];
  checkFilter();
};
//////////////////////FILTER FUNCTIONALITY
let filteredData = [];
let filters = [];
const showFilter = function () {
  helperBoxView.showBox();
  filterView.render(filters);
};
const controlFilter = function (colorFilter, typeFilter, sizeFilter) {
  helperBoxView.hideBox();
  filteredData = data.filterArticles(colorFilter, typeFilter, sizeFilter);
  mainView.render(filteredData);
  mainView.generateColorDivs();
  checkArticleInCart();
  filters = colorFilter.concat(typeFilter.concat(sizeFilter));
  checkFilter();
  searchResult = [];
};
const checkFilter = function () {
  let filtersQty = filters.length;
  mainView.filterPreview(filtersQty);
};
///////////////////SORTBY FUNCTIONALITY
const showSortBy = function () {
  helperBoxView.showBox();
  sortByView.render("");
};
const controlSortBy = function (comand) {
  let dataToSort;
  if (searchResult.length > 0) {
    dataToSort = searchResult;
  } else if (filteredData.length > 0) {
    dataToSort = filteredData;
  } else {
    dataToSort = data.articles.concat();
  }
  if (comand == "price-acs")
    dataToSort.sort(function (a, b) {
      return a.price - b.price;
    });
  if (comand == "price-des")
    dataToSort.sort(function (a, b) {
      return b.price - a.price;
    });
  if (comand == "capacity-acs")
    dataToSort.sort(function (a, b) {
      return a.capacity - b.capacity;
    });
  if (comand == "capacity-des")
    dataToSort.sort(function (a, b) {
      return b.capacity - a.capacity;
    });

  mainView.render(dataToSort);
  mainView.generateColorDivs();
  checkArticleInCart();
};
///////FUNCTIONS CALL
showShop();
popupView.closePopup(controlClosePopup);
articleView.goToCart(fromArticleToCart);
mainView.clickArticle(openArticle);
mainView.logoAndTextClick(reloadPage);
mainView.footerMenu(controlMenu);
searchBoxView.searchBoxCall();
searchBoxView.searchFor(searchControl);
menuView.menuBtnClick(controlMenu);
cartView.clickCartBtn(openCart);
cartView.clearCartBtn(clearCart);
cartView.quantityBtns(adjustCard);
cartView.goToArticle(formCartToArticle);
filterView.filterCall(showFilter);
filterView.applyBtn(controlFilter);
sortByView.sortByCall(showSortBy);
sortByView.sortByBtns(controlSortBy);
