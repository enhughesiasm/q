import React from 'react';
import PropTypes from 'prop-types';
import WelcomeBanner from './welcome_banner';
import TeamStatus from './team_status';
import PlayerRounds from './player_rounds_table';

const BetweenRounds = (props) => {
	let completedRounds = props.rounds.slice(0, props.finishedRounds);

	return (
		<div>
			<WelcomeBanner team={props.player.team} playerName={props.player.name}/>
			{props.finishedRounds > 0 &&
		<div className="notification is-light">
			<div className="content has-text-centered">
				<h2 className="subtitle is-size-6-mobile">After <span className="has-text-info is-size-4 is-size-5-mobile has-text-weight-bold">{props.finishedRounds}</span> round{props.finishedRounds > 1 ? 's' : ''}, your score is <span className={(props.playerStatus.totalScore < 0 ? 'has-text-danger' : 'has-text-success') + ' is-size-3 is-size-5-mobile has-text-weight-bold'}>{props.playerStatus.totalScore ? props.playerStatus.totalScore : 0}</span>.</h2>
				<h3 className="subtitle is-size-6-mobile">You&apos;ve answered <span className="has-text-info is-size-4 is-size-5-mobile has-text-weight-bold">{props.playerStatus.questionsAnswered}</span> questions, <span className={( props.playerStatus.correctAnswers > 0 ? 'has-text-success' : 'has-text-warning') + ' is-size-3 is-size-5-mobile has-text-weight-bold'}>{props.playerStatus.correctAnswers}</span> correctly<span className='has-text-info'>{ props.playerStatus.questionsAnswered != 0 ? ' (' + Math.round(100 * (props.playerStatus.correctAnswers / props.playerStatus.questionsAnswered)) + '%)' : '' }</span>.</h3>
				{ props.playerStatus && props.playerStatus.teamStatus && <TeamStatus teamStatus={props.playerStatus.teamStatus} playerTeam={props.player.team} teams={props.teams} /> }
				<PlayerRounds playerStatus={props.playerStatus} completedRounds={completedRounds} />
			</div>
		</div>
			}
			{ props.finishedRounds == 0 &&
			<div className="notification is-light">
				<div className="content has-text-centered">
					<h2 className="subtitle has-text-success is-size-5-mobile">You&apos;re in!</h2>
					<h2 className="subtitle is-size-5-mobile">Stay tuned, the first round will be along shortly...</h2>
				</div>
			</div>
			}
		</div>);
};

BetweenRounds.propTypes = {
	finishedRounds: PropTypes.number.isRequired,
	playerStatus: PropTypes.object.isRequired,
	player: PropTypes.object.isRequired,
	rounds: PropTypes.array.isRequired,
	teams: PropTypes.array.isRequired
};

export default BetweenRounds;