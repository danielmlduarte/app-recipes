import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Recipes,
  RecipeDetails,
  DrinksIngredients,
  FoodsIngredients,
  ExploreDrinks,
  ExploreFoods,
  Explore,
  FoodsOrigin,
  Profile,
  FavoriteRecipes,
  RecipeInProgress,
  NotFound,
  DoneRecipes,
} from './pages';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/comidas"
        render={ (props) => <Recipes { ...props } type="comidas" /> }
      />
      <Route
        exact
        path="/bebidas"
        render={ (props) => <Recipes { ...props } type="bebidas" /> }
      />
      <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/comidas/:id" component={ RecipeDetails } />
      <Route path="/bebidas/:id" component={ RecipeDetails } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/ingredientes" component={ FoodsIngredients } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksIngredients }
      />
      <Route exact path="/explorar/bebidas/area" component={ NotFound } />
      <Route
        exact
        path="/explorar/comidas/area"
        render={ (props) => <FoodsOrigin { ...props } type="comidas" /> }
      />
      <Route exact path="/perfil" component={ Profile } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
    </Switch>
  );
}

export default Rotas;
