import React from 'react';
import Giphy from '../shared/giphy';
import BounceLoaderWrapper from '../shared/bounce_loader_wrapped';

const RoundFinished = () => (
	<section className='hero is-light is-medium'>
		<div className='hero-body'>
			<div className='content has-text-centered'>
				<h1 className='title is-size-5-mobile is-spaced'>
					Round Finished!
				</h1>
				<h2 className='subtitle is-size-6-mobile is-spaced'>
					Let&apos;s see how you did...
				</h2>
				<BounceLoaderWrapper />
				<br />
				<Giphy tag={'clock'} />
			</div>
		</div>
	</section>
);

export default RoundFinished;
