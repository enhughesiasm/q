import React from 'react';
import BounceLoaderWrapper from '../../shared/bounce_loader_wrapped';

const LoadingQuestion = () => (
	<div className='notification is-light'>
		<div className='content has-text-centered py-6'>
			<h2 className='subtitle is-size-6-mobile'>
				thinking of question...
			</h2>
			<BounceLoaderWrapper />
		</div>
	</div>
);

export default LoadingQuestion;
