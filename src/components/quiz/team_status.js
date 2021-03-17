import React from 'react';

const TeamStatus = (props) => {
	let show =
		props.teamStatus &&
		props.teamStatus.filter((t) => t.teamId != null).length > 0 &&
		props.teams &&
		props.teams.length > 0;

	return (
		<div className='tile is-parent is-rounded'>
			{show &&
				props.teamStatus &&
				props.teamStatus
					.filter((t) => t.playerCount > 0)
					.map((ts, i) => {
						const team = props.teams.filter(
							(t) => t.id === ts.teamId
						)[0];

						return (
							<p
								key={i}
								className='tile is-child has-text-white is-size-4 is-size-6-mobile'
								style={{
									background: team.colour,
								}}>
								<span className='has-text-weight-bold'>
									Team {team.name}
									{/* {ts.playerCount} player */}
									{/* {ts.playerCount > 1 ? 's' : ''}:{' '} */}
								</span>
								<br />
								{ts.playerNames &&
									Array.isArray(ts.playerNames) && (
										<div>
											{ts.playerNames.map((name) => (
												<span
													key={`team-${i}-${name}`}
													className='is-size-5 is-size-6-mobile mx-3 my-1 py-1'>
													{name}
												</span>
											))}
										</div>
									)}

								<span className='has-text-weight-bold is-size-3 is-size-5-mobile'>
									{ts.totalScore ? ts.totalScore : 0} points
								</span>
							</p>
						);
					})}
		</div>
	);
};

export default TeamStatus;