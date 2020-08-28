import React, { Component } from 'react';
import RoundCountdown from './round_countdown';
import PropTypes from 'prop-types';
import LiveRound from './live_round/live_round';

class NextRound extends Component {

	static propTypes = {
		round: PropTypes.object.isRequired,
		player: PropTypes.object.isRequired,
		session: PropTypes.object.isRequired,
		playerStatus: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				{
					!this.props.round.isLive && <RoundCountdown roundName={this.props.round.name} roundNumber={this.props.round.roundNumber} secondsRemaining={this.props.round.secondsRemaining} />
				}
				{
					this.props.round.isLive && <LiveRound round={this.props.round}
						player ={this.props.player}
						session={this.props.session}
						playerStatus={this.props.playerStatus} />
				}
			</div>
		);
	}
}

export default NextRound;