import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhaustedRound from './exhausted';
import RoundBanner from './round_banner';
import AnsweredQuestion from './answered_question';
import UnansweredQuestion from './unanswered_question';
import LiveScore from './live_score';
import EndOfRoundCountdown from './end_of_round_countdown';
import LoadingQuestion from './loading_question';


class LiveRound extends Component {

	constructor(props){
		super(props);

		this.onClickAnswer = this.onClickAnswer.bind(this);
		this.pullQuestion = this.pullQuestion.bind(this);

		this.state = { answerClicked: false, clickedIndex: -1 };
	}

	componentDidMount(){
		this.pullQuestion();
	}

	pullQuestion(){
		this.setState({answerClicked: false, clickedIndex: -1});
		this.props.round.pullNextQuestion(this.props.round);
	}

	onClickAnswer(clickedIndex){
		this.setState({answerClicked: true, clickedIndex: clickedIndex});
		this.props.round.submitAnswer(this.props.round, clickedIndex);
	}

	render() {

		let question = this.props.round.playerQuestion;
		let answered = false;
		let exhausted = this.props.round.exhausted;

		if(question){
			answered = (question.answerReceived != null);
		}


		return (
			<div className="live-round">
				<RoundBanner round={this.props.round} team={this.props.player.team} />
				<LiveScore playerStatus={this.props.playerStatus} roundInstanceId={this.props.round.id}/>
				{ exhausted && <ExhaustedRound roundInstanceId={this.props.round.id} endTime={this.props.round.endTime} playerStatus={this.props.playerStatus} />}
				{ !exhausted &&
				<div>
					{ !question && <LoadingQuestion />	}
					{ question && !answered &&
						<UnansweredQuestion question={question} clickedIndex={this.state.clickedIndex} onClickAnswer={this.onClickAnswer} answerClicked={this.state.answerClicked} />
					}
					{ question && answered &&
						<AnsweredQuestion question={question} clickedIndex={this.state.clickedIndex} onClickNextQuestion={this.pullQuestion} />
					}
				</div>
				}
				<EndOfRoundCountdown endTime={this.props.round.endTime}/>
			</div>
		);
	}
}

LiveRound.propTypes = {
	round: PropTypes.object.isRequired,
	player: PropTypes.object.isRequired,
	session: PropTypes.object.isRequired,
	playerStatus: PropTypes.object.isRequired
};

export default LiveRound;