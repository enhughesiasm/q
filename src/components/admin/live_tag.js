import React from 'react';
import PropTypes from 'prop-types';

const LiveTag = (props) =>
	<span className={ (props.isLive ? 'is-success' : 'is-danger') + ' tag'} style={{marginLeft:'5px', marginRight: '5px'}}>
		{ props.isLive ? '-  -  LIVE  -  -' : 'NOT LIVE'}
	</span>;

LiveTag.propTypes = {
	isLive: PropTypes.bool.isRequired
};

export default LiveTag;