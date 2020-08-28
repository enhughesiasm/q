import React from 'react';

export default class ErrorBoundary extends React.Component {

	constructor(props) {
		super(props);
		this.state = { hasCaughtError: false };
	}

	componentDidCatch(error) {
		console.error(error);
		this.setState({ hasCaughtError: true });
	}

	render() {
		if (this.state.hasCaughtError) {
			return <div>Sorry! Something went wrong. Please try reloading the site.</div>;
		}
		return this.props.children;
	}
}