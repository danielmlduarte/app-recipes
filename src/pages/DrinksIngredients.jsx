import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomFooter, CustomIngredientsDrinks } from '../components';
import CustomHeader from '../components/CustomHeader';
import { getIngredientsDrink } from '../services';
import { requestIngredients } from '../redux/actions/recipesActions';

class DrinksIngredients extends Component {
  constructor() {
    super();
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.state = {
      drinks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleIngredients();
  }

  async handleIngredients() {
    const { drinks } = await getIngredientsDrink();
    if (drinks) {
      this.setState({
        drinks,
        isLoading: false,
      });
    }
  }

  renderIngredients() {
    const { drinks } = this.state;
    const { dispatchIngredients } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = drinks.length > LENGTH ? LENGTH : drinks.length;
    return (
      <div className="explore-ingredients-content">
        { drinks.slice(INITIAL_LENGTH, MAX_LENGTH).map((drink, index) => (
          <CustomIngredientsDrinks
            key={ drink.idIngredient }
            index={ index }
            drink={ drink }
            dispatch={ dispatchIngredients }
          />
        ))}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="loading">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <CustomHeader
          title="
          Explorar Ingredientes"
          showSearchTopBtn={ false }
        />
        { isLoading ? this.renderLoading()
          : this.renderIngredients()}
        <CustomFooter />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchIngredients: (Ingredients) => dispatch(requestIngredients(Ingredients)),
});

DrinksIngredients.propTypes = {
  dispatchIngredients: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(DrinksIngredients);
