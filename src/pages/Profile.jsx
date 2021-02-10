import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomFooter } from '../components';
import CustomHeader from '../components/CustomHeader';
import { getStorage } from '../services/localStorage';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.getEmailStorage = this.getEmailStorage.bind(this);
    this.go = this.go.bind(this);
  }

  getEmailStorage() {
    if (!getStorage('user')) return 'usuário não logado';
    const { email } = getStorage('user');
    return email;
  }

  go({ target: { name } }) {
    const { history } = this.props;
    if (name === 'profile') history.push('/receitas-feitas');
    if (name === 'receitas-favoritas') history.push('/receitas-favoritas');
    if (name === 'sair') {
      localStorage.clear();
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <CustomHeader title="Perfil" showSearchTopBtn={ false } />
        <div className="profile-main-content">
          <p data-testid="profile-email">{ this.getEmailStorage() }</p>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ (e) => this.go(e) }
            name="profile"
            className="btn btn-danger"
          >
            Receitas Feitas
          </button>

          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ (e) => this.go(e) }
            name="receitas-favoritas"
            className="btn btn-danger"
          >
            Receitas Favoritas
          </button>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ (e) => this.go(e) }
            name="sair"
            className="btn btn-dark"
          >
            Sair
          </button>
        </div>
        <CustomFooter />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.func.isRequired,
};
export default Profile;
