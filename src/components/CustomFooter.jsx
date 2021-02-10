import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function CustomFooter() {
  return (
    <footer data-testid="footer" className="footer">
      <Link
        to="/bebidas"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img
          src={ drinkIcon }
          alt="Drink Icon"
        />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIcon }>
        <img
          src={ exploreIcon }
          alt="Explore Icon"
        />
      </Link>
      <Link
        to="/comidas"
        data-testid="food-bottom-btn"
        src={ mealIcon }
      >
        <img
          src={ mealIcon }
          alt="Meal Icon"
        />
      </Link>
    </footer>
  );
}

export default CustomFooter;
