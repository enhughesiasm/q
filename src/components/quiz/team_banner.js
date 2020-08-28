import React from 'react';
import PropTypes from 'prop-types';

const TeamBanner = (props) => (
	<section className="hero is-dark is-paddingless" style={{background: props.team.colour}}>
		<div className="hero-body has-text-centered" style={{paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
			<h2 className="subtitle is-size-6-mobile">
					Valued member of Team {props.team.name}
			</h2>
		</div>
	</section>
);

TeamBanner.propTypes = {
	team: PropTypes.object.isRequired
};

export default TeamBanner;