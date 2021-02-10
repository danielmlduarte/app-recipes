import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFoodRecipes, getDrinkRecipes } from '../services';
import { requestRecipes, changeSearchBarAction } from '../redux/actions';

class CustomSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHeader: {
        searchInput: '',
        searchRadio: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      searchHeader: {
        ...prevState.searchHeader,
        [name]: value,
      },
    }));
  }

  async handleButtonClick() {
    const {
      dispatchFoodRecipes,
      dispatchDrinkRecipes,
      title,
      dispatchSearchBar,
    } = this.props;
    const { searchHeader } = this.state;
    const { searchRadio, searchInput } = searchHeader;
    if (searchRadio === 'f' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (title === 'Comidas') await dispatchFoodRecipes(searchHeader);
    if (title === 'Bebidas') await dispatchDrinkRecipes(searchHeader);
    await dispatchSearchBar();
  }

  render() {
    return (
      <form className="search-login-content">
        <div className="mb-3">
          <input
            data-testid="search-input"
            id="search-input"
            name="searchInput"
            type="text"
            className="form-control"
            placeholder="Buscar Receitas"
            onChange={ this.handleInputChange }
          />
        </div>
        <div>
          <div className="form-check form-check-inline">
            <label htmlFor="inlineRadio1" className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio1"
                name="searchRadio"
                value="i"
                data-testid="ingredient-search-radio"
                onChange={ this.handleInputChange }
              />
              Ingrediente
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label htmlFor="inlineRadio2" className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio2"
                name="searchRadio"
                value="s"
                data-testid="name-search-radio"
                onChange={ this.handleInputChange }
              />
              Nome
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label htmlFor="inlineRadio3" className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio3"
                name="searchRadio"
                value="f"
                data-testid="first-letter-search-radio"
                onChange={ this.handleInputChange }
              />
              Primeira letra
            </label>
          </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleButtonClick }
          className="btn btn-danger"
        >
          Buscar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchDrinkRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchUpdateFoodIsFetching: () => dispatch(requestRecipes()),
  dispatchSearchBar: () => dispatch(changeSearchBarAction()),
});

CustomSearchBar.propTypes = {
  dispatchFoodRecipes: PropTypes.func.isRequired,
  dispatchDrinkRecipes: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dispatchSearchBar: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CustomSearchBar);
