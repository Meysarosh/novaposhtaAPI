import * as data from "./data.js";
import MainView from "./views/mainView.js";

const showArticles = function () {
  MainView.render(data.article);
};
showArticles();
