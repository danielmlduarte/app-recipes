import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/logoDoAppEscrita.jpg';
import Facebook from '../images/facebookIcon.png';
import Instagram from '../images/instagramIcon.jpg';
import WhatsApp from '../images/whatsAppIcon.jpg';

export default function CustomLogin({
  onInputChange,
  onHandleSubmit,
  validate,
}) {
  return (
    <div className="login-content">
      <img src={ logo } className="login-logo" alt="logo do app" />
      <form className="form-login-content">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <input
              data-testid="email-input"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
              maxLength="50"
              placeholder="Email"
              onChange={ onInputChange }
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            <input
              data-testid="password-input"
              maxLength="40"
              placeholder="Senha"
              name="password"
              type="password"
              aria-describedby="emailHelp"
              className="form-control"
              onChange={ onInputChange }
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={ onHandleSubmit }
          data-testid="login-submit-btn"
          disabled={ validate }
        >
          Enviar
        </button>
      </form>
      <span className="sign-up-text">Ainda não tem registro?</span>
      <span><a href="/" className="sign-up-click"> Click aqui</a></span>
      <hr />
      <div className="social-midia">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ Facebook }
            alt="logo do facebook"
            className="social-media-logo"
          />
        </a>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ Instagram }
            alt="logo do instagram"
            className="social-media-logo"
          />
        </a>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ WhatsApp }
            alt="logo do WhatsApp"
            className="social-media-logo"
          />
        </a>
      </div>
    </div>
  );
}

CustomLogin.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  validate: PropTypes.bool.isRequired,
};
