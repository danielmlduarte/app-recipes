import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

export default function CustomCardSuggested({ thumb, index, title, type, id }) {
  const recipeType = (type === 'comidas') ? 'bebidas' : 'comidas';
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <Link to={ `/${recipeType}/${id}` }>
        <img
          className="d-block w-100"
          src={ thumb }
          alt={ index }
        />
        <Carousel.Caption>
          <h3 data-testid={ `${index}-recomendation-title` }>{ title }</h3>
        </Carousel.Caption>
      </Link>
    </div>
  );
}

CustomCardSuggested.propTypes = {
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
