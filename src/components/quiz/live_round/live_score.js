import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FadeUp from '../../shared/fade_up';

export default class LiveScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			previousTotalScore: props.playerStatus.totalScore,
			changeInTotalScore: null,
			showAnimationUntil: null,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const showAnimationForSeconds = 1;

		if (nextProps.playerStatus.totalScore != prevState.previousTotalScore) {
			let change =
				nextProps.playerStatus.totalScore -
				(prevState.previousTotalScore
					? prevState.previousTotalScore
					: 0);

			return {
				previousTotalScore: nextProps.playerStatus.totalScore,
				changeInTotalScore: change,
				showAnimationUntil: moment().add(showAnimationForSeconds, 's'),
			};
		} else {
			return null;
		}
	}

	render() {
		let currentScore = 0;

		let roundScore = this.props.playerStatus.scoresByRoundInstanceId.find(
			(rs) => rs[0]?.toString() === this.props.roundInstanceId.toString()
		);

		if (roundScore && roundScore.length > 0) {
			currentScore = roundScore[1] ?? 0;
		}

		let showChangeAnimation = this.state.changeInTotalScore !== 0;

		let success = this.state.changeInTotalScore > 0;
		return (
			<div className='notification is-info is-clearfix'>
				<h1
					className='title is-size-5 is-size-6-mobile py-2'
					style={{ marginBottom: 0 }}>
					Your Score This Round:{' '}
					<span className='has-text-weight-bold  has-text-warning'>
						{currentScore}
					</span>
				</h1>
				<h1
					className='title is-size-5 is-size-6-mobile py-2'
					style={{ marginBottom: 0 }}>
					Your Total Score:{' '}
					<span className='has-text-weight-bold has-text-warning'>
						{this.props.playerStatus.totalScore
							? this.props.playerStatus.totalScore
							: 0}
					</span>
				</h1>
				{showChangeAnimation && (
					<FadeUp
						content={
							success
								? '+' + this.state.changeInTotalScore
								: this.state.changeInTotalScore
						}
						success={success}
						showUntil={this.state.showAnimationUntil}
					/>
				)}
			</div>
		);
	}
}

LiveScore.propTypes = {
	playerStatus: PropTypes.object.isRequired,
	roundInstanceId: PropTypes.number.isRequired,
};
