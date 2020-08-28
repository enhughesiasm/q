import React from 'react';
import ErrorBoundary from './error_boundary';

import { Switch, BrowserRouter, Route, HashRouter } from 'react-router-dom';
import Quiz from './components/quiz/quiz';
import AdminGate from './components/admin/admin_gate';
import Scores from './components/scores/scores';

console.log(process.env.PUBLIC_URL);

const App = () => (
	<ErrorBoundary>
		<HashRouter basename='/q'>
			<Switch>
				<Route
					exact
					path='/'
					// path={`${process.env.PUBLIC_URL}/q/`}
					component={Quiz}
				/>
				<Route
					exact
					path={'/admin'}
					// path={`${process.env.PUBLIC_URL}/admin`}
					component={AdminGate}
				/>
				<Route
					exact
					path={'/scores'}
					// path={`${process.env.PUBLIC_URL}/scores`}
					component={Scores}
				/>
				<Route component={NotFound} />
			</Switch>
		</HashRouter>
	</ErrorBoundary>
);

export default App;

const NotFound = () => <h1>404.. Page not found!</h1>;
