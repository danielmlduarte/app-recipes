import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { loginReducer, recipesReducer } from '../../redux/reducer';

const createMockStore = (initialState) => (
  createStore(combineReducers({
    loginReducer,
    recipesReducer,
  }), initialState, applyMiddleware(thunk))
);

const renderWithRedux = (
  component, {
    initialState,
    store = createMockStore(initialState),
    history = createMemoryHistory(),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  store,
});
export default renderWithRedux;
