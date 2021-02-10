import React from 'react';
/* import { MemoryRouter } from 'react-router-dom'; */
import { fireEvent } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import App from '../App';

const EMAIL = 'daniel_mld@hotmail.com';
const DATA_TEST_ID_EMAIL = 'email-input';
const DATA_TEST_ID_PASSWORD = 'password-input';
const DATA_TEST_ID_BUTTON = 'login-submit-btn';

describe('Teste se a página de login', () => {
  it('renderiza os elementos na tela', () => {
    const { getByTestId } = renderWithRedux(<App />);
    const emailInput = getByTestId(DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(DATA_TEST_ID_PASSWORD);
    const loginButton = getByTestId(DATA_TEST_ID_BUTTON);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('se é possível escrever nos inputs', () => {
    const { getByTestId } = renderWithRedux(<App />);
    const emailInput = getByTestId(DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(DATA_TEST_ID_PASSWORD);
    const PASSWORD = '12345678';
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    expect(emailInput.value).toBe(EMAIL);
    expect(passwordInput.value).toBe(PASSWORD);
  });

  it('se botão de login é habilitado após os campos email e senha sejam válidos', () => {
    const { getByTestId } = renderWithRedux(<App />);
    const emailInput = getByTestId(DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(DATA_TEST_ID_PASSWORD);
    const loginButton = getByTestId(DATA_TEST_ID_BUTTON);
    const PASSWORD = '12345678';
    expect(loginButton.disabled).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    expect(loginButton.disabled).toBeFalsy();
  });

  it('se o email é salvo no localStorage', () => {
    const { getByTestId } = renderWithRedux(<App />);
    const emailInput = getByTestId(DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(DATA_TEST_ID_PASSWORD);
    const loginButton = getByTestId(DATA_TEST_ID_BUTTON);
    localStorage.clear();
    const PASSWORD = '12345678';
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);
    const item = JSON.parse(localStorage.getItem('user'));
    expect(item.email).toBe('daniel_mld@hotmail.com');
  });

  it('se redireciona a pessoa para a página de receitas', () => {
    const { getByTestId, history } = renderWithRedux(<App />);
    const emailInput = getByTestId(DATA_TEST_ID_EMAIL);
    const passwordInput = getByTestId(DATA_TEST_ID_PASSWORD);
    const loginButton = getByTestId(DATA_TEST_ID_BUTTON);
    const PASSWORD = '12345678';
    expect(history.location.pathname).toBe('/');
    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);
    expect(history.location.pathname).toBe('/comidas');
  });

  /* test('when clicked in about link should redirect to url "/about" ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  }); */

  /* test('when clicked in favorite link should redirect to url "/favorite" ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  }); */

  /* test('when write "/teste" in url should redirect to Not Found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/teste';
    history.push(route);
    const notFoundText = getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  }); */
});
