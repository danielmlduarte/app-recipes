import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CustomButtonShare } from '.';

class CustomCardRecipeDone extends Component {
  render() {
    const { index, recipe } = this.props;
    return (
      <div>
        <div className="card single-card-main-page-content">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt=""
              className="card-img-top img-card-main-page"
            />
            <p
              data-testid={ `${index}-horizontal-name` }
              className="card-title card-title-done-page card-done-recipes"
            >
              {recipe.name}
            </p>
            <div className="card-text card-text-done-page card-done-recipes">
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>
              {recipe.tags.length >= 1 ? (
                <div>
                  Tags:
                  { recipe.tags.map((item) => (
                    <span
                      key={ index }
                      data-testid={ `${index}-${item}-horizontal-tag` }
                      className="card-tags"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p data-testid={ `${index}-${recipe.tags}-horizontal-tag` } />
              )}
            </div>
          </Link>
        </div>
        <CustomButtonShare
          url={ `/${recipe.type}s/${recipe.id}` }
          testDone
          index={ index }
          className="share-like-btn-favorite"
        />
      </div>
    );
  }
}

CustomCardRecipeDone.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};
export default CustomCardRecipeDone;
