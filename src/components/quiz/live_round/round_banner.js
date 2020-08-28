import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const RoundBanner = (props) => {

	return(
		<section className="notification is-dark is-marginless"  style={{background: props.team.colour}}>
			<h3 className="subtitle has-text-weight-bold is-size-5 is-size-6-mobile" style={{marginBottom:'0.5rem'}}>
						Round { props.round.roundNumber }: &quot;{props.round.name}&quot;
			</h3>
			<h2 className="subtitle is-size-5 is-size-6-mobile">
					Time Remaining: <Moment fromNow ago>{props.round.endTime}</Moment>
			</h2>
		</section>
	);};

RoundBanner.propTypes = {
	round: PropTypes.object.isRequired,
	team: PropTypes.object.isRequired
};

export default RoundBanner;