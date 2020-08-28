import React, { Component } from 'react';
import config from '../../config';
import socketIOClient from 'socket.io-client';
import Admin from './admin';

/* TODO: VERY QUICK AND DIRTY PROTOTYPE: REPLACE WITH *ACTUAL AUTHENTICATION* */
class AdminGate extends Component {
	constructor(props) {
		super(props);
		let socketAddress =
			config.socket.protocol +
			'://' +
			config.socket.address +
			':' +
			config.socket.port;
		const temporarySocket = socketIOClient(socketAddress);

		temporarySocket.on('connect', () => {
			temporarySocket.emit('temporary admin connection');
		});

		this.state = {
			temporarySocket: temporarySocket,
			inputWord: '',
			passed: config.isDev,
		};

		this.onChangeInputWord = this.onChangeInputWord.bind(this);
		this.onClickGoButton = this.onClickGoButton.bind(this);
	}

	onChangeInputWord(e) {
		this.setState({ inputWord: e.target.value });
	}

	onClickGoButton() {
		/* TODO: this will obviously not remotely stop a determined intruder, but there's nothing of value inside
				so all I need is to deter anybody actually playing the live game. for now!
		*/
		this.state.temporarySocket.emit(
			'authenticate admin',
			this.state.inputWord,
			(result) => {
				this.setState({ passed: result });
			}
		);
	}

	render() {
		return (
			<div>
				{!this.state.passed && (
					<div>
						<input
							type='password'
							value={this.state.inputWord}
							onChange={this.onChangeInputWord}
						/>
						<button onClick={this.onClickGoButton}>Go</button>
					</div>
				)}
				{this.state.passed && <Admin />}
			</div>
		);
	}
}

export default AdminGate;
