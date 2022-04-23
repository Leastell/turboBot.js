const { refreshChannelDict, guildExists } = require('../scripts/database.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        refreshChannelDict()
	},
};