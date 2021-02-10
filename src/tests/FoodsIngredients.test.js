import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { FoodsIngredients } from '../pages';

const mealsMock = require('./Mocks/mealIngredients');

const mockFetchMeals = Promise.resolve({
  json: () => Promise.resolve(mealsMock),
});

describe('Teste se a página Explore', () => {
  it('renderiza o componente Header apenas com o botão de perfil', () => {
    renderWithRedux(<FoodsIngredients />);
    const profileButton = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchButton = screen.queryByTestId('search-top-btn');
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe(' Explorar Ingredientes');
    expect(searchButton).not.toBeInTheDocument();
  });

  it('renderiza o componente Footer e seus elementos na tela', () => {
    renderWithRedux(<FoodsIngredients />);
    const footer = screen.getByTestId('footer');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const exploreButton = screen.getByTestId('explore-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });

  it('renderiza somente 12 card de ingredientes e seus elementos na página', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchMeals);
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 14;
    const INDEX_ADD = 1;
    const ITEMS_INDEX = 11;
    renderWithRedux(<FoodsIngredients />);
    const ingredientsCards = await screen.findAllByTestId(/ingredient-card/);
    const ingredientsImages = await screen.findAllByTestId(/card-img/);
    const ingredientsNames = await screen.findAllByTestId(/card-name/);
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += INDEX_ADD) {
      if (index <= ITEMS_INDEX) {
        expect(ingredientsCards[index]).toBeInTheDocument();
        expect(ingredientsImages[index]).toBeInTheDocument();
        expect(ingredientsNames[index]).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(`${index}-ingredient-card`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-img`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
      }
    }
  });
});
