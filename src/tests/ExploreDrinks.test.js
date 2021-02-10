import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { ExploreDrinks } from '../pages';

describe('Teste se a página Explore', () => {
  it('renderiza o componente Header apenas com o botão de perfil', () => {
    renderWithRedux(<ExploreDrinks />);
    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Explorar Bebidas');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('renderiza o componente Footer e seus elementos na tela', () => {
    renderWithRedux(<ExploreDrinks />);
    const footer = screen.getByTestId('footer');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });

  it('renderiza os botões da página de explorar comidas', () => {
    renderWithRedux(<ExploreDrinks />);
    const exploreIngredientButton = screen.getByTestId('explore-by-ingredient');
    const exploreSurpriseButton = screen.getByTestId('explore-surprise');
    expect(exploreIngredientButton).toBeInTheDocument();
    expect(exploreSurpriseButton).toBeInTheDocument();
  });
});
