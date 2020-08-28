import React from 'react';
import ErrorBoundary from './error_boundary';

import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Quiz from './components/quiz/quiz';
import AdminGate from './components/admin/admin_gate';
import Scores from './components/scores/scores';

const App = () => (
	<ErrorBoundary>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Quiz} />
				<Route exact path='/admin' component={AdminGate} />
				<Route exact path='/scores' component={Scores} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	</ErrorBoundary>
);

export default App;

const NotFound = () => <h1>404.. Page not found!</h1>;
