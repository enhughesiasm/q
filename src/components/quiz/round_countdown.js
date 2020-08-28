import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Giphy from '../shared/giphy';

class RoundCountdown extends Component{
	constructor(props){
		super(props);

		this.state = {
			initialSecondsRemaining: 30
		};
	}

	componentDidMount(){
		this.setState({ initialSecondsRemaining: this.props.secondsRemaining });
	}

	render(){
		return(
			<section className="hero is-light is-medium">
				<div className="hero-body">
					<div className="content has-text-centered">
						<h2 className="subtitle is-size-6-mobile is-spaced">Round { this.props.roundNumber}</h2>
						<h1 className="title is-size-5-mobile is-spaced">&quot;{this.props.roundName}&quot;</h1>
						<h2 className="subtitle is-size-6-mobile is-spaced">will start in</h2>

						<h1 className={(this.props.secondsRemaining <= this.state.initialSecondsRemaining ? 'has-text-primary' : '')+ ' title is-size-5-mobile is-spaced'}>
							{this.props.secondsRemaining}
						</h1>
						<h2 className="subtitle is-size-6-mobile is-spaced">seconds!</h2>
						{ this.props.secondsRemaining <= this.state.initialSecondsRemaining &&
									<progress className="progress is-primary" value={this.state.initialSecondsRemaining-this.props.secondsRemaining} max={this.state.initialSecondsRemaining}></progress>
						}
						<Giphy tag={'excitement'} />
					</div>
				</div>
			</section>
		);
	}
}

RoundCountdown.propTypes = {
	secondsRemaining: PropTypes.number.isRequired,
	roundName: PropTypes.string.isRequired,
	roundNumber: PropTypes.number.isRequired
};

export default RoundCountdown;