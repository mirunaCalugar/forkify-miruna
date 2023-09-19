import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationaView from './views/paginationaView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};
const newFeature = function () {
  console.log('Welcome to the application');
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationaView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();

// import * as model from './model.js';
// import recipeView from './views/recipeView.js';
// import searchView from './views/searchView.js';
// import resultView from './views/resultView.js';
// import paginationaView from './views/paginationaView.js';
// import bookmarksView from './views/bookmarksView.js';
// import addRecipeView from './views/addRecipeView.js';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import { async } from 'regenerator-runtime';

// import { MODAL_CLOSE_SEC } from './config.js';
// // if (module.hot) {
// //   module.hot.accept();
// // }

// //const [icons] = icons.split('?');
// //console.log(icons);
// //const recipeContainer = document.querySelector('.recipe');

// // https://forkify-api.herokuapp.com/v2

// ///////////////////////////////////////

// const controlRecipes = async function () {
//   try {
//     const id = window.location.hash.slice(1);
//     console.log(id);
//     if (!id) return;
//     //recipeView.render();
//     recipeView.renderSpinner();
//     // update results view to mark selected search result
//     resultView.update(model.getSearchResultsPage());
//     recipeView.update(model.state.recipe);
//     //Loading recipe
//     await model.loadRecipe(id);

//     //Rendering recipe
//     recipeView.render(model.state.recipe);
//     // const recipeView = new recipeView(model.state.recipe);
//     // //TEST
//     // controlServings();
//     bookmarksView.update(model.state.bookmarks);
//   } catch (err) {
//     recipeView.renderError();
//     console.error(err);
//   }
// };
// const controlSearchResults = async function () {
//   try {
//     resultView.renderSpinner();
//     //1)Get search Query
//     const query = searchView.getQuery();
//     if (!query) return;
//     //2)Load search Results
//     await model.loadSearchResults(query);
//     //3)Render results
//     //console.log(model.getSearchResultsPage(1));
//     resultView.render(model.getSearchResultsPage());
//     //Render initial pagination
//     paginationaView.render(model.state.search);
//   } catch (err) {
//     console.error(err);
//   }
// };
// //controlSearchResults();

// const controlPagination = function (goToPage) {
//   //1)Render results
//   //console.log(model.getSearchResultsPage(1));
//   resultView.render(model.getSearchResultsPage(goToPage));
//   //Render initial pagination
//   paginationaView.render(model.state.search);
// };

// const controlServings = function (newServings) {
//   //Update recipe servings
//   model.updateServings(newServings);
//   //Update the recipe view
//   //recipeView.render(model.state.recipe);
// };
// const controlAddBookmark = function () {
//   //add bookmark
//   if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
//   else model.deleteBookmark(model.state.recipe.id);
//   console.log(model.state.recipe);
//   //update recipe view
//   recipeView.update(model.state.recipe);
//   // render bookmarks
//   bookmarksView.render(model.state.bookmarks);
// };

// controlBookmarks = function () {
//   bookmarksView.render(model.state.bookmarks);
// };
// const controlAddRecipe = async function (newRecipe) {
//   try {
//     //Show load spinner
//     addRecipeView.renderSpinner();
//     console.log(newRecipe);
//     //Upload new Recipe data
//     await model.uploadRecipe(newRecipe);
//     console.log(model.state.recipe);
//     //render recipe add

//     recipeView.render(model.state.recipe);

//     //Succes message
//     addRecipeView.renderMessage();
//     //render bookmark view
//     bookmarksView.render(model.state.bookmarks);
//     //change id in url
//     window.history.pushState(null, '', `#${model.state.recipe.id}`);

//     //close window form
//     setTimeout(function () {
//       addRecipeView.toggleWindow();
//     }, MODAL_CLOSE_SEC * 1000);
//   } catch (err) {
//     console.log(err, ';(((');
//     addRecipeView.renderError(err.message);
//   }
// };

// const init = function () {
//   bookmarksView.addHandlerRender(controlBookmarks);
//   recipeView.addHandlerRender(controlRecipes);
//   recipeView.addHandlerUpdateServings(controlServings);
//   recipeView.addHandlerAddBookmark(controlAddBookmark);
//   searchView.addHandlerSearch(controlSearchResults);
//   paginationaView.addHandlerClick(controlPagination);
//   addRecipeView.addHandlerUpload(controlAddRecipe);
//   //controlServings();
// };
// init();
