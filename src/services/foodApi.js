import {
  listRecipes,
  failedRequest,
  requestRecipes,
} from '../redux/actions';
import {
  changeCurrentCategoryAction,
  filteredByCategoryAction,
}
  from '../redux/actions/recipesActions';

export const getFoodRecipes = ({ searchInput = '', searchRadio = 's' }) => {
  let endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?${searchRadio}=${searchInput}`;
  if (searchRadio === 's' || searchRadio === 'f') {
    endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?${searchRadio}=${searchInput}`;
  }
  return async (dispatch) => {
    dispatch(requestRecipes());
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(listRecipes(data.meals));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
};

export const getFood = async (recipeId) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getSuggestedFoods = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllFoodCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const foodFilterByCategory = (category) => {
  let foodUrlForFilterByCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
  if (category === '') {
    foodUrlForFilterByCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  }
  return async (dispatch) => {
    dispatch(requestRecipes());
    dispatch(changeCurrentCategoryAction(category));
    try {
      const resquestFilteredByCategory = await fetch(foodUrlForFilterByCategory);
      const JSONresponseFiltered = await resquestFilteredByCategory.json();
      dispatch(filteredByCategoryAction(JSONresponseFiltered.meals));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
};

export const randomFoodsApi = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getIngredientsFood = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
