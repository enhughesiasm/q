import React from 'react';
import PropTypes from 'prop-types';

const PlatonicRoundsTable = (props) => (
	<table className='table'>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Question Count</th>
			</tr>
		</thead>
		<tbody>
			{props.platonicRounds.map((pr, i) => (
				<tr key={i} className={pr.parseAsMaths ? 'has-text-info' : ''}>
					<td>{pr.id}</td>
					<td>{pr.name}</td>
					<td>{pr.questionCount ? pr.questionCount : '?'}</td>
				</tr>
			))}
		</tbody>
	</table>
);

PlatonicRoundsTable.propTypes = {
	platonicRounds: PropTypes.array.isRequired,
};

export default PlatonicRoundsTable;
