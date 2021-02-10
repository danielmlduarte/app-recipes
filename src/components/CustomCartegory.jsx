import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { foodFilterByCategory, getFoodRecipes } from '../services';
import { drinksFilteredByCategory, getDrinkRecipes } from '../services/drinkApi';

class CustomCartegory extends Component {
  render() {
    const {
      category,
      title,
      dispatchFoodFilteredByCategory,
      dispatchDrinkFilteredByCategory,
      dispatchFoodRecipes,
      dispatchDrinksRecipes,
      currentCategory,
    } = this.props;
    return (
      <button
        type="button"
        data-testid={ `${category.strCategory}-category-filter` }
        className="btn btn-outline-danger btn-category-main-page"
        onClick={ () => {
          if (currentCategory === category.strCategory) {
            return title === 'comidas' ? dispatchFoodRecipes({})
              : dispatchDrinksRecipes({});
          }
          if (title === 'comidas') dispatchFoodFilteredByCategory(category);
          if (title === 'bebidas') dispatchDrinkFilteredByCategory(category);
        } }
      >
        {category.strCategory}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategory: state.recipesReducer.currentCategory,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchDrinksRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchDrinkFilteredByCategory: (category) => {
    dispatch(drinksFilteredByCategory(category));
  },
  dispatchFoodFilteredByCategory: (category) => {
    dispatch(foodFilterByCategory(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCartegory);

CustomCartegory.propTypes = {
  category: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  currentCategory: PropTypes.string.isRequired,
  dispatchFoodFilteredByCategory: PropTypes.func.isRequired,
  dispatchDrinkFilteredByCategory: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  dispatchDrinksRecipes: PropTypes.func.isRequired,
};
