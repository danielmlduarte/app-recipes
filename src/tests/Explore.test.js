import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { Explore } from '../pages';

describe('Teste se a página Explore', () => {
  it('renderiza o componente Header apenas com o botão de perfil', () => {
    renderWithRedux(<Explore />);
    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Explorar');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('renderiza o componente Footer e seus elementos na tela', () => {
    renderWithRedux(<Explore />);
    const footer = screen.getByTestId('footer');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });

  it('renderiza os botões explorar comidas e explorar bebidas', () => {
    renderWithRedux(<Explore />);
    const drinkButton = screen.getByTestId('explore-drinks');
    const foodButton = screen.getByTestId('explore-food');
    expect(drinkButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });
});
