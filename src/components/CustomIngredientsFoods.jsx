import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomIngredientsFoods({ index, meal, dispatch }) {
  const { strIngredient } = meal;
  return (
    <div className="card single-card-explore-ingredients">
      <Link to="/comidas" onClick={ () => dispatch(strIngredient) }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          alt="Ingredientes"
          className="card-img-top img-card-explore-ingredients"
        />
        <div className="card-body">
          <p
            data-testid={ `${index}-ingredient-card` }
            className="card-text ingredient-text-card"
          >
            { `Ingredientes ${index}` }
          </p>
          <p
            data-testid={ `${index}-card-name` }
            className="card-title ingredient-title-card"
          >
            { strIngredient }
          </p>
        </div>
      </Link>
    </div>
  );
}

CustomIngredientsFoods.propTypes = {
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  meal: PropTypes.shape({
    strIngredient: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idIngredient: PropTypes.number.isRequired,
  }).isRequired,
};
