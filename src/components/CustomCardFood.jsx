import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CustomCardFood({ index, recipe, recipeType }) {
  let recipeId = '';
  if (recipe) {
    recipeId = (recipeType === 'comidas') ? recipe.idMeal : recipe.idDrink;
  }
  return (
    <div className="card single-card-main-page-content" style={ { width: '8rem' } }>
      {
        !recipe
          ? 'loading'
          : (
            <Link to={ `/${recipeType}/${recipeId}` }>
              <img
                data-testid={ `${index}-card-img` }
                className="card-img-top img-card-main-page"
                src={ (recipeType === 'comidas')
                  ? recipe.strMealThumb
                  : recipe.strDrinkThumb }
                alt="imagem de uma receita"
              />
              <div className="card-body">
                <p
                  data-testid={ `${index}-recipe-card` }
                  className="card-text card-text-main-page"
                >
                  { `receita ${index + 1}` }
                </p>
                <p
                  data-testid={ `${index}-card-name` }
                  className="card-title card-title-main-page"
                >
                  { (recipeType === 'comidas') ? recipe.strMeal : recipe.strDrink }
                </p>
              </div>
            </Link>
          )
      }
    </div>
  );
}

CustomCardFood.propTypes = {
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.number.isRequired,
    idDrink: PropTypes.number.isRequired,
  }).isRequired,
};
