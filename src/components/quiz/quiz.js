import React from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import QuizLogin from './quiz_login';
import QuizExplanation from './quiz_explanation';

const Quiz = () => <div>
	<Header />
	<div id="wrapper" className="columns" style={{padding:'0 20px'}}>
		<div className="column is-half is-offset-one-quarter">
			<QuizLogin />
			<QuizExplanation />
		</div>
	</div>
	<Footer />
</div>;

export default Quiz;