import React, { Component } from 'react';
import moment from 'moment';
import { FlexibleHeightXYPlot } from 'react-vis';

export default class FadeUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showUntil: null,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.showUntil != prevState.showUntil) {
			let now = moment();

			return {
				beginTime: now,
				duration: nextProps.showUntil.diff(now),
				showUntil: nextProps.showUntil,
			};
		} else {
			return null;
		}
	}

	render() {
		let now = moment();
		let opacity = 0;
		let fractionThrough = 0;

		if (this.state.beginTime && this.state.duration) {
			let progress = now.diff(this.state.beginTime);
			fractionThrough = progress / this.state.duration;
			opacity = 1 - fractionThrough;
		}
		// let show = now.isBefore(this.state.showUntil);
		return (
			<span>
				<span
					className={
						'content is-overlay has-text-centered is-size-4 has-text-weight-bold ' +
						(this.props.success
							? 'has-background-success'
							: 'has-background-danger')
					}
					style={{
						transition: `opacity .7s ease-in-out`,
						opacity: opacity,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<span className=''>
						<span className='is-size-2'>{this.props.content}</span>
					</span>
				</span>
			</span>
		);
	}
}
