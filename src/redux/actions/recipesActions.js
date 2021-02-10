export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LIST_RECIPES = 'LIST_RECIPES';
export const FILTERED_BY_CATEGORY = 'FILTERED_BY_CATEGORY';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
export const CHANGE_CURRENT_CATEGORY = 'CHANGE_CURRENT_CATEGORY';
export const CHANGE_RECIPE_TYPE = 'CHANGE_RECIPE_TYPE';
export const CHANGE_SEARCH_BAR = 'CHANGE_SEARCH_BAR';
export const REQUEST_AREA = 'REQUEST_AREA';
export const REQUEST_AREA_FAILED = 'REQUEST_AREA_FAILED';
export const SELECT_AREA = 'SELECT_AREA';

export const filteredByCategoryAction = (filteredByCategory) => ({
  type: FILTERED_BY_CATEGORY,
  filteredByCategory,
});

export const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

export const changeRecipeType = (recipeType) => ({
  type: CHANGE_RECIPE_TYPE,
  recipeType,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const listRecipes = (recipes) => ({
  type: LIST_RECIPES,
  recipes,
});

export const requestIngredients = (ingredients) => ({
  type: REQUEST_INGREDIENTS,
  ingredients,
});

export const changeCurrentCategoryAction = (category) => ({
  type: CHANGE_CURRENT_CATEGORY,
  category,
});

export const changeSearchBarAction = () => ({
  type: CHANGE_SEARCH_BAR,
});

export const requestArea = () => ({
  type: REQUEST_AREA,
});

export const requestAreaFailed = (error) => ({
  type: REQUEST_AREA_FAILED,
  error,
});

export const selectedArea = (meals) => ({
  type: SELECT_AREA,
  meals,
});
