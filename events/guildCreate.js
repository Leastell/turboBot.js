const { pool, guildExists } = require('../scripts/database.js')
const { getChannels } = require('../scripts/tools.js')

module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(guild) {
        const exists = await guildExists(guild.id)
        const channels = getChannels(guild, 'SEND_MESSAGES')

        if(exists){
            channels[0].send("Hello! It looks like I've been here before... I'm going to keep doing what I was doing before. If you'd like to change anything, please run `/setup` again")
        }
        else{
            channels[0].send("Hello! It looks like I'm new here. Please perform first time setup by running `/setup` in a channel I can see")
        }
        
	},
};
