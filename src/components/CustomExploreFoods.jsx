import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { randomFoodsApi } from '../services';

export default class CustomExploreFoods extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
  }

  async componentDidMount() {
    const { meals } = await randomFoodsApi();
    this.fetchFoodsRandom(meals[0].idMeal);
  }

  fetchFoodsRandom(value) {
    this.setState({ id: value });
  }

  render() {
    const { id } = this.state;

    return (
      <div className="explore-choose-type-content">
        <Link to="/explorar/comidas/ingredientes" data-testid="explore-by-ingredient">
          <button
            className="btn btn-danger btn-explore-choose-type"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area" data-testid="explore-by-area">
          <button
            className="btn btn-danger btn-explore-choose-type"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${id}` } data-testid="explore-surprise">
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
