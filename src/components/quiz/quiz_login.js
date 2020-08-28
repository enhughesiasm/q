import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Session from './session';
import SessionForm from './session_form';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

class QuizLogin extends Component {
	constructor(props) {
		super(props);

		let sessionForm = {
			playerName: '',
			sessionName: '',
			previousSubmission: '',
			isSubmitting: false,
			hasSubmitted: false,
			isValid: false,
			isSessionNameValid: false,
			isPlayerNameValid: false,
		};

		if (config.isDev) {
			sessionForm = {
				playerName: 'Neil',
				sessionName: 'Biscuit',
				previousSubmission: '',
				isValid: true,
				isSessionNameValid: true,
				isPlayerNameValid: true,
			};
		}

		let socketAddress =
			config.socket.protocol +
			'://' +
			config.socket.address +
			':' +
			config.socket.port;

		const socket = socketIOClient(socketAddress);

		socket.on(
			'connect',
			(() => {
				// happens on first connection, and on subsequent reconnections
				// so each time we want to register for events
				// (this will join or rejoin the server-side session room, if we have one)
				socket.emit(
					'quiz connection',
					this.state.session,
					this.state.player
				);
			}).bind(this)
		);

		// then register for client events:
		socket.on(
			'receive round instances',
			((instances) => {
				this.setServerRoundInstances(instances);
				this.getPlayerStatus();
			}).bind(this)
		);

		socket.on(
			'receive question',
			((playerQuestion) => {
				this.receiveQuestion(playerQuestion);
			}).bind(this)
		);

		socket.on(
			'session flipped',
			((session) => {
				if (session && this.state.session) {
					this.setState({ session: session });
				}
			}).bind(this)
		);

		socket.on(
			'session ended',
			(() => {
				this.reinitialiseState();
			}).bind(this)
		);

		socket.on(
			'player deleted',
			(() => {
				this.reinitialiseState();
			}).bind(this)
		);

		socket.on(
			'receive player status',
			((status) => {
				this.receivePlayerStatus(status);
			}).bind(this)
		);

		socket.on(
			'receive team assignment',
			((playerId, team) => {
				this.receiveTeamAssignment(playerId, team);
			}).bind(this)
		);

		socket.on(
			'receive new team',
			((team) => {
				this.receiveTeamReassignment(team);
			}).bind(this)
		);

		socket.on(
			'no more questions',
			((roundInstanceId) => {
				let ids = this.state.exhaustedRoundInstanceIds;
				ids.push(roundInstanceId);
				this.setState({ exhaustedRoundInstanceIds: ids });
			}).bind(this)
		);

		socket.on(
			'disconnect',
			(() => {
				this.forceUpdate();
			}).bind(this)
		);

		let rounds = {
			isLoading: false,
			serverRoundInstances: [],
			allRoundInstances: [],
			nextRoundIndexes: [],
		};

		this.state = {
			initial: {
				serverLoad: false,
				updateAfterServerLoad: false,
				statusAfterPlayerLoad: false,
			},
			session: null,
			player: null,
			showTeamAssignedScreenUntil: null,
			sessionForm: sessionForm,
			socket: socket,
			rounds: rounds,
			nextPlayerQuestion: null,
			answerResponse: null,
			exhaustedRoundInstanceIds: [],
			playerStatus: {
				questionsAnswered: 0,
				score: 0,
				correctAnswers: 0,
			},
			statusUpdateCounter: 0,
		};

		this.handleSessionFormSubmit = this.handleSessionFormSubmit.bind(this);
		this.handleSessionFormChange = this.handleSessionFormChange.bind(this);
		this.isSessionFormValid = this.isSessionFormValid.bind(this);
		this.isPlayerNameValid = this.isPlayerNameValid.bind(this);
		this.isSessionNameValid = this.isSessionNameValid.bind(this);

		this.loadRoundInstances = this.loadRoundInstances.bind(this);
		this.updateRoundInstances = this.updateRoundInstances.bind(this);
		this.setServerRoundInstances = this.setServerRoundInstances.bind(this);

		this.getCurrentRoundScore = this.getCurrentRoundScore.bind(this);

		this.reinitialiseState = this.reinitialiseState.bind(this);

		this.pullNextQuestion = this.pullNextQuestion.bind(this);
		this.receiveQuestion = this.receiveQuestion.bind(this);
		this.submitAnswer = this.submitAnswer.bind(this);
		this.receiveAnswerResponse = this.receiveAnswerResponse.bind(this);
	}

