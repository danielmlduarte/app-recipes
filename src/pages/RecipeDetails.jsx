import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import {
  CustomCardSuggested,
  CustomDetailsButton,
  CustomDetailsIngredients,
  CustomButtonShare,
  CustomButtonFavorite,
} from '../components';
import {
  getFood,
  getDrink,
  getSuggestedFoods,
  getSuggestedDrinks,
  getStorage,
} from '../services';

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchRecipe = this.fetchRecipe.bind(this);
    this.getTypeOfRecipe = this.getTypeOfRecipe.bind(this);
    this.getYoutubeEmbedUrl = this.getYoutubeEmbedUrl.bind(this);
    this.getSuggestedRecipes = this.getSuggestedRecipes.bind(this);
    this.verifyRecipeIsDone = this.verifyRecipeIsDone.bind(this);
    this.state = {
      recipeId: '',
      isLoading: true,
      recipe: {},
      suggestedRecipes: [],
      recipeType: '',
      isDone: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id }, path } } = this.props;
    this.fetchRecipe(id, path);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id }, path } } = this.props;
    if (prevProps.match.path !== path) this.fetchRecipe(id, path);
  }

  getSuggestedRecipes() {
    const { suggestedRecipes, recipeType } = this.state;
    if (!suggestedRecipes) return <div> Sem Sugestões </div>;
    const sufixeRecipe = (recipeType === 'comidas') ? 'Drink' : 'Meal';
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 6;
    return (
      <Carousel className="suggested-img">
        {
          suggestedRecipes.slice(INITIAL_INDEX, MAX_INDEX)
            .map((recipe, index) => (
              <Carousel.Item key={ index }>
                <CustomCardSuggested
                  type={ recipeType }
                  index={ index }
                  id={ recipe[`id${sufixeRecipe}`] }
                  thumb={ recipe[`str${sufixeRecipe}Thumb`] }
                  title={ recipe[`str${sufixeRecipe}`] }
                />
              </Carousel.Item>))
        }
      </Carousel>
    );
  }

  getYoutubeEmbedUrl() {
    const { recipe: { strYoutube } } = this.state;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = strYoutube.match(regExp);
    if (!match) return '';
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  getTypeOfRecipe(path) {
    const regExp = /(\w+)/;
    const match = path.match(regExp);
    return match[0];
  }

  verifyRecipeIsDone(recipeId) {
    const doneRecipes = getStorage('doneRecipes');
    if (doneRecipes) {
      this.setState({
        isDone: doneRecipes.some(({ id }) => id === recipeId),
      });
    }
  }

  async fetchRecipe(id, path) {
    const recipeType = this.getTypeOfRecipe(path);
    this.setState({ isLoading: true });
    if (recipeType === 'comidas') {
      const { meals } = await getFood(id);
      const { drinks } = await getSuggestedDrinks();
      this.setState({
        recipeId: id,
        isLoading: false,
        recipe: meals[0],
        suggestedRecipes: drinks,
        recipeType,
      });
    }
    if (recipeType === 'bebidas') {
      const { drinks } = await getDrink(id);
      const { meals } = await getSuggestedFoods();
      this.setState({
        recipeId: id,
        isLoading: false,
        recipe: drinks[0],
        suggestedRecipes: meals,
        recipeType,
      });
    }
    this.verifyRecipeIsDone(id);
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
    } = this.state;

    const { strInstructions } = recipe;

    const { match: { url } } = this.props;

    if (isLoading) return this.renderLoading();
    return (
      <div
        className="card recipe-details-content"
        data-testid="0-recipe-card"
      >
        <img
          data-testid="recipe-photo"
          src={ (recipeType === 'comidas') ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="recipe-exemple"
          className="card-img-top"
        />
        <div
          className="card-body"
        >
          <div className="share-like-btn">
            <CustomButtonShare url={ url } />
            <CustomButtonFavorite
              recipeType={ recipeType }
              recipe={ recipe }
            />
          </div>
          <h2
            data-testid="recipe-title"
            className="card-title"
          >
            { (recipeType === 'comidas') ? recipe.strMeal : recipe.strDrink }
          </h2>
          <h3 data-testid="recipe-category">
            { (recipeType === 'comidas') ? recipe.strCategory : recipe.strAlcoholic }
          </h3>
          <p
            data-testid="instructions"
            className="card-text"
          >
            { strInstructions }
          </p>
          <ul className="list-group list-group-flush">
            { (!isLoading)
           && (
             <CustomDetailsIngredients recipeType={ recipeType } recipe={ recipe } />) }
          </ul>
          { (recipeType === 'comidas') && <iframe
            className="suggested-img"
            data-testid="video"
            src={ this.getYoutubeEmbedUrl() }
            frame-border="0"
            allow="autoplay; encrypted-media"
            allow-fullscreen
            title="video"
          /> }
          { (!isLoading) && this.getSuggestedRecipes() }
        </div>
        { (!isDone)
          && (
            <CustomDetailsButton
              recipeId={ recipeId }
              recipeType={ recipeType }
              recipe={ recipe }
            />
          )}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};
