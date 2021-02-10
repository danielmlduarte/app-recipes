import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArea } from '../services';

class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.areaFromOrigin = this.areaFromOrigin.bind(this);
  }

  async areaFromOrigin({ target: { value } }) {
    const { dispatchArea, allFoods } = this.props;
    if (value === 'all') return allFoods();
    await dispatchArea(value);
  }

  render() {
    const { data } = this.props;
    return (
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => this.areaFromOrigin(e) }
        className="btn btn-danger"
      >
        <option
          data-testid="All-option"
          value="all"
          className="options-origins-dropdown"
        >
          All
        </option>
        { data && data.map((item, index) => (
          <option
            key={ index }
            data-testid={ `${item.strArea}-option` }
            value={ item.strArea }
          >
            { item.strArea }
          </option>
        ))}
      </select>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchArea: (e) => dispatch(getArea(e)),
});

export default connect(null, mapDispatchToProps)(CustomDropdown);
CustomDropdown.propTypes = {
  data: PropTypes.func.isRequired,
  dispatchArea: PropTypes.func.isRequired,
  allFoods: PropTypes.func.isRequired,
};
