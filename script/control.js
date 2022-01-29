import * as data from "./data.js";
import MainView from "./views/mainView.js";
import ArticleView from "./views/articleView.js";
import PopupView from "./views/popupView.js";
import popupView from "./views/popupView.js";
import SearchBoxView from "./views/SearchBoxView.js";

const showShop = function () {
  MainView.render(data.articles);
};

const openArticle = function (id) {
  let [curArticle] = data.articles.filter((article) => article.id == id);
  ArticleView.render(curArticle);
  popupView.popupCall();
  ArticleView.generateSlide();
};

const searchControl = function (text) {
  let searchResult = data.articles.filter((el) =>
    el.name.toLowerCase().includes(text.toLowerCase())
  );
  if (searchResult.length == 0) return;
  MainView.render(searchResult);
};

showShop();
MainView.clickArticle(openArticle);

SearchBoxView.searchBoxCall();
SearchBoxView.searchFor(searchControl);
