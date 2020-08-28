import React from 'react';
import PropTypes from 'prop-types';
import BounceLoaderWrapper from '../shared/bounce_loader_wrapped';
import Giphy from '../shared/giphy';
import WelcomeBanner from './welcome_banner';

const WaitingForSession = (props) =>
	<div>
		<WelcomeBanner team={props.team} playerName={props.playerName}/>
		<div className="notification is-light">
			<div className="content has-text-centered">
				<h1 className="subtitle is-size-5-mobile">This is <span className="has-text-success has-text-weight-bold">{props.sessionName}</span></h1>
				<h2 className="subtitle has-text-primary is-size-6-mobile">The session isn&apos;t yet live, but it should be soon.</h2>
				<h2 className="subtitle is-size-4 is-size-6-mobile">Hang on till then.</h2>
				<BounceLoaderWrapper />
				<Giphy tag="bored"/>
			</div>
		</div>
	</div>
;

WaitingForSession.propTypes = {
	playerName: PropTypes.string.isRequired,
	sessionName: PropTypes.string.isRequired,
	team: PropTypes.object.isRequired
};

export default WaitingForSession;