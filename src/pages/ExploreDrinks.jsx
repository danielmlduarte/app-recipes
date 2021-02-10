import React, { Component } from 'react';
import { CustomExploreDrinks, CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';

export default class ExploreDrinks extends Component {
  render() {
    return (
      <div className="explore-content">
        <CustomHeader
          title="Explorar Bebidas"
          showSearchTopBtn={ false }
        />
        <CustomExploreDrinks />
        <CustomFooter />
      </div>
    );
  }
}
