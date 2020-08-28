import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LiveTag from './live_tag';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class SessionTable extends Component {

	constructor(props){
		super(props);
		this.onDeleteSessionClicked = this.onDeleteSessionClicked.bind(this);
	}

	onDeleteSessionClicked(session){
		confirmAlert({
			title: 'Are you sure?',
			message: 'You want to wipe out ' + session.name + '?',
			buttons: [
				{
					label: 'Yes!',
					onClick: () => this.props.handleDeleteSession(session.id)
				},
				{
					label: 'No',
					onClick: null
				}
			]
		});
	}


	render(){
		return(
			<table className="table">
				<thead>
					<tr>
						<th>-</th>
						<th>ID</th>
						<th>Name</th>
						<th>Live?</th>
						<th>Players (Connected)</th>
						<th style={{color: 'orange'}}>Orange</th>
						<th style={{color: 'purple'}}>Purple</th>
						<th style={{color: 'grey'}}>None</th>
						<th>Rounds (Completed)</th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.sessions.map((session,i) =>
							<tr key={i}>
								<td><a onClick={() => this.onDeleteSessionClicked(session)}>
									<FontAwesomeIcon icon={faTrash} style={{color: 'black'}}/>
								</a></td>
								<td><a onClick={() => this.props.handleSelectSession(session.id)}>{session.id}</a></td>
								<td><a onClick={() => this.props.handleSelectSession(session.id)}>{session.name}</a></td>
								<td>
									<button className="button is-info" onClick={() => this.props.handleFlipSessionLive(session.id)}>Flip</button>
									<LiveTag isLive={session.isLive} />
								</td>
								<td>
									{ session.players.length } ({ session.players.filter(n => n.isConnected).length })
								</td>

								{/* TODO: yup, this is dumb, but I am currently guaranteeing team_ids to be either 1, 2 or null and I'm in a real hurry here! -->
									if I decide to implement more than these two teams this will need to be more clever, iterating over a list of teams, or similar */}
								<td style={{color:'orange'}}>
									{ session.players.filter(function(p){return p.teamId == 1;}).length }
								</td>
								<td style={{color:'purple'}}>
									{ session.players.filter(function(p){return p.teamId == 2;}).length }
								</td>
								<td style={{color:'grey'}}>
									{ session.players.filter(function(p){return p.teamId == null;}).length }
								</td>
								<td>
									{ session.roundInstances.length } ({ session.roundInstances.filter(ri => ri != null && ri.endTime != null && moment(ri.endTime).isBefore(moment())).length })
								</td>
							</tr>
						)}
				</tbody>
			</table>);
	}
}

SessionTable.propTypes = {
	sessions: PropTypes.array.isRequired,
	handleSelectSession: PropTypes.func.isRequired,
	handleDeleteSession: PropTypes.func.isRequired,
	handleFlipSessionLive: PropTypes.func.isRequired
};