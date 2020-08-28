import React from 'react';

const TeamStatus = (props) =>
{
	let show = props.teamStatus && props.teamStatus.filter(t => t.teamId != null).length > 0 && props.teams && props.teams.length > 0;

	return(
		<div className="notification is-light">
			{ show && <h2 className="subtitle has-text-info is-size-6-mobile">Meanwhile...</h2>}
			{ show && props.teamStatus && props.teamStatus.filter(t => t.playerCount > 0).map((ts, i) =>
				(ts.teamId == props.playerTeam.id)
					?
					<p key={i} className="has-text-success is-size-4 is-size-6-mobile">
						<span style={{background:props.playerTeam.colour, color:'white', paddingLeft: '5px', marginRight: '5px'}}>Team {props.playerTeam.name} ({ts.playerCount} player{ts.playerCount > 1 ? 's' : ''}): </span>
						<br/><span className='has-text-weight-bold is-size-3 is-size-5-mobile'>{ts.totalScore ? ts.totalScore : 0} points</span>
					</p>
					:
					<p key={i} className="has-text-danger is-size-4 is-size-6-mobile"><span style={{background:props.teams.filter(t => t.id == ts.teamId)[0].colour, color:'white', paddingLeft: '5px', marginRight: '5px'}}>Team { props.teams.filter(t => t.id == ts.teamId)[0].name} ({ts.playerCount} player{ts.playerCount > 1 ? 's' : ''}): </span><br/><span className='has-text-weight-bold is-size-3 is-size-5-mobile'>{ts.totalScore ? ts.totalScore : 0} points</span></p>
			)}

		</div>);
};

export default TeamStatus;