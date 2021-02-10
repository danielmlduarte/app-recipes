import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { Profile } from '../pages';

describe('Teste se a página Explore', () => {
  it('renderiza o componente Header apenas com o botão de perfil', () => {
    renderWithRedux(<Profile />);
    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Perfil');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('renderiza o componente Footer e seus elementos na tela', () => {
    renderWithRedux(<Profile />);
    const footer = screen.getByTestId('footer');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });

  it('renderiza os botões de receitas feitas, receitas favoritas e logout', () => {
    renderWithRedux(<Profile />);
    const doneButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('renderiza o email do usuário', () => {
    renderWithRedux(<Profile />);
    const emailText = screen.getByTestId('profile-email');
    expect(emailText).toBeInTheDocument();
  });
});
