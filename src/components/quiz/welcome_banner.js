import React from 'react';
import TeamBanner from './team_banner';
import PropTypes from 'prop-types';

const WelcomeBanner = (props) => (
	<div className="notification is-light has-text-centered">
		<h1 className="title is-size-5-mobile">Welcome, {props.playerName}.</h1>
		<TeamBanner team={props.team} />
	</div>
);

WelcomeBanner.propTypes = {
	playerName: PropTypes.string.isRequired,
	team: PropTypes.object.isRequired
};

export default WelcomeBanner;