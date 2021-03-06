import React from 'react';
import PropTypes from 'prop-types';
import QuestionText from './question_text';
import Giphy from '../../shared/giphy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHandPointRight,
	faHandPointLeft,
} from '@fortawesome/free-solid-svg-icons';
import MathsString from '../../shared/maths_string';

const AnsweredQuestion = (props) => {
	let question = props.question;
	let answeredCorrectly =
		question.submittedIndex != null &&
		Number.isInteger(question.submittedIndex) &&
		question.correctIndex != null &&
		Number.isInteger(question.correctIndex) &&
		question.submittedIndex === question.correctIndex;
	return (
		<div>
			<QuestionText question={props.question} />
			{props.question.answers.map((answer, i) => (
				<div key={i} className='quizanswer'>
					<button
						className={
							'button is-size-4 is-size-6-mobile is-medium is-fullwidth ' +
							(question.correctIndex === i
								? ' is-success '
								: props.clickedIndex === i
								? ' is-danger '
								: ' is-dark ')
						}
						disabled={true}
						style={{ whiteSpace: 'normal', height: '100%' }}
						value={i}>
						{props.clickedIndex === i && (
							<span className='tag is-black is-pulled-left answer-tag-left'>
								<FontAwesomeIcon icon={faHandPointRight} />
							</span>
						)}
						{props.question.parseAsMaths && (
							<MathsString inputString={answer} />
						)}
						{!props.question.parseAsMaths && <span>{answer}</span>}
						{props.clickedIndex === i && (
							<span className='tag is-black is-pulled-right answer-tag-right'>
								<FontAwesomeIcon icon={faHandPointLeft} />
							</span>
						)}
					</button>
				</div>
			))}
			<div
				className={
					'notification is-marginless has-text-centered ' +
					(answeredCorrectly ? 'is-success' : 'is-danger')
				}>
				<h1
					className='title is-spaced is-size-3 is-size-5-mobile '
					style={{ marginTop: '0.5rem' }}>
					{answeredCorrectly ? 'CORRECT' : 'INCORRECT'}
				</h1>
				<h2 className='subtitle is-spaced is-size-5 is-size-6-mobile '>
					You {answeredCorrectly ? 'gained' : 'lost'}{' '}
					<span className='has-text-weight-bold is-size-4 is-size-5-mobile '>
						{Math.abs(question.pointsEarned)}
					</span>{' '}
					points.{' '}
				</h2>
				<button
					className='button is-medium is-size-6-mobile is-fullwidth is-warning'
					onClick={props.onClickNextQuestion}>
					NEXT QUESTION
				</button>
				<Giphy tag={answeredCorrectly ? 'celebration' : 'sad'} />
			</div>
		</div>
	);
};

AnsweredQuestion.propTypes = {
	question: PropTypes.object.isRequired,
	clickedIndex: PropTypes.number.isRequired,
	onClickNextQuestion: PropTypes.func.isRequired,
};

export default AnsweredQuestion;
