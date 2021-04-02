import React from 'react';

const PlayerRounds = (props) => {
	return (
		<div>
			{/* <h3 className='subtitle is-size-4 is-size-6-mobile'>Your Scores</h3> */}
			<table className='table'>
				<thead></thead>
				<tbody>
					{props.completedRounds.map((completedRound, i) => {
						let roundScore = 0;
						let roundId = completedRound.id;
						props.playerStatus.scoresByRoundInstanceId.forEach(
							(round, j) => {
								debugger;
								if (
									round[0].toString() === roundId.toString()
								) {
									roundScore = round[1];
								}
							}
						);
						return (
							<tr key={i}>
								<td style={{ minWidth: '50%' }}>
									Round {completedRound.roundNumber}
								</td>
								<td>{completedRound.name}</td>
								<td
									className={
										roundScore > 0
											? 'has-text-success'
											: 'has-text-danger'
									}>
									{roundScore || '-'}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default PlayerRounds;
