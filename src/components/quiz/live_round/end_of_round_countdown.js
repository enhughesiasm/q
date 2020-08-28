import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const EndOfRoundCountdown = (props) => {
	let countdownMax = 30000;
	let endTime = moment(props.endTime);
	let diffInMs = endTime.diff(moment());
	let showCountdown = false;
	if(diffInMs < countdownMax){
		showCountdown = true;
	}

	return (
		<div>
			{ showCountdown && <div className="notification is-warning" style={{marginTop: '0.8rem'}}>
				<div className="content has-text-centered">
					<h2 className="subtitle is-size-6-mobile">Not long left!</h2>
					<p><progress className="progress is-primary" value={diffInMs} max={countdownMax}></progress></p>
				</div>
			</div>}
		</div>
	);};

EndOfRoundCountdown.propTypes = {
	endTime: PropTypes.string.isRequired
};

export default EndOfRoundCountdown;