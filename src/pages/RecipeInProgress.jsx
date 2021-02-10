import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  CustomInProgressIngredients,
  CustomButtonShare,
  CustomButtonFavorite,
} from '../components';
import { getFood, getDrink, getStorage, setStorage } from '../services';

class RecipeInProgress extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipe = this.fetchRecipe.bind(this);
    this.getTypeOfRecipe = this.getTypeOfRecipe.bind(this);
    this.verifyRecipeIsDone = this.verifyRecipeIsDone.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      recipeId: '',
      isLoading: true,
      recipe: [],
      recipeType: '',
      isDone: true,
      isRedirect: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
        path,
      },
    } = this.props;
    this.fetchRecipe(id, path);
  }

  handleButtonClick() {
    const { recipe, recipeType } = this.state;
    const dNow = new Date();
    const localdate = `${dNow.getDate()}/${dNow.getMonth() + 1}/${dNow.getFullYear()}`;

    if (getStorage('doneRecipes')) {
      setStorage('doneRecipes', [
        ...getStorage('doneRecipes'),
        {
          id: (recipeType === 'comidas' ? recipe.idMeal : recipe.idDrink),
          type: (recipeType === 'comidas' ? 'comida' : 'bebida'),
          area: recipe.strArea ? recipe.strArea : '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipeType === 'comidas' ? recipe.strMeal : recipe.strDrink,
          image: recipeType === 'comidas' ? recipe.strMealThumb : recipe.strDrinkThumb,
          doneDate: localdate,
          tags: recipe.strTags ? recipe.strTags.split(',') : [],
        },
      ]);
    }
    this.setState({
      isRedirect: true,
    });
  }

  getTypeOfRecipe(path) {
    const regExp = /(\w+)/;
    const match = path.match(regExp);
    return match[0];
  }

  verifyRecipeIsDone(done) {
    /* const doneRecipes = getStorage('doneRecipes');
    if (doneRecipes) {
      this.setState({
        isDone: doneRecipes.some(({ id }) => id === recipeId),
      });
    } */
    this.setState({
      isDone: !done,
    });
  }

  async fetchRecipe(id, path) {
    const recipeType = this.getTypeOfRecipe(path);
    this.setState({ isLoading: true });
    if (recipeType === 'comidas') {
      const { meals } = await getFood(id);
      this.setState({
        recipeId: id,
        isLoading: false,
        recipe: meals[0],
        recipeType,
      });
    }
    if (recipeType === 'bebidas') {
      const { drinks } = await getDrink(id);
      this.setState({
        recipeId: id,
        isLoading: false,
        recipe: drinks[0],
        recipeType,
      });
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
    const {
      isLoading,
      recipe,
      recipeType,
      recipeId,
      isDone,
      isRedirect,
    } = this.state;

    const { strInstructions } = recipe;

    const {
      match: { url },
    } = this.props;

    if (isLoading) return this.renderLoading();
    if (isRedirect) return <Redirect to="/receitas-feitas" />;
    return (
      <div>
        <img
          className="card-img-top"
          data-testid="recipe-photo"
          src={
            recipeType === 'comidas'
              ? recipe.strMealThumb
              : recipe.strDrinkThumb
          }
          alt="recipe-exemple"
        />
        <div className="card-body">
          <h2 data-testid="recipe-title" className="card-title">
            {recipeType === 'comidas' ? recipe.strMeal : recipe.strDrink}
          </h2>
          <div className="share-like-btn">
            <CustomButtonShare url={ url.replace('/in-progress', '') } />
            <CustomButtonFavorite recipeType={ recipeType } recipe={ recipe } />
          </div>
          <h3 data-testid="recipe-category">
            {recipeType === 'comidas' ? recipe.strCategory : recipe.strAlcoholic}
          </h3>
          <p data-testid="instructions" className="card-text">{strInstructions}</p>
          <ul className="list-group list-group-flush">
            {!isLoading && (
              <CustomInProgressIngredients
                recipeType={ recipeType }
                recipe={ recipe }
                recipeId={ recipeId }
                recipeIsDone={ this.verifyRecipeIsDone }
              />
            )}
          </ul>
        </div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDone }
          onClick={ this.handleButtonClick }
          className="button-footer btn btn-dark"
        >
          Finalizar receita
        </button>
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
