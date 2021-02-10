import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomExplore() {
  return (
    <div className="explore-choose-type-content">
      <button
        type="button"
        data-testid="explore-food"
        className="btn btn-danger btn-explore-choose-type"
      >
        <Link to="/explorar/comidas" className="link">Explorar Comidas</Link>
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        className="btn btn-danger btn-explore-choose-type"
      >
        <Link to="/explorar/bebidas" className="link">Explorar Bebidas</Link>
      </button>
    </div>
  );
}
