import React from 'react';
import Giphy from '../shared/giphy';
import BounceLoaderWrapper from '../shared/bounce_loader_wrapped';

const AssigningTeam = () =>
	<section className="hero is-light is-medium">
		<div className="hero-body">
			<div className="content has-text-centered">
				<h2 className="subtitle has-text-grey is-size-6-mobile  is-spaced">new player detected</h2>
				<h1 className="title has-text-grey-dark is-size-5-mobile  is-spaced">analysing your personality</h1>
				<progress className="progress is-primary" value={Math.random() * 10} max={10}></progress>
				<BounceLoaderWrapper color="#dddddd" />
				<Giphy tag={'thinking'} />
			</div>
		</div>
	</section>;

export default AssigningTeam;