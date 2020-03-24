import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { authenticated } from './storage';
import Login from './login';
import Recipes from './recipes';
import Recipe from './single-recipe';

const PrivateRoute = ({ component : Component, ...rest }) => (

	<Route 
      {...rest}
      
      render={ props => 

      	authenticated() ? (
      		<Component {...props} />
      	) : (
      		<Redirect to={{ pathname : '/login', state : {  from : props.location } } } />
      	)
      }
	/>
);

const Routes = () => (

    <BrowserRouter> 
        <Switch>
            <Route exact path="/">
                <Redirect to="/recipes" />
            </Route>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/recipes" component={Recipes} />
            <PrivateRoute path="/single-recipe" component={Recipe} />
        </Switch>
    </BrowserRouter>
);

export default Routes;