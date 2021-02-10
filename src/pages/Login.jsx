import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStorage, getStorage } from '../services/localStorage';
import { CustomLogin } from '../components';
import { addEmailAction, addPasswordAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      buttonDisable: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validaInput = this.validaInput.bind(this);
    this.setUpLocalStorage = this.setUpLocalStorage.bind(this);
  }

  handleSubmit() {
    setStorage('mealsToken', 1);
    setStorage('cocktailsToken', 1);
    const { email, password } = this.state;
    const { history, dispatchEmail, dispatchPassword } = this.props;
    dispatchEmail(email);
    dispatchPassword(password);
    setStorage('user', { email });
    this.setUpLocalStorage();
    history.push('/comidas');
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validaInput);
  }

  setUpLocalStorage() {
    if (!getStorage('doneRecipes')) {
      setStorage('doneRecipes', []);
    }
    if (!getStorage('favoriteRecipes')) {
      setStorage('favoriteRecipes', []);
    }
    if (!getStorage('inProgressRecipes')) {
      setStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    }
  }

  validaInput() {
    const { email, password } = this.state;
    const number = 6;
    if (email.match(/\S+@\S+\.\S+/) && password.length > number) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <div className="margin-page">
        <CustomLogin
          onInputChange={ this.handleInputChange }
          onHandleSubmit={ this.handleSubmit }
          validate={ buttonDisable }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (e) => dispatch(addEmailAction(e)),
  dispatchPassword: (e) => dispatch(addPasswordAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchPassword: PropTypes.func.isRequired,
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
