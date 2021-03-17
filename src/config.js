const prod = process.env.NODE_ENV === 'production';

const config = {
	isDev: !prod,
	socket: {
		protocol: !prod ? 'http' : 'https',
		port: !prod ? 4008 : 443,
		address: !prod ? 'localhost' : 'quizzler-server.herokuapp.com',
	},
	quiz: {
		showRoundFinishedScreenForMilliseconds: 5000,
		showTeamAssignedScreenForSeconds: 4,
		assignTeamForMilliseconds: 3000,
	},
};

export default config;
