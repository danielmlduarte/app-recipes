import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { FoodsOrigin } from '../pages';

const mealsMock = require('./Mocks/meals');

const mockFetchMeals = Promise.resolve({
  json: () => Promise.resolve(mealsMock),
});

const DATA_TEST_ID_SEARCH_TOP = 'search-top-btn';
const DATA_TEST_ID_SEARCH_INPUT = 'search-input';
const DATA_TEST_ID_EXEC_SEARCH = 'exec-search-btn';

describe('Teste se a página de receitas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchMeals);
  });
  afterEach(() => (
    jest.clearAllMocks()
  ));

  it('renderiza o componente Header e seus elementos na tela', () => {
    const { getByTestId } = renderWithRedux(<FoodsOrigin />);
    const profileButton = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    const searchButton = getByTestId(DATA_TEST_ID_SEARCH_TOP);
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('se ao clicar no botão de busca o componente SearchBar é renderizado', () => {
    const { getByTestId, queryByTestId } = renderWithRedux(<FoodsOrigin />);
    const searchButton = getByTestId(DATA_TEST_ID_SEARCH_TOP);
    expect(queryByTestId(DATA_TEST_ID_SEARCH_INPUT)).not.toBeInTheDocument();
    expect(queryByTestId('ingredient-search-radio')).not.toBeInTheDocument();
    expect(queryByTestId('name-search-radio')).not.toBeInTheDocument();
    expect(queryByTestId('first-letter-search-radio')).not.toBeInTheDocument();
    expect(queryByTestId(DATA_TEST_ID_EXEC_SEARCH)).not.toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(queryByTestId(DATA_TEST_ID_SEARCH_INPUT)).toBeInTheDocument();
    expect(queryByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(queryByTestId('name-search-radio')).toBeInTheDocument();
    expect(queryByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(queryByTestId(DATA_TEST_ID_EXEC_SEARCH)).toBeInTheDocument();
  });

  it('se ao apertar o botão de perfil é redirecionada para página de perfil', () => {
    const { getByTestId, history } = renderWithRedux(<FoodsOrigin />);
    fireEvent.click(getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Renderiza somente 12 receitas na página', async () => {
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 14;
    const INDEX_ADD = 1;
    const ITEMS_INDEX = 11;
    renderWithRedux(<FoodsOrigin />);
    const recipesNames = await screen.findAllByTestId(/card-name/);
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += INDEX_ADD) {
      if (index <= ITEMS_INDEX) {
        expect(recipesNames[index]).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
      }
    }
  });

  it('renderiza o componente Footer e seus elementos na tela', () => {
    const { getByTestId } = renderWithRedux(<FoodsOrigin />);
    const footer = getByTestId('footer');
    const drinkButton = getByTestId('drinks-bottom-btn');
    const exploreButton = getByTestId('explore-bottom-btn');
    const foodButton = getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });

  it('se ao clicar no ícone de explorar, renderiza a página de explorar', async () => {
    const { getByTestId, history } = renderWithRedux(<FoodsOrigin />);
    const exploreButton = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar');
  });
});
