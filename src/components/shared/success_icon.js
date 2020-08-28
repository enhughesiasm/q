import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class SuccessIcon extends Component {

	render() {
		return (
			<span className={ this.props.position + ' icon is-small'}>
				{ this.props.success ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />  }
			</span>
		);
	}
}

export default SuccessIcon;

SuccessIcon.propTypes = {
	success: PropTypes.bool.isRequired,
	position: PropTypes.string
};