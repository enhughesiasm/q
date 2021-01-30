import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<NavBar />
		</header>
	);
};

const NavBar = () => (
	<nav
		className='navbar is-info is-fixed-top'
		role='navigation'
		aria-label='main navigation'>
		<div className='navbar-brand'>
			<h1 className='is-size-1 has-text-weight-bold has-text-centered px-4'>
				q
			</h1>
		</div>
		<div className='navbar-menu'>
			<div className='navbar-start'>
				{/* <NavLink to="/" className="navbar-item">
				return to interactive login
			</NavLink> */}
			</div>
			<div className='navbar-end'>
				<a className='navbar-item' href='http://www.enhughesiasm.com'>
					return to enhughesiasm
				</a>
			</div>
		</div>
	</nav>
);

export default Header;
