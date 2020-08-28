import React from 'react';

const PlayerRounds = (props) => (
	<div>
		<h3 className="subtitle is-size-4 is-size-6-mobile">Your Scores</h3>
		<table className="table">
			<thead>
				{/* <tr>
							<th>
							-
							</th>
							<th>
							Name
							</th>
							<th>
							Score
							</th>
						</tr> */}
			</thead>
			<tbody>
				{ props.completedRounds.map((round, i) =>
				{
					let roundScore = 0;
					if(props.playerStatus.scoresByRoundInstanceId[i] && props.playerStatus.scoresByRoundInstanceId[i][1])
					{
						roundScore = props.playerStatus.scoresByRoundInstanceId[i][1];
					}
					return <tr key={i}>
						<td>Round {i + 1}</td>
						<td>{round.name}</td>
						<td className={roundScore > 0 ? 'has-text-success' : 'has-text-danger'}>{roundScore}</td>
					</tr>;
				}
				)}
			</tbody>
		</table>
	</div>
);

export default PlayerRounds;