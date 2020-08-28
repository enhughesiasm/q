import React from 'react';
import PropTypes from 'prop-types';
import Giphy from '../shared/giphy';
import BounceLoaderWrapper from '../shared/bounce_loader_wrapped';


const TeamAssigned = (props) =>
	<section className="hero is-dark is-medium" style={{background: props.team.colour }}>
		<div className="hero-body">
			<div className="content has-text-centered">
				<h2 className="subtitle is-size-6-mobile is-spaced">Congratulations!</h2>
				<h1 className="title is-size-5-mobile is-spaced">You have been assigned to Team {props.team.name}</h1>
				<h2 className="subtitle is-size-5 is-size-6-mobile is-spaced">joining now</h2>
				<BounceLoaderWrapper color = '#dddddd' />
				<Giphy tag={'celebration'} colour='light' />
			</div>
		</div>
	</section>;

TeamAssigned.propTypes = {
	team: PropTypes.object.isRequired
};

export default TeamAssigned;