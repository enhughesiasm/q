import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuccessIcon from '../shared/success_icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuperscript } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class SessionForm extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangePlayerName = this.onChangePlayerName.bind(this);
		this.onChangeSessionName = this.onChangeSessionName.bind(this);
	}

	onChangePlayerName(e) {
		this.props.handleChange(
			e.target.value,
			this.props.sessionForm.sessionName
		);
	}

	onChangeSessionName(e) {
		this.props.handleChange(
			this.props.sessionForm.playerName,
			e.target.value
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.handleSubmit();
	}

	render() {
		return (
			<form className='panel' style={{ marginTop: '3rem' }}>
				<fieldset className='panel-block px-0'>
					<legend
						className='px-6 py-2 has-background-warning-light has-text-dark'
						style={{ width: '100%' }}>
						Welcome.
					</legend>
					<div className='px-4 pb-4' style={{ width: '100%' }}>
						<div className='field'>
							<label className='label' htmlFor='playerName'>
								Name
							</label>
							<div className='control has-icons-left has-icons-right'>
								<input
									className={
										(this.props.sessionForm
											.isPlayerNameValid
											? 'is-success'
											: 'is-warning') + ' input'
									}
									id='playerName'
									placeholder='Enter your name'
									value={this.props.sessionForm.playerName}
									onChange={this.onChangePlayerName}
								/>
								<span className='icon is-small is-left'>
									<FontAwesomeIcon icon={faUser} />
								</span>
								<SuccessIcon
									success={
										this.props.sessionForm.isPlayerNameValid
									}
									position='is-right'
								/>
							</div>
						</div>
						<div className='field'>
							<label className='label' htmlFor='sessionName'>
								Entry Word
							</label>
							<div className='control has-icons-left has-icons-right'>
								<input
									id='sessionName'
									className={
										(this.props.sessionForm
											.isSessionNameValid
											? 'is-success'
											: 'is-warning') + ' input'
									}
									placeholder='Enter the word for this session'
									value={this.props.sessionForm.sessionName}
									onChange={this.onChangeSessionName}
								/>
								<span className='icon is-small is-left'>
									<FontAwesomeIcon icon={faSuperscript} />
								</span>
								<SuccessIcon
									success={
										this.props.sessionForm
											.isSessionNameValid
									}
									position='is-right'
								/>
							</div>
						</div>
						<div className='field has-text-centered'>
							<button
								type='submit'
								className={
									(this.props.sessionForm.isValid
										? 'is-success'
										: 'is danger') +
									' button ' +
									(this.props.sessionForm.isSubmitting
										? 'is-loading'
										: '')
								}
								disabled={
									!this.props.sessionForm.isValid ||
									this.props.sessionForm.isSubmitting
								}
								onClick={this.onSubmit}>
								<span
									style={{
										opacity: this.props.sessionForm
											.isSubmitting
											? 0
											: 1,
									}}>
									Enter!
								</span>
							</button>
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
}

SessionForm.propTypes = {
	sessionForm: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default SessionForm;
