import React from 'react';

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className='footer is-primary is-fixed-bottom'>
			<div className='content has-text-centered'>
				&copy; Neil Hughes 2019
				{currentYear !== 2019 ? '—' + currentYear : ''}
			</div>
		</footer>
	);
};

export default Footer;
