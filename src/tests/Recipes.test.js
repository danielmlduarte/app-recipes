import React from 'react';
/* import { MemoryRouter, history } from 'react-router-dom'; */
import { fireEvent, screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { Recipes } from '../pages';

const mealsMock = require('./Mocks/meals');
const beefMealsMock = require('./Mocks/beefMeals');
const mealCategories = require('./Mocks/mealCategories');
/* const oneMeal = require('./Mocks/oneMeal'); */

const mockFetchMeals = Promise.resolve({
  json: () => Promise.resolve(mealsMock),
});

const mockFetchMealCategories = Promise.resolve({
  json: () => Promise.resolve(mealCategories),
});

const mockFetchBeefMeals = Promise.resolve({
  json: () => Promise.resolve(beefMealsMock),
});

/* const mockFetchOneMeals = Promise.resolve({
  json: () => Promise.resolve(oneMeal),
}); */

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
    const { getByTestId } = renderWithRedux(<Recipes type="comidas" />);
    const profileButton = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    const searchButton = getByTestId(DATA_TEST_ID_SEARCH_TOP);
    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('se ao clicar no botão de busca o componente SearchBar é renderizado', () => {
    const { getByTestId, queryByTestId } = renderWithRedux(<Recipes type="comidas" />);
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
    const { getByTestId, history } = renderWithRedux(<Recipes type="comidas" />);
    fireEvent.click(getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Renderiza somente 12 receitas na página', async () => {
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 14;
    const INDEX_ADD = 1;
    const ITEMS_INDEX = 11;
    renderWithRedux(<Recipes type="comidas" />);
    const recipesNames = await screen.findAllByTestId(/card-name/);
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += INDEX_ADD) {
      if (index <= ITEMS_INDEX) {
        expect(recipesNames[index]).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
      }
    }
  });

  it('se o card das receitas renderiza todos os elementos', async () => {
    renderWithRedux(<Recipes type="comidas" />);
    const recipeName = await screen.findByTestId('0-card-name');
    const recipeImage = await screen.findByTestId('0-card-img');
    const recipeCard = await screen.findByTestId('0-recipe-card');
    const recipeNameText = await screen.findAllByText('Corba');
    expect(recipeName).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeCard).toBeInTheDocument();
    expect(recipeImage.src).toBe('https://www.themealdb.com/images/media/meals/58oia6s1564916529.jpg');
    expect(recipeNameText[0]).toBeInTheDocument();
  });

  it('se redireciona a pessoa para a página de detalhes da receita', async () => {
    const { history } = renderWithRedux(<Recipes type="comidas" />);
    const recipeItem = await screen.findByTestId('0-card-name');
    fireEvent.click(recipeItem);
    expect(history.location.pathname).toBe('/comidas/52977');
  });

  it(`se ao clicar no filtro beef,
    renderiza receitas com este ingrediente`, async () => {
    global.fetch.mockClear();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchMealCategories);
    renderWithRedux(<Recipes type="comidas" />);
    const beefFilterButton = await screen.findByTestId('Beef-category-filter');
    global.fetch.mockClear();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchBeefMeals);
    fireEvent.click(beefFilterButton);
    const recipeItem = await screen.findByText('Beef and Mustard Pie');
    expect(recipeItem).toBeInTheDocument();
  });

  it(`se ao pesquisar por beef na busca por ingrediente,
    renderiza receitas com este ingrediente`, async () => {
    renderWithRedux(<Recipes type="comidas" />);
    fireEvent.click(await screen.findByTestId(DATA_TEST_ID_SEARCH_TOP));
    fireEvent.click(await screen.findByTestId(DATA_TEST_ID_SEARCH_INPUT), {
      target: { value: 'beef' },
    });
    global.fetch.mockClear();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchBeefMeals);
    fireEvent.click(await screen.findByTestId(DATA_TEST_ID_EXEC_SEARCH));
    const recipeItem = await screen.findByText('Beef and Mustard Pie');
    expect(recipeItem).toBeInTheDocument();
  });

  /* it(`se ao pesquisar por nome e for apenas,
    renderiza receitas com este ingrediente`, async () => {
    const { history } = renderWithRedux(<Recipes type="comidas" />);
    fireEvent.click(await screen.findByTestId(DATA_TEST_ID_SEARCH_TOP));
    fireEvent.click(await screen.findByTestId(DATA_TEST_ID_SEARCH_INPUT), {
      target: { value: 'Spicy Arrabiata Penne' },
    });
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    global.fetch.mockClear();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchOneMeals);
    fireEvent.click(await screen.findByTestId(DATA_TEST_ID_EXEC_SEARCH));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52771');
  }); */

  it('renderiza o componente Footer e seus elementos na tela', () => {
    const { getByTestId } = renderWithRedux(<Recipes type="comidas" />);
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
    const { getByTestId, history } = renderWithRedux(<Recipes type="comidas" />);
    const exploreButton = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar');
  });

  it('se ao clicar no ícone de bebidas, renderiza a página de bebidas', async () => {
    const { getByTestId, history } = renderWithRedux(<Recipes type="comidas" />);
    const drinkButton = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinkButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas');
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
