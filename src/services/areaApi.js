import {
  failedRequest,
  requestRecipes,
  selectedArea,
} from '../redux/actions';

export const getArea = (strArea) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`;
  return async (dispatch) => {
    dispatch(requestRecipes());
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      dispatch(selectedArea(data.meals));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
};

export const getAllOrigin = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