	reinitialiseState() {
		let rounds = {
			isLoading: false,
			serverRoundInstances: [],
			allRoundInstances: [],
			nextRoundIndexes: [],
		};

		this.setState(function () {
			return {
				rounds: rounds,
				initial: {
					serverLoad: false,
					updateAfterServerLoad: false,
					statusAfterPlayerLoad: false,
				},
				session: null,
				player: null,
				showTeamAssignedScreenUntil: null,
				nextPlayerQuestion: null,
				answerResponse: null,
				exhaustedRoundInstanceIds: [],
				playerStatus: {
					questionsAnswered: 0,
					score: 0,
					correctAnswers: 0,
				},
				statusUpdateCounter: 0,
			};
		});
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 900);
		this.loadRoundInstances();
		this.getPlayerStatus();
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		// this checks if the server instances have changed
		// and also updates the rounds with 'time left' etc, so the round starts/ends in time
		this.updateRoundInstances(this.state.rounds.serverRoundInstances);

		let counter = this.state.statusUpdateCounter;

		if (
			counter > 15 ||
			(!this.state.initial.statusAfterPlayerLoad && this.state.player)
		) {
			// check the player status every now and then
			this.getPlayerStatus();

			// update round instances every now and then in case we weren't online when the change notification fired
			this.loadRoundInstances();
			counter = 0;
		}

