import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax2';

const QuestionText = (props) => (

	<div>
		<div className="notification is-light is-marginless has-text-centered">
			<h2 className="subtitle is-size-6-mobile">{props.question.prompt}</h2>
		</div>
		<section className="notification is-dark is-bold has-text-centered">

			{ props.question.parseAsMaths && <MathJax.Context input='tex'>
				<span className="is-size-2 is-size-5-mobile">
					<MathJax.Node>{ props.question.question }</MathJax.Node>
				</span>
			</MathJax.Context> }
			{ !props.question.parseAsMaths && <span className="is-size-2 is-size-5-mobile">{props.question.question}</span> }

			{/*<h2 className="subtitle">Question:</h2>*/}
			{/* <div className="title" dangerouslySetInnerHTML={ {__html: props.questionHtml }}/> */}
		</section>
	</div>
);

QuestionText.propTypes = {
	question: PropTypes.object.isRequired
};

export default QuestionText;