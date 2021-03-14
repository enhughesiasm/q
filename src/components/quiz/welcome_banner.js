import React from 'react';

import PropTypes from 'prop-types';

const WelcomeBanner = (props) => (
	<div
		className='notification tile is-parent is-vertical is-light mx-4 has-text-centered is-flex has-text-white'
		style={{ alignItems: 'center', background: props.team.colour }}>
		<div className='tile is-child'>
			<p className='title is-size-5-mobile'>
				Welcome, {props.playerName}
			</p>
		</div>
		<div className='tile is-child'>
			<p className='has-text-black tag is-size-5 is-size-6-mobile'>
				Valued member of{' '}
				<span style={{ color: props.team.colour }}>
					&nbsp;Team {props.team.name}
				</span>
			</p>
		</div>
	</div>
);

WelcomeBanner.propTypes = {
	playerName: PropTypes.string.isRequired,
	team: PropTypes.object.isRequired,
};

export default WelcomeBanner;
