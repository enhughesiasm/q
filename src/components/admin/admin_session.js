import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LiveTag from './live_tag';
import Moment from 'react-moment';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PlayerTable from './player_table';


class SessionAdmin extends Component {
	constructor(props){
		super(props);

		this.state = {selectedRoundLength: 30,
			selectedRoundDelay: 5,
			selectedWrongAnswerFactor: -1,
			inputPointsPerQuestion: 10,
			isLoadingPreviousRounds: false,
			selectedPlatonicRoundIds: []};


		this.handleRoundLengthChange = this.handleRoundLengthChange.bind(this);
		this.handleRoundDelayChange = this.handleRoundDelayChange.bind(this);
		this.handlePointsPerQuestionChange = this.handlePointsPerQuestionChange.bind(this);
		this.handleWrongAnswerFactorChange = this.handleWrongAnswerFactorChange.bind(this);

		this.onSubmitNewRound = this.onSubmitNewRound.bind(this);
		this.onClickStartRound = this.onClickStartRound.bind(this);
		this.newRoundIsValid = this.newRoundIsValid.bind(this);
		this.platonicRoundLabelClicked = this.platonicRoundLabelClicked.bind(this);
	}

	componentDidMount(){
		this.timerID = setInterval(() => this.tick(), 2500);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	tick(){
		this.forceUpdate();
	}

	newRoundIsValid(){
		return Number.isInteger(this.state.inputPointsPerQuestion) &&
				this.state.selectedPlatonicRoundIds.length > 0  &&
				!Number.isNaN(this.state.selectedRoundLength) && this.state.selectedRoundLength > 0 && this.state.selectedRoundLength < 60;
	}

	onClickStartRound(){

		if(this.newRoundIsValid()){

			var roundName = '';

			this.state.selectedPlatonicRoundIds.forEach(prid => {
				roundName += this.props.platonicRounds.filter(n => n.id == prid)[0].name + ' / ';
			});

			confirmAlert({
				title: 'Are you sure?',
				message: 'You want to start a round of ' + roundName.toString().toUpperCase() + ' for ' + this.state.selectedRoundLength + ' minutes, ' + ' starting in ' + this.state.selectedRoundDelay + ' seconds?',
				buttons: [
					{
						label: 'Yes!',
						onClick: () => this.onSubmitNewRound()
					},
					{
						label: 'No',
						onClick: null
					}
				]
			});
		}
	}

	platonicRoundLabelClicked(prid){
		let ids =  this.state.selectedPlatonicRoundIds;
		let index = ids.indexOf(prid);
		if(ids.indexOf(prid) >= 0){
			ids.splice(index, 1);
		}else{
			ids.push(prid);
		}
		this.setState({ selectedPlatonicRoundIds: ids });
	}


	handleRoundLengthChange(e){

		this.setState({ selectedRoundLength: parseFloat(e.target.value) });
	}

	handleRoundDelayChange(e){
		this.setState({ selectedRoundDelay: parseInt(e.target.value) });
	}

	handleWrongAnswerFactorChange(e){
		this.setState({ selectedWrongAnswerFactor: parseInt(e.target.value)});
	}

	handlePointsPerQuestionChange(e){
		try{
			let v = parseInt(e.target.value);
			this.setState({ inputPointsPerQuestion: v });
		}catch(ex){
			// do literally nothing, only I will ever use this page
		}
	}

	onSubmitNewRound(){

		let now = moment();
		let startTime = now.add(this.state.selectedRoundDelay, 's');
		startTime.add(5, 's');
		let startTimeFormatted = startTime.utc().format();
		let endTime = startTime.add(this.state.selectedRoundLength, 'm');
		let endTimeFormatted = endTime.utc().format();

		var newRoundInstance = {
			startTime: startTimeFormatted,
			endTime: endTimeFormatted,
			platonicRoundIds: this.state.selectedPlatonicRoundIds,
			sessionId: this.props.session.id,
			pointsPerQuestion: this.state.inputPointsPerQuestion,
			wrongAnswerFactor: this.state.selectedWrongAnswerFactor
		};

		this.props.handleSubmitNewRound(newRoundInstance);
	}


	isLive(startTime, endTime){
		const now = moment();
		return now.isAfter(startTime) && now.isBefore(endTime);
	}

	render() {

		return (
			<div>
				<div className="notification">
					<a onClick={()=> this.props.handleSelectSession(null)}>Go Back</a>
				</div>
				<div className="box">
					<h2 className="subtitle" style={{display:'inline-block'}}>Session { this.props.session.id } : {this.props.session.name}</h2>
					<LiveTag isLive={this.props.session.isLive} />
					<button className="button is-info" onClick={() => this.props.handleFlipSessionLive(this.props.session.id)}>Flip</button>
				</div>
				<div className="box">
					<PlayerTable handleDeletePlayer={this.props.handleDeletePlayer} handleFlipTeam={this.props.handleFlipTeam} players={this.props.session.players} teams={this.props.teams} />
				</div>
				<div className="box">
					<h2 className="subtitle">Previous Rounds</h2>
					<table className="table">
						<thead>
							<tr>
								<th>-</th>
								<th>Number</th>
								<th>Name</th>
								<th>PPQ</th>
								<th>Start</th>
								<th>End</th>
								<th>Questions Asked</th>
								<th>Questions Answered</th>
								<th>Correct Answers</th>
								<th>Correct Percentage</th>
							</tr>
						</thead>
						<tbody>
							{ this.props.session.roundInstances && this.props.session.roundInstances.length > 0 && this.props.session.roundInstances.map((round, i) =>
								<tr key={i} className={ (this.isLive(round.startTime, round.endTime) ? 'has-background-success' : 'has-background-warning')} >
									<td><a onClick={() => this.props.handleDeleteRoundInstance(round.id)}>
										<FontAwesomeIcon icon={faTrash} style={{color: 'black'}}/>
									</a></td>
									<td className="has-text-centered">{i + 1}</td>
									<td>{ round.platonicRounds.map(pr => pr.name).join('/') }</td>
									<td>{round.pointsPerQuestion}</td>
									<td><Moment format="HH:mm:ss">{round.startTime}</Moment></td>
									<td><Moment format="HH:mm:ss">{round.endTime}</Moment></td>
									<td className="has-text-centered"> {round.questionsAsked ? round.questionsAsked : '0'} </td>
									<td className="has-text-centered"> {round.questionsAnswered ? round.questionsAnswered : '0'} </td>
									<td className="has-text-centered"> {round.correctAnswers ? round.correctAnswers : '0'} </td>
									<td className="has-text-centered"> {round.questionsAnswered && round.correctAnswers ? Math.round(100 * (round.correctAnswers / round.questionsAnswered)) + '%' : 'N/A'} </td>
								</tr>
							) }
						</tbody>
					</table>
				</div>
				<div className="box">
					<h3 className="has-text-bold is-size-4">Create New Round: </h3>
					<table className="table">
						<tbody>
							{
								this.props.platonicRounds.map((pr, i) =>
									<tr key={i}>
										<th>
											<label onClick={() => this.platonicRoundLabelClicked(pr.id) } className={'checkbox ' + (pr.parseAsMaths ? 'has-text-info' : '')} htmlFor={'checkbox' + pr.name}>
												<input style={{marginRight: '5px'}} type="checkbox" name={'checkbox' + pr.name} value={pr.id} checked={(this.state.selectedPlatonicRoundIds.indexOf(pr.id) >= 0)} />
												{pr.name}
											</label>
										</th>
									</tr>
								)}
						</tbody>
					</table>
					<table className="table">
						<tbody>
							<tr>
								<th>
									<label htmlFor="roundLength" className="label">Length: </label>
								</th>
								<th><select id="roundLength" value={this.state.selectedRoundLength} onChange={this.handleRoundLengthChange}>
									<option value={0.1}>6 seconds</option>
									<option value={0.25}>15 seconds</option>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={5}>5</option>
									<option value={8}>8</option>
									<option value={10}>10</option>
									<option value={12}>12</option>
									<option value={15}>15</option>
									<option value={15}>20</option>
									<option value={15}>25</option>
									<option value={30}>30</option>
								</select>
								<span style={{marginLeft: '5px'}}>minutes</span>
								</th>
							</tr>
							<tr>
								<th><label htmlFor="roundDelay" className="label">Starting in: </label></th>
								<th><select id="roundDelay" value={this.state.selectedRoundDelay} onChange={this.handleRoundDelayChange}>
									<option value={5}>5</option>
									<option value={10}>10</option>
									<option value={15}>15</option>
									<option value={15}>20</option>
									<option value={30}>30</option>
									<option value={60}>60</option>
									<option value={600}>600</option>
								</select>
								<span style={{marginLeft: '5px'}}>seconds</span>
								</th>
							</tr>
							<tr>
								<th><label htmlFor="wrongAnswerFactor" className="label">Wrong Answer Multiplication Factor </label></th>
								<th><select id="wrongAnswerFactor" value={this.state.selectedWrongAnswerFactor} onChange={this.handleWrongAnswerFactorChange}>
									<option value={0}>0</option>
									<option value={-1}>-1</option>
									<option value={-2}>-2</option>
								</select>
								</th>
							</tr>
							<tr>
								<th>
									<label htmlFor="pointsPerQuestion" className="label">Points Per Question: </label></th>
								<th><input id="pointsPerQuestion" value={this.state.inputPointsPerQuestion} onChange={this.handlePointsPerQuestionChange} />
								</th>
							</tr>
							<tr>
								<th>
									<button
										type="submit"
										className={ (this.newRoundIsValid() ? 'is-success' : 'is danger') + ' button' }
										disabled={ (!this.newRoundIsValid()) }
										onClick={ this.onClickStartRound }>
							Start!
									</button>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

SessionAdmin.propTypes = {
	session: PropTypes.object.isRequired,
	teams: PropTypes.array.isRequired,
	handleSelectSession: PropTypes.func.isRequired,
	handleFlipTeam: PropTypes.func.isRequired,
	handleFlipSessionLive: PropTypes.func.isRequired,
	handleSubmitNewRound: PropTypes.func.isRequired,
	handleDeleteRoundInstance: PropTypes.func.isRequired,
	handleDeletePlayer: PropTypes.func.isRequired,
	platonicRounds: PropTypes.array.isRequired
};

export default SessionAdmin;