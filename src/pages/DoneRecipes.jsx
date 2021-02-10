import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomHeader from '../components/CustomHeader';
import CustomCardRecipeDone from '../components/CustomCardRecipeDone';
import { getStorage } from '../services';

class DoneRecipes extends Component {
  constructor() {
    super();
    this.filterDoneRecipes = this.filterDoneRecipes.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.state = {
      Done: [],
    };
  }

  filterDoneRecipes({ target: { value } }) {
    const { Done } = this.state;
    console.log(Done);
    this.setState({
      Done: value,
    });
  }

  renderRecipes() {
    const filterDone = getStorage('doneRecipes');
    const { Done } = this.state;
    console.log(filterDone, 'filteredDone');
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    if (!filterDone) {
      return <p className="recipes-main-content">Ainda não há receitas feitas!</p>;
    }
    const MAX_LENGTH = filterDone.length > LENGTH ? LENGTH : filterDone.length;
    if (!filterDone.length) {
      return <p className="recipes-main-content">Ainda não há receitas feitas!</p>;
    }
    return (
      <div className="cards-main-page-content">
        {(filterDone.filter((item) => item.type.includes(Done)))
          .slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((recipe, index) => (
            <CustomCardRecipeDone
              recipe={ recipe }
              recipeType={ recipe.recipeType }
              key={
                recipe.recipeType === 'comidas' ? recipe.idMeal : recipe.idDrink
              }
              index={ index }
            />
          ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <CustomHeader title="Receitas Feitas" />
        <div className="recipes-main-content">
          <button
            type="button"
            className="btn btn-outline-danger btn-category-main-page"
            data-testid="filter-by-all-btn"
            onClick={ this.filterDoneRecipes }
            value=""
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-category-main-page"
            data-testid="filter-by-food-btn"
            onClick={ this.filterDoneRecipes }
            value="comida"
          >
            Food
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-category-main-page"
            data-testid="filter-by-drink-btn"
            onClick={ this.filterDoneRecipes }
            value="bebida"
          >
            Drinks
          </button>
        </div>
        {this.renderRecipes()}
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  recipes: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default (DoneRecipes);
