import React, { Component } from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import SessionList from './admin_session_list';
import socketIOClient from 'socket.io-client';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import SuccessIcon from '../shared/success_icon';
import PlatonicRoundsTable from './platonic_rounds_table';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Admin extends Component {
	constructor(props) {
		super(props);

		let socketAddress =
			config.socket.protocol +
			'://' +
			config.socket.address +
			':' +
			config.socket.port;
		const socket = socketIOClient(socketAddress);

		window.addEventListener(
			'focus',
			(() => {
				this.fetchQuiz();
			}).bind(this)
		);

		socket.on(
			'connect',
			(() => {
				// inform the server this socket wants to know about admin events
				socket.emit('admin connection');
			}).bind(this)
		);

		// TODO: replace these update functions with a 'less heavy' approach
		// for now i'm just stomping ALL the data on every update, but these could send
		// individual events with the actual data to be changed
		// and just update more gently
		// (like the client connection changed, which COULD just update the client connection instead of stomping)
		// for now i'm using one giant event because only I will be on this, and I've throttled fetchQuiz to only
		// work every few seconds anyway...
		socket.on('client connection changed', () => this.fetchQuiz());
		socket.on('update admin data', () => this.fetchQuiz());

		this.state = {
			socket: socket,
			selectedSessionId: null,
			sessions: [],
			platonicRounds: [],
			teams: [],
			isFetching: false,
			newSessionName: '',
		};

		this.handleSelectSession = this.handleSelectSession.bind(this);
		this.fetchQuiz = this.fetchQuiz.bind(this);
		this.handleFlipSessionLive = this.handleFlipSessionLive.bind(this);
		this.handleSubmitNewRound = this.handleSubmitNewRound.bind(this);
		this.handleFlipTeam = this.handleFlipTeam.bind(this);
		this.handleDeletePlayer = this.handleDeletePlayer.bind(this);
		this.handleDeleteSession = this.handleDeleteSession.bind(this);
		this.handleReseedDatabase = this.handleReseedDatabase.bind(this);
		this.handleWipeAllData = this.handleWipeAllData.bind(this);

		this.onClickWipeAllData = this.onClickWipeAllData.bind(this);
		this.onClickReseedDatabase = this.onClickReseedDatabase.bind(this);

		this.handleDeleteRoundInstance = this.handleDeleteRoundInstance.bind(
			this
		);
		this.onChangeSessionName = this.onChangeSessionName.bind(this);
		this.createNewSession = this.createNewSession.bind(this);
		this.isNewSessionNameValid = this.isNewSessionNameValid.bind(this);
	}

	componentDidMount() {
		document.title = 'QAdmin';

		this.loadInitialData();
		this.fetchQuiz();
	}

	loadInitialData() {
		this.loadPlatonicRounds();
		this.loadTeams();
	}

	loadPlatonicRounds() {
		this.state.socket.emit('fetch platonic round list', (list) => {
			this.setState({ platonicRounds: list });
		});
	}

	loadTeams() {
		this.state.socket.emit('fetch teams', (teams) => {
			this.setState({ teams: teams });
		});
	}

	fetchQuiz() {
		// TODO: consider adding a throttle here to only update every 5s at most (needs to set a timeout to update in a moment)

		if (!this.state.isFetching) {
			this.setState({ isFetching: true });
			this.state.socket.emit('fetch quiz', (sessions) => {
				this.setState({ sessions: sessions, isFetching: false });
			});
		}
	}

	onChangeSessionName(e) {
		this.setState({ newSessionName: e.target.value });
	}

	handleFlipTeam(player) {
		this.state.socket.emit('flip team', player, () => {
			this.fetchQuiz();
		});
	}

	handleSelectSession(id) {
		this.fetchQuiz();
		this.setState({ selectedSessionId: id });
	}

	handleSubmitNewRound(newRound) {
		this.state.socket.emit('submit new round instance', newRound, () => {
			this.fetchQuiz();
		});
	}

	handleDeleteRoundInstance(id) {
		this.state.socket.emit(
			'delete round instance',
			id,
			this.state.selectedSessionId,
			() => {
				this.fetchQuiz();
			}
		);
	}

	updateRoundInstanceTimes() {
		// this just needs to call the db, and then the server function calls pushRoundInstanceToSession (see newround/deleteround)
	}

	handleFlipSessionLive(sessionId) {
		this.state.socket.emit(
			'admin flip session live',
			sessionId,
			(() => {
				// this.loadSessions();
				this.fetchQuiz();
			}).bind(this)
		);
	}

	onClickWipeAllData() {
		confirmAlert({
			title: 'Are you sure?',
			message:
				'*** THIS WILL WIPE ALL OF THE EXISTING SESSIONS, ROUNDS, PLAYERS, AND SUBMITTED QUESTIONS/ANSWERS ***',
			buttons: [
				{
					label: 'Yes!',
					onClick: () => this.handleWipeAllData(),
				},
				{
					label: 'No',
					onClick: null,
				},
			],
		});
	}

	onClickReseedDatabase() {
		confirmAlert({
			title: 'Are you sure?',
			message:
				'*** THIS WILL DELETE **ALL DATA** AND RESEED ALL OF THE PLATONIC ROUNDS AND QUESTIONS ***',
			buttons: [
				{
					label: 'Yes!',
					onClick: () => this.handleReseedDatabase(),
				},
				{
					label: 'No',
					onClick: null,
				},
			],
		});
	}

	handleReseedDatabase() {
		this.state.socket.emit('reseed database', (message) => {
			if (message == 'ok') {
				alert('ok');
			} else if (message && message.name == 'error') {
				alert('error');
			} else {
				alert('unexpected response: ' + message);
			}

			this.loadInitialData();
			this.fetchQuiz();
		});
	}

	handleWipeAllData() {
		this.state.socket.emit('wipe all data', () => {
			this.loadInitialData();
			this.fetchQuiz();
		});
	}

	isNewSessionNameValid() {
		return (
			this.state.newSessionName && this.state.newSessionName.length > 3
		);
	}

	createNewSession() {
		if (this.isNewSessionNameValid()) {
			this.state.socket.emit(
				'create new session',
				this.state.newSessionName,
				() => {
					this.fetchQuiz();
				}
			);
		}
	}

	handleDeletePlayer(playerId) {
		if (playerId && Number.isInteger(playerId)) {
			this.state.socket.emit('delete player', playerId, () => {
				this.fetchQuiz();
			});
		}
	}

	handleDeleteSession(sessionId) {
		if (sessionId && Number.isInteger(sessionId)) {
			this.state.socket.emit('delete session', sessionId, () => {
				this.fetchQuiz();
			});
		}
	}

	render() {
		return (
			<div>
				<Header />
				<div className='columns'>
					<div className='column is-half is-offset-one-quarter'>
						<section className='section'>
							<h1 className='title'>Admin</h1>
							<div className='box'>
								<h2 className='subtitle is-size-4'>Sessions</h2>
								<SessionList
									sessions={this.state.sessions}
									platonicRounds={this.state.platonicRounds}
									teams={this.state.teams}
									selectedSessionId={
										this.state.selectedSessionId
									}
									handleFlipTeam={this.handleFlipTeam}
									handleSubmitNewRound={
										this.handleSubmitNewRound
									}
									handleDeleteRoundInstance={
										this.handleDeleteRoundInstance
									}
									handleDeletePlayer={this.handleDeletePlayer}
									handleDeleteSession={
										this.handleDeleteSession
									}
									handleFlipSessionLive={
										this.handleFlipSessionLive
									}
									handleSelectSession={
										this.handleSelectSession
									}
								/>

								{!this.state.selectedSessionId && (
									<div>
										<table className='table'>
											<tbody>
												<tr>
													<th>
														<label
															className='label'
															htmlFor='sessionName'>
															Add New Session
														</label>
													</th>
													<th>
														<div className='field'>
															<div className='control has-icons-left has-icons-right'>
																<input
																	className={
																		(this.isNewSessionNameValid()
																			? 'is-success'
																			: 'is-warning') +
																		' input'
																	}
																	id='sessionName'
																	placeholder='New session name'
																	value={
																		this
																			.state
																			.newSessionName
																	}
																	onChange={
																		this
																			.onChangeSessionName
																	}
																/>
																<span className='icon is-small is-left'>
																	<FontAwesomeIcon
																		icon={
																			faUser
																		}
																	/>
																</span>
																<SuccessIcon
																	success={
																		this.isNewSessionNameValid()
																			? true
																			: false
																	}
																	position='is-right'
																/>
															</div>
														</div>
													</th>
													<th>
														<div className='level'>
															<div className='level-item'>
																<button
																	className='button is-info'
																	onClick={
																		this
																			.createNewSession
																	}>
																	Create
																</button>
															</div>
														</div>
													</th>
												</tr>
											</tbody>
										</table>
									</div>
								)}
							</div>

							<div className='box'>
								<h2 className='subtitle is-size-4'>
									Available Platonic Rounds
								</h2>
								<p>
									(
									<span className='has-text-info'>Maths</span>{' '}
									/ Not Maths)
								</p>
								<PlatonicRoundsTable
									platonicRounds={this.state.platonicRounds}
								/>
							</div>

							{!this.state.selectedSessionId && (
								<div className='box'>
									<div className='content'>
										<h2 className='subtitle is-size-4'>
											Dangerous Nonsense
										</h2>
										<p>
											<button
												className='button is-danger'
												onClick={
													this.onClickWipeAllData
												}>
												Wipe All Data
											</button>
										</p>
										<p>
											<button
												className='button is-danger'
												onClick={
													this.onClickReseedDatabase
												}>
												Reseed Database
											</button>
										</p>
									</div>
								</div>
							)}
						</section>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Admin;
