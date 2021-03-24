import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../Pages/Login';
import Surveys from '../Pages/Surveys';

export default (
    <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Surveys} />
    </Switch>
);