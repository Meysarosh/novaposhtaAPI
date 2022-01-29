import * as data from "./data.js";
import MainView from "./views/mainView.js";
import ArticleView from "./views/articleView.js";
import PopupView from "./views/popupView.js";
import popupView from "./views/popupView.js";

const showShop = function () {
  MainView.render(data.articles);
};

const openArticle = function (id) {
  let [curArticle] = data.articles.filter((article) => article.id == id);
  ArticleView.render(curArticle);
  popupView.popupCall();
};

showShop();
MainView.clickArticle(openArticle);
