import React from 'react';
import PropTypes from 'prop-types';


const PlayerTeam = (props) => {
	let teamName = 'None';
	let colour = '#ddd';

	if(props.teamId){
		let team = props.teams.find(t => t.id == props.teamId);
		if(team){
			teamName = team.name;
			colour = team.colour;
		}
	}

	return(
		<span style={{color: colour}}>{teamName}</span>
	);};

PlayerTeam.propTypes = {
	teams: PropTypes.array.isRequired,
	teamId: PropTypes.number
};

export default PlayerTeam;