import React from 'react';
import PropTypes from 'prop-types';
import WelcomeBanner from './welcome_banner';
import TeamStatus from './team_status';
import PlayerRounds from './player_rounds_table';

const BetweenRounds = (props) => {
	let completedRounds = props.rounds.slice(0, props.finishedRounds);

	return (
		<div>
			<WelcomeBanner
				team={props.player.team}
				playerName={props.player.name}
			/>
			{props.finishedRounds > 0 && (
				<div className=''>
					<div className='content has-text-centered'>
						{props.playerStatus &&
							props.playerStatus.teamStatus && (
								<TeamStatus
									teamStatus={props.playerStatus.teamStatus}
									playerTeam={props.player.team}
									teams={props.teams}
								/>
							)}
						<h2 className='subtitle is-size-6-mobile bo'>
							Your personal score is{' '}
							<span
								className={
									(props.playerStatus.totalScore < 0
										? 'has-text-danger'
										: 'has-text-success') +
									' is-size-3 is-size-5-mobile has-text-weight-bold'
								}>
								{props.playerStatus.totalScore
									? props.playerStatus.totalScore
									: 0}
							</span>{' '}
							after{' '}
							<span className='has-text-info is-size-4 is-size-5-mobile has-text-weight-bold'>
								{props.finishedRounds}
							</span>{' '}
							round{props.finishedRounds > 1 ? 's' : ''}
						</h2>
						<h3 className='subtitle is-size-6-mobile'>
							<span
								className={
									(props.playerStatus.correctAnswers > 0
										? 'has-text-success'
										: 'has-text-warning') +
									' is-size-4 is-size-5-mobile has-text-weight-bold'
								}>
								{props.playerStatus.correctAnswers}
							</span>{' '}
							out of{' '}
							<span className='has-text-info is-size-4 is-size-5-mobile has-text-weight-bold'>
								{props.playerStatus.questionsAnswered}
							</span>{' '}
							questions correct
							<span className='has-text-info'>
								{props.playerStatus.questionsAnswered !== 0
									? ' (' +
									  Math.round(
											100 *
												(props.playerStatus
													.correctAnswers /
													props.playerStatus
														.questionsAnswered)
									  ) +
									  '%)'
									: ''}
							</span>
						</h3>
						<hr />
						<p className='has-text-black'>
							Here&apos;s how you did in each round so far:
						</p>
						<PlayerRounds
							playerStatus={props.playerStatus}
							completedRounds={completedRounds}
						/>
						<p className='has-text-black has-text-weight-bold mt-6'>
							Good luck in the next round!
						</p>
					</div>
				</div>
			)}
			{props.finishedRounds === 0 && (
				<div className='notification is-light'>
					<div className='content has-text-centered'>
						<h2 className='subtitle has-text-success is-size-5-mobile'>
							You&apos;re in!
						</h2>
						<h2 className='subtitle is-size-5-mobile'>
							Stay tuned, the first round will be along shortly...
						</h2>
						{props.playerStatus &&
							props.playerStatus.teamStatus && (
								<TeamStatus
									teamStatus={props.playerStatus.teamStatus}
									playerTeam={props.player.team}
									teams={props.teams}
								/>
							)}
						<hr />
					</div>
				</div>
			)}
		</div>
	);
};

BetweenRounds.propTypes = {
	finishedRounds: PropTypes.number.isRequired,
	playerStatus: PropTypes.object.isRequired,
	player: PropTypes.object.isRequired,
	rounds: PropTypes.array.isRequired,
	teams: PropTypes.array.isRequired,
};

export default BetweenRounds;
