import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { randomDrinksApi } from '../services';

export default class CustomExploreDrinks extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
  }

  async componentDidMount() {
    const { drinks } = await randomDrinksApi();
    this.fetchDrinksRandom(drinks[0].idDrink);
  }

  fetchDrinksRandom(value) {
    this.setState({ id: value });
  }

  render() {
    const { id } = this.state;
    return (
      <div className="explore-choose-type-content">
        <Link to="/explorar/bebidas/ingredientes" data-testid="explore-by-ingredient">
          <button
            className="btn btn-danger btn-explore-choose-type"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${id}` } data-testid="explore-surprise">
          <button
            className="btn btn-danger btn-explore-choose-type"
            type="button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  }
}
