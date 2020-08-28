import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerTeam from './player_team';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default class PlayerTable extends Component {

	constructor(props){
		super(props);
		this.handleFlipTeam = this.handleFlipTeam.bind(this);
	}

	handleFlipTeam(player){
		confirmAlert({
			title: 'Are you sure?',
			message: 'You want to flip the team for ' + player.name + '?',
			buttons: [
				{
					label: 'Yes!',
					onClick: () => this.props.handleFlipTeam(player)
				},
				{
					label: 'No',
					onClick: null
				}
			]
		});
	}

	onDeletePlayerClicked(player){
		confirmAlert({
			title: 'Are you sure?',
			message: 'You want to ***DELETE*** ' + player.name + '?',
			buttons: [
				{
					label: 'Yes!',
					onClick: () => this.props.handleDeletePlayer(player.id)
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
			<table className="table content has-text-centered is-striped is-narrow is-hoverable">
				<thead>
					<tr>
						<th>-</th>
						<th>Name</th>
						<th>Team</th>
						<th>-</th>
						<th>Questions Asked</th>
						<th>Questions Answered</th>
						<th>Correct Answers</th>
						<th>Correct Percentage</th>
						<th>Total Score</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.players.map((player, i) =>
						<tr key={i}>
							<td><a onClick={() => this.onDeletePlayerClicked(player)}>
								<FontAwesomeIcon icon={faTrash} style={{color: 'black'}}/>
							</a></td>
							<td className={ 'has-text-weight-bold has-text-' + (player.isConnected ? 'success' : 'danger')}>
								{player.name}
							</td>
							<td className='has-text-weight-bold'>
								<PlayerTeam teamId={player.teamId} teams={this.props.teams} />
							</td>
							<td>
								{player.teamId &&
								<button className="button is-info" onClick={() => this.handleFlipTeam(player)}>
									Flip Team
								</button>
								}
							</td>
							<td>
								{player.totalQuestions}
							</td>
							<td>
								{player.answeredQuestions}
							</td>
							<td>
								{player.correctAnswers}
							</td>
							<td>
								{ player.answeredQuestions != 0 ? Math.round(100 * (player.correctAnswers / player.answeredQuestions)) + '%' : 'N/A'}
							</td>
							<td>
								{player.totalScore}
							</td>
						</tr>
					)}
				</tbody>
			</table>);
	}

}

PlayerTable.propTypes = {
	players: PropTypes.array.isRequired,
	teams: PropTypes.array.isRequired,
	handleFlipTeam: PropTypes.func.isRequired,
	handleDeletePlayer: PropTypes.func.isRequired
};