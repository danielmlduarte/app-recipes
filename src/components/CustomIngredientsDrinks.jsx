import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomIngredientsDrinks({ index, drink, dispatch }) {
  const { strIngredient1 } = drink;
  return (
    <div className="card single-card-explore-ingredients">
      <Link to="/bebidas" onClick={ () => dispatch(strIngredient1) }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          alt="Ingredientes"
          className="card-img-top img-card-explore-ingredients"
        />
        <div className="card-body">
          <p
            data-testid={ `${index}-ingredient-card` }
            className="card-text ingredient-text-card"
          >
            { `Ingrediente ${index + 1}` }
          </p>
          <p
            data-testid={ `${index}-card-name` }
            className="card-title ingredient-title-card"
          >
            { strIngredient1 }
          </p>
        </div>
      </Link>
    </div>
  );
}

CustomIngredientsDrinks.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  drink: PropTypes.shape({
    strIngredient1: PropTypes.string.isRequired,
  }).isRequired,
};
