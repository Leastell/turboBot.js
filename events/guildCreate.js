const { pool, serverExists } = require('../scripts/database.js')
const { firstChannel } = require('../scripts/tools.js')


module.exports = {
	name: 'guildCreate',
	once: true,
	async execute(guild) {
        const exists = await serverExists(guild.id)

        if(exists){

        }
        else{
            const channel = firstChannel(guild, 'SEND_MESSAGES')
            channel.send("Hello! It looks like I'm new here. Please perform first time setup by running `/setup` in a channel I can see")
        }
        
    
	},
};
