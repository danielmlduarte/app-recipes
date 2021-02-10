import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomDetailsIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientsList: [],
      measureList: [],
    };
    this.getIngredientsList = this.getIngredientsList.bind(this);
  }

  componentDidMount() {
    this.getIngredientsList();
  }

  getIngredientsList() {
    const { recipeType, recipe } = this.props;
    const INITIAL_INDEX = 1;
    const INDEX_FOOD = 20;
    const INDEX_DRINK = 15;
    const MAX_INDEX = (recipeType === 'comidas') ? INDEX_FOOD : INDEX_DRINK;
    const ingredientsList = [];
    const measureList = [];
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += 1) {
      ingredientsList
        .push(recipe[`strIngredient${index}`]);
      measureList
        .push(recipe[`strMeasure${index}`]);
    }
    this.setState({
      ingredientsList,
      measureList,
    });
  }

  render() {
    const { ingredientsList, measureList } = this.state;
    return (
      ingredientsList
        .filter((ingredient) => ingredient !== '' && ingredient !== null)
        .map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
            className="list-group-item"
          >
            { `${(measureList[index]) ? (measureList[index]) : ''} ${ingredient}` }
          </li>
        ))
    );
  }
}

CustomDetailsIngredients.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
