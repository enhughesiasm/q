import React from 'react';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const BounceLoaderWrapper = (props) => (
	<div
		style={{
			height: '50px',
			textAlign: 'center',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
		<BounceLoader color={props.color ? props.color : '#dddddd'} />
	</div>
);

BounceLoaderWrapper.propTypes = {
	color: PropTypes.string,
};

export default BounceLoaderWrapper;
