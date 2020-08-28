import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WaitingForSession from './waiting_for_session';
import LiveSession from './live_session';
import AssigningTeam from './assigning_team';
import TeamAssigned from './team_assigned';
import moment from 'moment';

class Session extends Component {

	render() {

		let showTeamAssignedUntil = this.props.showTeamAssignedScreenUntil;
		let showTeamAssignedScreen = (showTeamAssignedUntil && moment().isBefore(showTeamAssignedUntil));

		return (
			<section className="section">
				{!this.props.player.team &&
				<AssigningTeam />
				}
				{ showTeamAssignedScreen && <TeamAssigned team={this.props.player.team} /> }
				{
					(!showTeamAssignedScreen && this.props.player.team) &&
					<div>
						{ (this.props.session.isLive) &&
							<LiveSession initialLoadComplete={this.props.initialLoadComplete} session={this.props.session} player={this.props.player} rounds={this.props.rounds} playerStatus={this.props.playerStatus}/>
						}
						{ (!this.props.session.isLive) &&
							<WaitingForSession team={this.props.player.team} playerName={this.props.player.name} sessionName={this.props.session.name}/>
						}
					</div>
				}

			</section>
		);
	}
}

export default Session;

Session.propTypes = {	
	showTeamAssignedScreenUntil: PropTypes.object,
	initialLoadComplete: PropTypes.bool.isRequired,
	rounds: PropTypes.object.isRequired,
	session: PropTypes.object.isRequired,
	player: PropTypes.object.isRequired,
	playerStatus: PropTypes.object.isRequired
};