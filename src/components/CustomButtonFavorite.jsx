import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default class CustomButtonFavorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
    };
    this.addFavoriteToLocalStorage = this.addFavoriteToLocalStorage.bind(this);
    this.removeFavoriteFromLocalStorage = this.removeFavoriteFromLocalStorage.bind(this);
    this.verifyRecipeIsFavorite = this.verifyRecipeIsFavorite.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.verifyRecipeIsFavorite();
  }

  handleButtonClick() {
    const { isFavorite } = this.state;
    if (isFavorite) {
      this.removeFavoriteFromLocalStorage();
    } else {
      this.addFavoriteToLocalStorage();
    }
  }

  verifyRecipeIsFavorite() {
    const { recipe, recipeType } = this.props;
    const recipeId = (recipeType === 'comidas') ? recipe.idMeal : recipe.idDrink;
    const favoriteRecipes = getStorage('favoriteRecipes');
    if (favoriteRecipes) {
      this.setState({
        isFavorite: favoriteRecipes.some(({ id }) => id === recipeId),
      });
    }
  }

  removeFavoriteFromLocalStorage() {
    const { recipe, recipeType } = this.props;
    const recipeId = (recipeType === 'comidas') ? recipe.idMeal : recipe.idDrink;
    const favoriteRecipes = getStorage('favoriteRecipes');
    setStorage('favoriteRecipes', favoriteRecipes.filter(({ id }) => id !== recipeId));
    this.setState({ isFavorite: false });
  }

  addFavoriteToLocalStorage() {
    const { recipe, recipeType } = this.props;
    const newFavorite = {
      id: (recipeType === 'comidas') ? recipe.idMeal : recipe.idDrink,
      type: (recipeType === 'comidas') ? 'comida' : 'bebida',
      area: (recipeType === 'comidas') ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: (recipeType === 'bebidas') ? recipe.strAlcoholic : '',
      name: (recipeType === 'comidas') ? recipe.strMeal : recipe.strDrink,
      image: (recipeType === 'comidas') ? recipe.strMealThumb : recipe.strDrinkThumb,
    };
    const favoriteRecipes = getStorage('favoriteRecipes');
    if (!favoriteRecipes) {
      setStorage('favoriteRecipes', [newFavorite]);
    } else {
      setStorage('favoriteRecipes', [...favoriteRecipes, newFavorite]);
    }
    this.setState({ isFavorite: true });
  }

  render() {
    const { isFavorite } = this.state;
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ this.handleButtonClick }
        src={ (isFavorite) ? blackHeartIcon : whiteHeartIcon }
        className="btn btn-light"
      >
        <img
          src={ (isFavorite) ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </button>
    );
  }
}

CustomButtonFavorite.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};
