import React from 'react';
import loadable from '@loadable/component';
const NavbarLayout = loadable(() => import('./components/layout/NavbarLayout'));
const PublicRoutes = loadable(() => import('./components/PublicRoute'));

const App = () => (
	<>
		<NavbarLayout />
		<PublicRoutes />
	</>
);

export default App;
