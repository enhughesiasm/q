import React from 'react';
import PropTypes from 'prop-types';
import QuestionText from './question_text';
import MathJax from 'react-mathjax2';

const UnansweredQuestion = (props) => (
	<div>
		<QuestionText question={props.question} />
		{
			props.question.answers.map((answer, i) =>
				<div key={i} className="quizanswer">
					<button className={'button is-size-4 is-size-6-mobile is-medium is-fullwidth is-info '}
						disabled={props.answerClicked}
						value={i}
						style={{ whiteSpace: 'normal', height: '100%'}}
						onClick={() => props.onClickAnswer(i)}>
						{ props.question.parseAsMaths && <MathJax.Context input='tex'>
							<span>
								<MathJax.Node inline>{ answer }</MathJax.Node>
							</span>
						</MathJax.Context> }
						{ !props.question.parseAsMaths && <span>{answer}</span> }
					</button>
				</div>
			)
		}

	</div>
);

UnansweredQuestion.propTypes = {
	question: PropTypes.object.isRequired,
	answerClicked: PropTypes.bool.isRequired,
	onClickAnswer: PropTypes.func.isRequired
};

export default UnansweredQuestion;