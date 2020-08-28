import React from 'react';
import Giphy from '../../shared/giphy';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ExhaustedRound = (props) =>{
	let scoreForThisRound = 0;
	let roundScore = props.playerStatus.scoresByRoundInstanceId.filter(a => a[0] == props.roundInstanceId);
	if(roundScore && roundScore.length > 0 && roundScore[0][1]){
		scoreForThisRound = parseInt(roundScore[0][1]);
	}

	return(
		<section className="hero is-light is-medium">
			<div className="hero-body">
				<div className="content has-text-centered">
					<h2 className="subtitle is-size-6-mobile is-spaced">Hooray!</h2>
					<h1 className="title is-size-5-mobile has-text-success is-spaced">You&apos;ve answered every single question.</h1>
					<h3 className="subtitle is-size-6-mobile is-spaced">
						This round you scored <span className={'is-size-4 is-size-6-mobile ' + scoreForThisRound > 0 ? 'has-text-success' : 'has-text-danger' }>{ scoreForThisRound }</span>
						{ scoreForThisRound == props.playerStatus.totalScore ? '.' :
							<span> and your total score is <span className={'is-size-4 is-size-6-mobile ' + props.playerStatus.totalScore > 0 ? 'has-text-success' : 'has-text-danger' }>{props.playerStatus.totalScore}</span> </span> }
					</h3>
					<h3 className="subtitle is-size-6-mobile is-spaced">Chill out until the end of the round.</h3>
					<h3 className="subtitle is-size-6-mobile">(there&apos;s <Moment fromNow ago>{props.endTime}</Moment> to go).</h3>
					<Giphy tag={'relax'} />
				</div>
			</div>
		</section>);};

ExhaustedRound.propTypes = {
	roundInstanceId: PropTypes.number.isRequired,
	endTime: PropTypes.string.isRequired,
	playerStatus: PropTypes.object.isRequired
};

export default ExhaustedRound;