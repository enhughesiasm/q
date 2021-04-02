import React from 'react';
import BounceLoaderWrapper from '../shared/bounce_loader_wrapped';

const SessionLoading = () => (
	<div>
		<section className='hero is-light is-medium'>
			<div className='hero-body'>
				<div className='content has-text-centered'>
					<h1 className='title has-text-black is-size-5-mobile'>
						loading...
					</h1>
					<BounceLoaderWrapper />
				</div>
			</div>
		</section>
	</div>
);

export default SessionLoading;
