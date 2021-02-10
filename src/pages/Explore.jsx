import React, { Component } from 'react';
import { CustomFooter } from '../components';
import CustomExplore from '../components/CustomExplore';
import CustomHeader from '../components/CustomHeader';

export default class Explore extends Component {
  render() {
    return (
      <div className="explore-content">
        <CustomHeader title="Explorar" />
        <CustomExplore />
        <CustomFooter />
      </div>
    );
  }
}
