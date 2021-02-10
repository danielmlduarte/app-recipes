import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services';

export default class CustomInProgressIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientsList: [],
    };
    this.getIngredientsList = this.getIngredientsList.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.updateIngredientsOnState = this.updateIngredientsOnState.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.verifyIsRecipeIsDone = this.verifyIsRecipeIsDone.bind(this);
  }

  componentDidMount() {
    this.localStorageSetUp();
    this.getIngredientsList();
  }

  handleInputClick({ target: { checked, value } }) {
    const { recipeType, recipeId } = this.props;
    const recipes = getStorage('inProgressRecipes');
    let recipeInProgress = (recipeType === 'comidas')
      ? recipes.meals[recipeId]
      : recipes.cocktails[recipeId];
    if (checked) {
      recipeInProgress.push(value);
      this.updateLocalStorage(recipeInProgress);
    } else {
      recipeInProgress = recipeInProgress.filter((ingredient) => ingredient !== value);
      this.updateLocalStorage(recipeInProgress);
    }
    this.updateIngredientsOnState(value);
  }

  getIngredientIsChecked(ingredientName) {
    const { recipeType, recipeId } = this.props;
    const recipes = getStorage('inProgressRecipes');
    const recipeInProgress = (recipeType === 'comidas')
      ? recipes.meals[recipeId]
      : recipes.cocktails[recipeId];
    return recipeInProgress.some((ingredient) => ingredient === ingredientName);
  }

  getIngredientsList() {
    const { recipeType, recipe } = this.props;
    const INITIAL_INDEX = 1;
    const INDEX_FOOD = 20;
    const INDEX_DRINK = 15;
    const MAX_INDEX = (recipeType === 'comidas') ? INDEX_FOOD : INDEX_DRINK;
    const ingredientsList = [];
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += 1) {
      const ingredient = recipe[`strIngredient${index}`];
      if (ingredient !== '' && ingredient !== null) {
        ingredientsList.push({
          name: ingredient,
          measure: recipe[`strMeasure${index}`],
          isChecked: this.getIngredientIsChecked(ingredient),
        });
      }
    }
    this.setState({
      ingredientsList,
    });
  }

  localStorageSetUp() {
    const { recipeType, recipeId } = this.props;
    if (recipeType === 'comidas' && !getStorage('inProgressRecipes')) {
      console.log(recipeType);
      setStorage('inProgressRecipes', { cocktails: {}, meals: { [recipeId]: [] } });
    }
    if (recipeType === 'bebidas' && !getStorage('inProgressRecipes')) {
      setStorage('inProgressRecipes', { cocktails: { [recipeId]: [] }, meals: {} });
    }
  }

  updateIngredientsOnState(value) {
    const { ingredientsList } = this.state;
    const updatedIngredients = ingredientsList.map(({ name, measure, isChecked }) => {
      if (name === value) {
        return ({ name, measure, isChecked: !isChecked });
      }
      return ({ name, measure, isChecked });
    });
    this.setState({
      ingredientsList: [
        ...updatedIngredients,
      ],
    }, () => this.verifyIsRecipeIsDone());
  }

  verifyIsRecipeIsDone() {
    const { recipeIsDone } = this.props;
    const { ingredientsList } = this.state;
    const isDone = ingredientsList.some((ingredient) => ingredient.isChecked !== true);
    recipeIsDone(!isDone);
  }

  updateLocalStorage(ingredients) {
    const { recipeType, recipeId } = this.props;
    if (recipeType === 'comidas') {
      setStorage('inProgressRecipes', {
        ...getStorage('inProgressRecipes'),
        meals: {
          ...getStorage('inProgressRecipes').meals,
          [recipeId]: ingredients,
        },
      });
    }
    if (recipeType === 'bebidas') {
      setStorage('inProgressRecipes', {
        ...getStorage('inProgressRecipes'),
        cocktails: {
          ...getStorage('inProgressRecipes').cocktails,
          [recipeId]: ingredients,
        },
      });
    }
  }

  render() {
    const { ingredientsList } = this.state;
    return (
      ingredientsList
        .map(({ name, measure, isChecked }, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ `list-group-item ${(isChecked) && 'ingredient'}` }
          >
            <input
              type="checkbox"
              checked={ isChecked }
              value={ name }
              onClick={ (event) => this.handleInputClick(event) }
            />
            { `  ${(measure !== null) ? (measure) : ''} ${name}` }
          </li>))
    );
  }
}

CustomInProgressIngredients.propTypes = {
  recipeId: PropTypes.number.isRequired,
  recipeIsDone: PropTypes.func.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
