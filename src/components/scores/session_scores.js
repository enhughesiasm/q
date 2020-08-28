import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries } from 'react-vis';
import windowDimensions from 'react-window-dimensions';

class SessionScores extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}

	roundUp(x){
		var negative = false;

		if(x < 0) {
			negative = true;
			x *= -1;
		}
		var y = Math.pow(10, x.toString().length-1); x = (x/y);
		x = Math.ceil(x);
		x = x*y;
		if(negative) x *= -1;
		return x;
	}

	render() {

		let width = Math.max(this.props.width- 500, 300);
		let height = Math.max(this.props.height - 300, 300);

		let data = [];
		let maxScore = 0;
		let minScore = 0;

		if(this.props.teamScores && this.props.teamScores.length > 0)
		{
			data = this.props.teamScores.map((ts,i) =>
			{
				return {
					x: 'Team ' + ts.name,
					y: ts.totalScore,
					color: ts.colour,
					label: ts.totalScore,
					yOffset: 0,
					style: { fontSize: '2.8rem', fontWeight: 'bold', fill:'white', stroke: 'black', strokeWidth: '2px'}};
			});

			maxScore =  Math.max(...this.props.teamScores.map(o => o.totalScore), 0);
			minScore = this.props.teamScores.reduce((min, p) => p.totalScore < min ? p.totalScore : min, 0);
		}

		let yMax = this.roundUp(maxScore);

		console.log(maxScore + '; ' + yMax);

		let yDomain = [minScore, yMax];

		return (
			<div style={{width: width + 100, margin:'auto'}}>
				<a onClick={() => this.props.selectSession(null)}>Back</a>
				<FlexibleXYPlot animation height={height} width={width} xType="ordinal" yDomain={yDomain} style={{overflow:'visible'}}>
					<VerticalBarSeries animation data={data} colorType='literal' />
					<LabelSeries
						animation
						allowOffsetToBeReversed
						data={data} style={{color:'white !important'}} />
					<XAxis animation style={{ fontSize: '2rem', fontWeight: 'bold'}}/>
					<YAxis animation style={{ fontSize: '1.5rem', fontWeight: 'bold'}} />
				</FlexibleXYPlot>

			</div>
		);
	}
}

export default windowDimensions()(SessionScores);