import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SessionTable from './admin_session_table';
import SessionAdmin from './admin_session';

class SessionList extends Component {
	constructor(props){
		super(props);

	}


	render() {

		return (
			<div>
				{ (!this.props.selectedSessionId) &&
					<SessionTable sessions={this.props.sessions} handleDeleteSession={this.props.handleDeleteSession} handleFlipSessionLive={this.props.handleFlipSessionLive} handleSelectSession={this.props.handleSelectSession} />
				}
				{ (this.props.selectedSessionId) &&
					<SessionAdmin
						session={this.props.sessions.filter(n => n.id == this.props.selectedSessionId)[0]}
						platonicRounds = {this.props.platonicRounds}
						teams={this.props.teams}
						handleFlipTeam={this.props.handleFlipTeam}
						handleSelectSession={this.props.handleSelectSession}
						handleFlipSessionLive={this.props.handleFlipSessionLive}
						handleSubmitNewRound={this.props.handleSubmitNewRound}
						handleDeleteRoundInstance={this.props.handleDeleteRoundInstance}
						handleDeletePlayer={this.props.handleDeletePlayer}
					/>
				}
			</div>
		);
	}
}

export default SessionList;

SessionList.propTypes = {
	sessions: PropTypes.array.isRequired,
	teams: PropTypes.array.isRequired,
	selectedSessionId: PropTypes.number,
	handleSelectSession: PropTypes.func.isRequired,
	handleFlipSessionLive: PropTypes.func.isRequired,
	handleFlipTeam: PropTypes.func.isRequired,
	handleSubmitNewRound: PropTypes.func.isRequired,
	handleDeleteRoundInstance: PropTypes.func.isRequired,
	handleDeletePlayer: PropTypes.func.isRequired,
	handleDeleteSession: PropTypes.func.isRequired,
	platonicRounds: PropTypes.array.isRequired
};