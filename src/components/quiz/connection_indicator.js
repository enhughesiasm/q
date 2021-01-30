import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const ConnectionIndicator = ({ connected }) => (
	<div
		className='has-text-centered'
		style={{ position: 'absolute', bottom: '.5rem', right: '.5rem' }}>
		<FontAwesomeIcon
			icon={connected ? faCircle : faCircleNotch}
			style={{
				color: connected ? 'green' : 'red',
			}}
		/>
	</div>
);

export default ConnectionIndicator;
