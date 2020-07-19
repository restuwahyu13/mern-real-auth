import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component';

const App = loadable(() => import('./App'), {
	fallback: (
		<>
			<h5 className='text-dark'>Loading...</h5>
		</>
	),
});

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
