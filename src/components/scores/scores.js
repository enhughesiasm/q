import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Header from '../shared/header';
import config from '../../config';
import SessionScores from './session_scores';

class Scores extends Component {
	constructor(props) {
		super(props);

		let socketAddress =
			config.socket.protocol +
			'://' +
			config.socket.address +
			':' +
			config.socket.port;

		const socket = socketIOClient(socketAddress);

		socket.on('connect', () => {
			// happens on first connection, and on subsequent reconnections
			// so each time we want to register for events

			// (this will join or rejoin the server-side session room, if we have one)
			socket.emit('scores connection');
		});

		socket.on('update scores data', () => {
			this.updateSession();
		});
		socket.on('update sessions list', () => {
			this.fetchLiveSessions();
		});

		this.state = {
			socket: socket,
			liveSessions: [],
			selectedSessionId: null,
			teamScores: [],
		};

		this.receiveLiveSessions = this.receiveLiveSessions.bind(this);
		this.tick = this.tick.bind(this);
		this.updateSession = this.updateSession.bind(this);
		this.selectSession = this.selectSession.bind(this);
		this.fetchLiveSessions = this.fetchLiveSessions.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 900);
		this.fetchLiveSessions();
		document.title = 'Q Scores';
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	fetchLiveSessions() {
		this.state.socket.emit('fetch live sessions', this.receiveLiveSessions);
	}

	receiveLiveSessions(sessions) {
		this.setState({ liveSessions: sessions });
	}

	selectSession(id) {
		this.setState({ selectedSessionId: id, teamScores: [] });
		this.updateSession();
	}

	tick() {
		this.updateSession();
	}

	updateSession() {
		if (this.state.selectedSessionId) {
			this.state.socket.emit(
				'fetch team scores',
				this.state.selectedSessionId,
				(teamScores) => {
					this.setState({ teamScores: teamScores });
				}
			);
		}
	}

	render() {
		let liveSessions = this.state.liveSessions;
		let sessionSelected = !!this.state.selectedSessionId;
		return (
			<div>
				<Header />
				<section className='section'>
					{!sessionSelected && (
						<div className='box'>
							{liveSessions && liveSessions.length > 0 && (
								<div>
									<h1 className='title'>Pick Session</h1>
									<table className='table'>
										<tbody>
											{liveSessions.map((s, i) => (
												<tr key={i}>
													<td>
														<a
															className='subtitle'
															onClick={() => {
																this.selectSession(
																	s.id
																);
															}}>
															{s.name}
														</a>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
							{(!liveSessions || liveSessions.length == 0) && (
								<h1 className='title'>No Live Sessions</h1>
							)}
						</div>
					)}
					{sessionSelected && (
						<SessionScores
							sessionId={this.state.selectedSessionId}
							selectSession={this.selectSession}
							teamScores={this.state.teamScores}
						/>
					)}
				</section>
			</div>
		);
	}
}

export default Scores;
