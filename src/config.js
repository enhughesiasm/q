const prod = process.env.NODE_ENV === 'production';

const config = {
	isDev: !prod,
	socket: {
		protocol: !prod ? 'http' : 'https',
		port: !prod ? 4008 : 4008,
		address: !prod ? 'localhost' : 's.enhughesiasm.com',
	},
	quiz: {
		showRoundFinishedScreenForMilliseconds: 5000,
		showTeamAssignedScreenForSeconds: 4,
		assignTeamForMilliseconds: 3000,
	},
};

export default config;
