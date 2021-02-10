import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomCardFood, CustomFooter, CustomCartegory } from '../components';
import CustomHeader from '../components/CustomHeader';
import { listRecipes, requestRecipes } from '../redux/actions';
import {
  getAllFoodCategories,
  getFoodRecipes,
  getDrinkRecipes,
  getAllDrinksCategories,
} from '../services';

class Recipes extends Component {
  constructor() {
    super();
    this.handleRecipes = this.handleRecipes.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.getTypeOfRecipe = this.getTypeOfRecipe.bind(this);
    this.state = {
      recipesCategories: [],
      recipeType: '',
    };
  }

  componentDidMount() {
    this.getTypeOfRecipe();
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (!prevProps.type) return;
    if (prevProps.type !== type) this.getTypeOfRecipe();
  }

  async handleCategories() {
    const { recipeType } = this.state;
    let recipesCategories = '';
    if (recipeType === 'comidas') {
      const { meals } = await getAllFoodCategories();
      recipesCategories = meals;
    } else {
      const { drinks } = await getAllDrinksCategories();
      recipesCategories = drinks;
    }
    this.setState({
      recipesCategories,
    });
  }

  handleRecipes() {
    const { recipes, isFetching, isSearchBar } = this.props;
    if (recipes) {
      if (!recipes.length && !isFetching) return this.renderAlertError();
      if (recipes.length === 1 && isSearchBar) {
        return this.redirectToRecipeDetail(recipes);
      }
      return this.renderRecipes();
    }
  }

  getTypeOfRecipe() {
    const { type } = this.props;
    this.setState({
      recipeType: type,
    }, () => this.fetchAllRecipes());
  }

  fetchAllRecipes() {
    const { dispatchFoodRecipes, currentCategoryFood } = this.props;
    const { recipeType } = this.state;
    if (currentCategoryFood === 'all') {
      if (recipeType === 'comidas') {
        dispatchFoodRecipes(getFoodRecipes({}));
      } else {
        dispatchFoodRecipes(getDrinkRecipes({}));
      }
    } else {
      const ingredientsObj = {
        searchInput: currentCategoryFood,
        searchRadio: 'i',
      };
      if (recipeType === 'comidas') {
        dispatchFoodRecipes(getFoodRecipes(ingredientsObj));
      } else {
        dispatchFoodRecipes(getDrinkRecipes(ingredientsObj));
      }
    }
    this.handleCategories();
  }

  redirectToRecipeDetail(recipes) {
    const { recipeType } = this.state;
    const recipeSufixe = recipeType === 'comidas' ? 'Meal' : 'Drink';
    return (
      <Redirect to={ `/${recipeType}/${recipes[0][`id${recipeSufixe}`]}` } />
    );
  }

  renderAlertError() {
    const { dispatchUpdateFoodIsFetching } = this.props;
    dispatchUpdateFoodIsFetching();
    return alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }

  renderRecipes() {
    const { recipes } = this.props;
    const { recipeType } = this.state;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = recipes.length > LENGTH ? LENGTH : recipes.length;
    return (
      <div className="cards-main-page-content">
        { recipes.slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((recipe, index) => (
            <CustomCardFood
              key={ (recipeType === 'comidas') ? recipe.idMeal : recipe.idDrink }
              index={ index }
              recipe={ recipe }
              recipeType={ recipeType }
            />))}
      </div>
    );
  }

  renderCategories() {
    const { dispatchFoodRecipes } = this.props;
    const { recipesCategories, recipeType } = this.state;
    const MAX_LENGTH = 5;
    const INITIAL_LENGTH = 0;
    if (recipesCategories !== undefined) {
      return (
        <div className="category-choose-content">
          <button
            data-testid="All-category-filter"
            type="button"
            className="btn btn-outline-danger btn-category-main-page"
            onClick={ () => (
              (recipeType === 'comidas')
                ? dispatchFoodRecipes(getFoodRecipes({}))
                : dispatchFoodRecipes(getDrinkRecipes({}))
            ) }
          >
            All
          </button>
          {recipesCategories
            .slice(INITIAL_LENGTH, MAX_LENGTH)
            .map((category, index) => (
              <CustomCartegory
                key={ index }
                index={ index }
                category={ category }
                title={ recipeType }
              />
            ))}
        </div>
      );
    }
  }

  renderLoading() {
    return (
      <div className="loading">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  render() {
    const { recipeType } = this.state;
    const { isFetching } = this.props;
    return (
      <div className="recipes-main-content">
        <CustomHeader title={ (recipeType === 'comidas') ? 'Comidas' : 'Bebidas' } />
        { isFetching ? this.renderLoading()
          : (
            <div>
              { this.renderCategories() }
              { this.handleRecipes() }
            </div>)}
        <CustomFooter />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
  recipes: state.recipesReducer.recipes,
  currentCategoryFood: state.recipesReducer.currentCategory,
  isSearchBar: state.recipesReducer.isSearchBar,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (getRecipe) => dispatch(getRecipe),
  dispatchInitialCards: (JSONRequestAllCAtegories) => {
    dispatch(listRecipes(JSONRequestAllCAtegories));
  },
  dispatchUpdateFoodIsFetching: () => dispatch(requestRecipes()),
});

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  currentCategoryFood: PropTypes.string.isRequired,
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  isSearchBar: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
/*   length: PropTypes.number.isRequired,
  slice: PropTypes.func.isRequired, */
};
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
