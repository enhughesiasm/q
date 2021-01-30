import React from 'react';

import PropTypes from 'prop-types';

const WelcomeBanner = (props) => (
	<div
		className='notification tile is-parent is-vertical is-light mx-4 has-text-centered is-flex'
		style={{ alignItems: 'center' }}>
		<div className='tile is-child'>
			<p className='title is-size-5-mobile'>
				Welcome, {props.playerName}
			</p>
		</div>
		<div className='tile is-child'>
			<p
				className='has-text-white tag is-size-4 is-size-5-mobile'
				style={{ background: props.team.colour }}>
				Valued member of Team {props.team.name}
			</p>
		</div>
	</div>
);

WelcomeBanner.propTypes = {
	playerName: PropTypes.string.isRequired,
	team: PropTypes.object.isRequired,
};

export default WelcomeBanner;
