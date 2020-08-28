import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NextRound from './next_round';
import BetweenRounds from './between_rounds';
import RoundFinished from './round_finished';
import SessionLoading from './session_loading';


class LiveSession extends Component {

	constructor(props){
		super(props);
	}

	render() {
		let round = {};
		let lastRound = {};

		let allInstances = this.props.rounds.allRoundInstances;
		let nextRoundIndexes = this.props.rounds.nextRoundIndexes;

		let finishedRounds = (allInstances.length - nextRoundIndexes.length);

		if(nextRoundIndexes.length > 0){
			// we have an actual round object to pass down
			round = allInstances[nextRoundIndexes[0]];
		}

		let justFinished = false;

		if(finishedRounds > 0){
			// let's see if a round has JUST finished
			lastRound = allInstances[finishedRounds - 1];
			justFinished = lastRound.justFinished;
		}

		return (
			<div>
				{ justFinished && <RoundFinished round={lastRound} />}
				{!justFinished &&
				<div>
					{ !this.props.initialLoadComplete &&
						<SessionLoading />
					}

					{(this.props.initialLoadComplete) &&
					<div>
						{ nextRoundIndexes.length == 0 &&
							<BetweenRounds player={this.props.player}
								playerStatus={this.props.playerStatus}
								sessionName={this.props.session.name}
								finishedRounds={finishedRounds}
								isLoadingRounds={this.props.rounds.isLoading}
								rounds={this.props.rounds.allRoundInstances}
								teams={this.props.session.teams}
							/> }

						{	(nextRoundIndexes.length > 0) &&
						<NextRound round={ round }
							player={this.props.player}
							playerStatus={this.props.playerStatus}
							session={this.props.session} />
						}
					</div>
					}

				</div> }
			</div>
		);
	}
}

LiveSession.propTypes = {
	initialLoadComplete: PropTypes.bool.isRequired,
	rounds: PropTypes.object.isRequired,
	player: PropTypes.object.isRequired,
	session: PropTypes.object.isRequired,
	playerStatus: PropTypes.object.isRequired
};

export default LiveSession;