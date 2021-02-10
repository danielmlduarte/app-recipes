import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { NotFound } from '../pages';

describe('Teste se a página NotFound', () => {
  it('é renderizada quando tenta explorar bebidas por ingredientes', () => {
    const { history } = renderWithRedux(<NotFound />);
    history.push('/explorar/bebidas/ingredientes');
    const notFoundText = screen.queryByText('Not Found');
    expect(notFoundText).toBeInTheDocument();
  });
});
