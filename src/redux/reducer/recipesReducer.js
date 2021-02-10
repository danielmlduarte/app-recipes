import {
  REQUEST_RECIPES,
  LIST_RECIPES,
  REQUEST_FAILED,
  FILTERED_BY_CATEGORY,
  REQUEST_INGREDIENTS,
  REQUEST_AREA,
  REQUEST_AREA_FAILED,
  SELECT_AREA,
  CHANGE_RECIPE_TYPE,
  CHANGE_CURRENT_CATEGORY,
  CHANGE_SEARCH_BAR,
} from '../actions';

const INITIAL_STATE = {
  recipeType: 'comidas',
  isFetching: true,
  recipes: [],
  currentCategory: 'all',
  error: false,
  done: [],
  isSearchBar: false,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILTERED_BY_CATEGORY:
    return {
      ...state,
      recipes: (!action.filteredByCategory) ? [] : action.filteredByCategory,
      isFetching: false,
    };
  case CHANGE_CURRENT_CATEGORY:
    return {
      currentCategory: action.category.strCategory,
    };
  case CHANGE_RECIPE_TYPE:
    return {
      ...state,
      recipeType: action.recipeType,
    };
  case REQUEST_RECIPES:
    return { ...state, isFetching: true };
  case LIST_RECIPES:
    return {
      ...state,
      recipes: (!action.recipes) ? [] : action.recipes,
      isFetching: false,
      currentCategory: 'all',
    };
  case REQUEST_FAILED:
    return { ...state, error: true, isFetching: false };
  case REQUEST_AREA:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_AREA_FAILED:
    return { ...state, error: true };
  case SELECT_AREA:
    return {
      ...state,
      recipes: action.meals,
      isFetching: false,
    };
  case CHANGE_SEARCH_BAR:
    return {
      ...state,
      isSearchBar: true,
    };
  default:
    return state;
  case REQUEST_INGREDIENTS:
    return { ...state, currentCategory: action.ingredients };
  }
};

export default recipesReducer;
