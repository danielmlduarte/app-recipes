import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setStorage, getStorage } from '../services';

export default class CustomDetailsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false,
      inProgress: false,
    };
  }

  componentDidMount() {
    this.verifyRecipeInProgress();
  }

  handleStartButtonClick() {
    const { recipeType, recipeId } = this.props;
    this.localStorageSetUp();
    if (recipeType === 'comidas') {
      setStorage('inProgressRecipes', {
        ...getStorage('inProgressRecipes'),
        meals: {
          ...getStorage('inProgressRecipes').meals,
          [recipeId]: [],
        },
      });
    }
    if (recipeType === 'bebidas') {
      setStorage('inProgressRecipes', {
        ...getStorage('inProgressRecipes'),
        cocktails: {
          ...getStorage('inProgressRecipes').cocktails,
          [recipeId]: [],
        },
      });
    }
    this.setState({ isRedirect: true });
  }

  localStorageSetUp() {
    if (!getStorage('inProgressRecipes')) {
      setStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    }
  }

  verifyRecipeInProgress() {
    const { recipeType, recipeId } = this.props;
    const inProgressRecipes = getStorage('inProgressRecipes');
    if (inProgressRecipes) {
      if (recipeType === 'comidas' && (inProgressRecipes.meals[recipeId])) {
        this.setState({ inProgress: true });
      }
      if (recipeType === 'bebidas' && inProgressRecipes.cocktails[recipeId]) {
        this.setState({ inProgress: true });
      }
    }
  }

  render() {
    const { recipeType, recipeId } = this.props;
    const { isRedirect, inProgress } = this.state;
    if (isRedirect) return <Redirect to={ `/${recipeType}/${recipeId}/in-progress` } />;
    return (
      <button
        className="button-footer-fixed btn btn-dark"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => this.handleStartButtonClick() }
      >
        { (inProgress) ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    );
  }
}

CustomDetailsButton.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipeId: PropTypes.number.isRequired,
};
