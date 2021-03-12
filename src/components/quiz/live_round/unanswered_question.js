import React from 'react';
import PropTypes from 'prop-types';
import QuestionText from './question_text';
import MathsString from '../../shared/maths_string';

const UnansweredQuestion = (props) => (
	<div>
		<QuestionText question={props.question} />
		{props.question.answers.map((answer, i) => (
			<div key={i} className='quizanswer'>
				<button
					className={
						'button is-size-4 is-size-6-mobile is-medium is-fullwidth is-info '
					}
					disabled={props.answerClicked}
					value={i}
					style={{ whiteSpace: 'normal', height: '100%' }}
					onClick={() => props.onClickAnswer(i)}>
					{props.question.parseAsMaths && (
						<MathsString inputString={answer} />
					)}
					{!props.question.parseAsMaths && <span>{answer}</span>}
				</button>
			</div>
		))}
	</div>
);

UnansweredQuestion.propTypes = {
	question: PropTypes.object.isRequired,
	answerClicked: PropTypes.bool.isRequired,
	onClickAnswer: PropTypes.func.isRequired,
};

export default UnansweredQuestion;
