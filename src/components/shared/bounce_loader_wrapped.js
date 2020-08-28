import React from 'react';
import { css } from 'react-emotion';
import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const BounceLoaderWrapper = (props) => (
	<div style={{display:'inline-block'}}>
		<BounceLoader color={props.color ? props.color : '#dddddd'}/>
	</div>
);

BounceLoaderWrapper.propTypes = {
	color: PropTypes.string
};


export default BounceLoaderWrapper;