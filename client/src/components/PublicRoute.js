import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrivateRoute } from './PrivateRoute';
const HomePage = loadable(() => import('./pages/HomePage'));
const ActivationAuth = loadable(() => import('./auth/ActivationAccount'));
const ForgotPasswordAuth = loadable(() => import('./auth/ForgotPassword'));
const LoginAuth = loadable(() => import('./auth/LoginAccount'));
const RegisterAuth = loadable(() => import('./auth/RegisterAccount'));
const ResetPasswordAuth = loadable(() => import('./auth/ResetPassword'));
const CaesarChritography = loadable(() => import('./CaesarChritograpy'));

const PublicRoutes = () => (
	<>
		<Switch>
			<PrivateRoute exact path='/' component={HomePage} />
			<Route path='/signin' component={LoginAuth} />
			<Route path='/signup' component={RegisterAuth} />
			<Route path='/activation/:token' component={ActivationAuth} />
			<Route path='/forgotpassword' component={ForgotPasswordAuth} />
			<Route path='/resetpassword/:token' component={ResetPasswordAuth} />
			<Route path='/app' component={CaesarChritography} />
			<Route path='*' render={() => <div>Route 404 Not Found</div>} />
		</Switch>
	</>
);

export default PublicRoutes;
