import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; //for everything
import 'regenerator-runtime/runtime'; //for asyn await
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MDOEL_CLOSE_SEC } from './config.js';
// import { isConcatSpreadable } from 'core-js/fn/symbol';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //rendering spinner
    recipeView.renderSpinner();

    // Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //updating bookmark view
    bookmarkView.update(model.state.bookmarks);
    // Loading Recipe
    await model.loadRecipe(id);

    //Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search Result
    await model.loadSearchResults(query);

    //Render Results
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //Initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  //Render New Results
  console.log(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //Initial New pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in State)
  model.updateServing(newServings);
  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // Render Bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    //success sms
    addRecipeView.renderMessage();

    //Render bookmark again
    bookmarkView.render(model.state.bookmarks);

    // Change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close from window
    setTimeout(() => {
      addRecipeView._toggleWin();
    }, MDOEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(`😀 ${err}`);
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarkView.render(model.state.bookmarks);
  recipeView.addHandlerEvent(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView._addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
