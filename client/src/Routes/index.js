import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../Pages/Login';
import Surveys from '../Pages/Surveys';

//PRIVATE ROUTE
import PrivateRoute from './PrivateRoute';

export default (
    <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Surveys} />
    </Switch>
);