		counter++;
		this.setState({ statusUpdateCounter: counter });
	}

	isRoundLive(round) {
		var now = moment();
		var startTime = moment(round.startTime);
		var endTime = moment(round.endTime);
		return startTime.isBefore(now) && now.isBefore(endTime);
	}

	getSecondsRemainingBeforeRoundStart(round) {
		var now = moment();
		var start = moment(round.startTime);
		return start.diff(now, 'seconds');
	}

	getPlayerStatus() {
		if (this.state.session && this.state.player) {
			this.state.socket.emit(
				'pull player status',
				this.state.session.id,
				this.state.player.id
			);
		}
	}

	receivePlayerStatus(status) {
		let initial = this.state.initial;
		initial.statusAfterPlayerLoad = true;

		this.setState({
			playerStatus: status,
			initial: initial,
		});
	}

	loadRoundInstances(sessionId) {
		if (
			!sessionId &&
			this.state.session &&
			this.state.session.id &&
			Number.isInteger(this.state.session.id)
		) {
			sessionId = this.state.session.id;
		}

		if (!sessionId) {
			return;
		}

		let rounds = this.state.rounds;
		rounds.isLoading = true;
		this.setState({ rounds: rounds });
		this.state.socket.emit('pull round instances', sessionId);
	}

	setServerRoundInstances(instances) {
		instances.sort(function (i1, i2) {
			let s1 = moment(i1.startTime);
			let s2 = moment(i2.startTime);
			return s1.isBefore(s2) ? -1 : s1.isAfter(s2) ? 1 : 0;
		});

		let rounds = this.state.rounds;
		rounds.serverRoundInstances = instances;

		let initial = this.state.initial;
		initial.serverLoad = true;

		this.setState(function () {
			return {
				rounds: rounds,
				initial: initial,
			};
		});
	}

	pullNextQuestion(round) {
		if (round && round.id) {
			let rounds = this.state.rounds;
			rounds.allRoundInstances.forEach((r) => {
				r.playerQuestion = null;
			});

			this.setState(function () {
				return {
					rounds: rounds,
					nextPlayerQuestion: null,
					answerResponse: null,
				};
			});

			this.state.socket.emit(
				'pull question',
				round.id,
				round.platonicRoundIds,
				this.state.player.id
			);
		}
	}

	receiveQuestion(playerQuestion) {
		if (playerQuestion && playerQuestion.roundInstanceId) {
			this.setState({ nextPlayerQuestion: playerQuestion });
		}
	}

	submitAnswer(round, answerIndex) {
		if (round && round.id && Number.isInteger(answerIndex)) {
			this.state.socket.emit(
				'answer question',
				round.playerQuestion.id,
				answerIndex,
				this.state.player.id,
				(response) => this.receiveAnswerResponse(response)
			);
		} else {
			alert('yikes! unable to submit answer: ' + answerIndex);
		}
	}

	getCurrentRoundScore(roundInstanceId) {
		let score = 0;
		let status = this.state.playerStatus;
		if (
			status &&
			status.scoresByRoundInstanceId &&
			status.scoresByRoundInstanceId.length > 0
		) {
			let scoreByRoundId = this.state.playerStatus.scoresByRoundInstanceId.filter(
				(a) => a[0] == roundInstanceId
			);
			if (
				scoreByRoundId &&
				scoreByRoundId.length > 0 &&
				scoreByRoundId[0][1]
			) {
				score = parseInt(scoreByRoundId[0][1]);
			}
		}

		return score;
	}

	receiveAnswerResponse(response) {
		this.getPlayerStatus();
		this.setState({ answerResponse: response });
	}

	formatRoundNames(names) {
		if (!names) return '';

		var outStr = '';
		if (names.length === 1) {
			outStr = names[0];
		} else if (names.length === 2) {
			outStr = names.join(' & ');
		} else if (names.length > 2) {
			outStr = names.slice(0, -1).join(', ') + ', & ' + names.slice(-1);
		}
		return outStr;
	}

	updateRoundInstances(instances) {
		// TODO: major refactoring, this SUCKS!
		instances = instances || [];

		let allInstances = [...instances];

		let nextRoundIndexes = [];

		let now = moment();

		allInstances.forEach(
			((instance, i) => {
				instance.secondsRemaining = this.getSecondsRemainingBeforeRoundStart(
					instance
				);
				instance.isLive = this.isRoundLive(instance);
				instance.pullNextQuestion = this.pullNextQuestion;
				instance.submitAnswer = this.submitAnswer;

				instance.name = this.formatRoundNames(
					instance.platonicRoundNames
				);

				instance.exhausted = false;
				if (
					this.state.exhaustedRoundInstanceIds.indexOf(instance.id) >=
					0
				) {
					instance.exhausted = true;
				}

				instance.justFinished = false;
				let endTime = moment(instance.endTime);
				instance.millisecondsSinceRoundEnd = moment().diff(endTime);

				if (
					instance.millisecondsSinceRoundEnd > 0 &&
					instance.millisecondsSinceRoundEnd <
						config.quiz.showRoundFinishedScreenForMilliseconds
				) {
					instance.justFinished = true;
				}

				if (now.isBefore(endTime)) {
					nextRoundIndexes.push(i);
				}

				if (this.state.nextPlayerQuestion) {
					// we've loaded a question, now add it to the relevant round
					if (
						instance.id ==
						this.state.nextPlayerQuestion.roundInstanceId
					) {
						instance.playerQuestion = this.state.nextPlayerQuestion;

						if (
							this.state.answerResponse &&
							this.state.answerResponse.roundInstanceId ==
								instance.id
						) {
							instance.playerQuestion.answerReceived = true;
							instance.playerQuestion.submittedIndex = this.state.answerResponse.submittedIndex;
							instance.playerQuestion.correctIndex = this.state.answerResponse.correctIndex;
							instance.playerQuestion.pointsEarned = this.state.answerResponse.pointsEarned;
						}
					}
				} else {
					instance.playerQuestion = null;
				}
			}).bind(this)
		);

		let rounds = this.state.rounds;
		rounds.allRoundInstances = allInstances;
		rounds.nextRoundIndexes = nextRoundIndexes;
		rounds.isLoading = false;

		let initial = this.state.initial;

		if (initial.serverLoad) {
			initial.updateAfterServerLoad = true;
		}

		this.setState(function () {
			return {
				rounds: rounds,
				initial: initial,
			};
		});
	}

	receiveTeamReassignment(newTeam) {
		if (newTeam) {
			let player = this.state.player;
			player.team = newTeam;
			this.setState(function () {
				return {
					player: player,
				};
			});
		}
	}

	receiveTeamAssignment(playerId, team) {
		let player = this.state.player;
		player.team = team;
		let showScreenUntil = moment().add(
			config.quiz.showTeamAssignedScreenForSeconds,
			's'
		);
		this.setState(function () {
			return {
				player: player,
				showTeamAssignedScreenUntil: showScreenUntil,
			};
		});
	}

	handleSessionFormSubmit() {
		this.setState({
			sessionForm: { ...this.state.sessionForm, isSubmitting: true },
		});
		const playerName = this.state.sessionForm.playerName;
		const sessionName = this.state.sessionForm.sessionName;
		if (this.isSessionFormValid(playerName, sessionName)) {
			var submission = JSON.stringify({
				playerName: playerName,
				sessionName: sessionName,
			});
			this.state.socket.emit('join session', submission, (result) => {
				if (result.session && result.session.id) {
					this.loadRoundInstances(result.session.id);

					if (!result.player.team) {
						// not yet team assigned, request team assignment in a few seconds
						setTimeout(() => {
							this.state.socket.emit(
								'assign team',
								result.player.id
							);
						}, config.quiz.assignTeamForMilliseconds); // 7500);
					}
				}

				this.setState({
					session: result.session,
					player: result.player,
					sessionForm: {
						...this.state.sessionForm,
						isSubmitting: false,
						hasSubmitted: true,
						previousSubmission: sessionName,
					},
				});
			});
		}
	}

	handleSessionFormChange(playerName, sessionName) {
		this.setState({
			sessionForm: {
				playerName: playerName,
				sessionName: sessionName,
				isPlayerNameValid: this.isPlayerNameValid(playerName),
				isSessionNameValid: this.isSessionNameValid(sessionName),
				isValid: this.isSessionFormValid(playerName, sessionName),
			},
		});
	}

	isSessionNameValid(sessionName) {
		return sessionName && sessionName.length >= 5;
	}

	isPlayerNameValid(playerName) {
		return playerName && playerName.length >= 3;
	}

	isSessionFormValid(playerName, sessionName) {
		return (
			this.isSessionNameValid(sessionName) &&
			this.isPlayerNameValid(playerName)
		);
	}

	render() {
		return (
			<section className='section is-paddingless'>
				{this.state.session && (
					<Session
						showTeamAssignedScreenUntil={
							this.state.showTeamAssignedScreenUntil
						}
						initialLoadComplete={
							this.state.initial.updateAfterServerLoad &&
							this.state.initial.statusAfterPlayerLoad
						}
						session={this.state.session}
						player={this.state.player}
						rounds={this.state.rounds}
						playerStatus={this.state.playerStatus}
					/>
				)}
				{!this.state.session && (
					<SessionForm
						sessionForm={this.state.sessionForm}
						handleChange={this.handleSessionFormChange}
						handleSubmit={this.handleSessionFormSubmit}
					/>
				)}
				{this.state.sessionForm.hasSubmitted && !this.state.session && (
					<div className='notification is-warning'>
						Sorry,{' '}
						<strong>
							{this.state.sessionForm.previousSubmission}
						</strong>{' '}
						is not currently a valid session.
					</div>
				)}
				<div className='has-text-centered'>
					<FontAwesomeIcon
						icon={
							this.state.socket.connected
								? faCircle
								: faCircleNotch
						}
						style={{
							color: this.state.socket.connected
								? 'green'
								: 'red',
						}}
					/>
				</div>
			</section>
		);
	}
}

QuizLogin.propTypes = {};

export default QuizLogin;
