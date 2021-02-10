import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomFooter, CustomDropdown, CustomCardFood } from '../components';
import CustomHeader from '../components/CustomHeader';
import { requestRecipes } from '../redux/actions';
import { getFoodRecipes, getAllOrigin } from '../services';

class ExploreArea extends Component {
  constructor() {
    super();
    this.getOrigin = this.getOrigin.bind(this);
    this.renderAlertError = this.renderAlertError.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.allFoods = this.allFoods.bind(this);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getOrigin();
    this.allFoods();
  }

  handleRecipes() {
    const { meals, isFetching } = this.props;
    const numberToComper = 1;
    if (meals.length === numberToComper) {
      return <Redirect to={ `/comidas/${meals[0].idMeal}` } />;
    }
    if (isFetching) return this.renderLoading();
    if (!meals.length && !isFetching) return this.renderAlertError();
    if (meals.length === 1) return this.redirectToRecipeDetail();
    return this.renderRecipes();
  }

  async getOrigin() {
    const { meals } = await getAllOrigin();
    this.setState({ data: meals });
  }

  allFoods() {
    const { dispatchFoodRecipes } = this.props;
    dispatchFoodRecipes({});
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

  renderRecipes() {
    const { meals, type } = this.props;
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = meals.length > LENGTH ? LENGTH : meals.length;
    return (
      <div className="explore-by-origin-cards">
        {meals && meals
          .slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((meal, index) => (
            <CustomCardFood
              key={ meal.idMeal }
              index={ index }
              recipe={ meal }
              recipeType={ type }
            />
          ))}
      </div>
    );
  }

  renderAlertError() {
    const { dispatchUpdateFoodIsFetching } = this.props;
    dispatchUpdateFoodIsFetching();
    return alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }

  render() {
    const { data } = this.state;
    return (
      <div className="origins-main-content">
        <CustomHeader title="Explorar Origem" />
        <CustomDropdown
          data={ data }
          allFoods={ this.allFoods }
        />
        {this.handleRecipes()}

        <CustomFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.recipesReducer.recipes,
  isFetching: state.recipesReducer.isFetching,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchUpdateFoodIsFetching: () => dispatch(requestRecipes()),
});

ExploreArea.propTypes = {
  dispatchUpdateFoodIsFetching: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meals: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExploreArea);
