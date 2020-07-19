import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthToken } from './auth/AuthToken';

export const PrivateRoute = ({ component: Comp, ...rest }) => (
	<Route {...rest} render={(props) => (!isAuthToken() ? <Redirect to='/signin' /> : <Comp {...props} />)} />
);
