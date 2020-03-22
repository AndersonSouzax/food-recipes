import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { authenticated } from './auth';
import Login from './login';
import Header from './header';

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
    	<Header />   
        <Switch>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
);

export default Routes;