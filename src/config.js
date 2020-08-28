const dev = true;

const config = {
	isDev: dev,
	socket: {
		protocol: dev ? 'http' : 'https',
		port: dev ? 4008 : 4008,
		address: dev ? 'localhost' : 's.enhughesiasm.com',
	},
	quiz: {
		showRoundFinishedScreenForMilliseconds: 5000,
		showTeamAssignedScreenForSeconds: 4,
		assignTeamForMilliseconds: 3000,
	},
};

export default config;
