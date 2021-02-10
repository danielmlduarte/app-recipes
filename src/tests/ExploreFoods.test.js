import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { ExploreFoods } from '../pages';

describe('Teste se a página Explore', () => {
  it('renderiza o componente Header apenas com o botão de perfil', () => {
    renderWithRedux(<ExploreFoods />);
    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Explorar Comidas');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('renderiza o componente Footer e seus elementos na tela', () => {
    renderWithRedux(<ExploreFoods />);
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
    renderWithRedux(<ExploreFoods />);
    const exploreIngredientButton = screen.getByTestId('explore-by-ingredient');
    const exploreAreaButton = screen.getByTestId('explore-by-area');
    const exploreSurpriseButton = screen.getByTestId('explore-surprise');
    expect(exploreIngredientButton).toBeInTheDocument();
    expect(exploreAreaButton).toBeInTheDocument();
    expect(exploreSurpriseButton).toBeInTheDocument();
  });
});
