const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getChannels } = require('../scripts/tools.js')
const { guildExists, initializeGuild, updateChannels } = require('../scripts/database.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Perform first time setup for your server'),
	async execute(interaction) {
		const channels = getChannels(interaction.guild, 'SEND_MESSAGES')

        channelOptions = []
        for (channel of channels){
            channelOptions.push({
                label: "#"+channel.name,
                description: channel.topic,
                value: channel.id
            })
        }

        let channelMenu = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('No channel selected')
            .setMinValues(1)
            .setOptions(channelOptions)
        
        const row = new MessageActionRow().addComponents(channelMenu);

		await interaction.reply({
            content: 'What channels should I watch for Spotify links in?', 
            components: [row], 
            ephemeral: true
        });

        // Collector
        interaction.channel.awaitMessageComponent({componentType: 'SELECT_MENU', time: 20000 })
            .then(async i => {
                
                response = "You got it, I'll watch in"

                for (const [index, value] of i.values.entries()){
                    channelTag = "<#"+value+">"
                    if (index === i.values.length - 1) {
                        response += (" and "+channelTag)
                    }
                    else if (index === 0) {
                        response += " "+channelTag
                    }
                    else{
                        response += (", "+channelTag)
                    }
                }
                response += ". If you change your mind, just run `/setup` again."

                interaction.editReply({
                    content: response, 
                    components: [], 
                    ephemeral: true
                });

                // Update or initialize
                const exists = await guildExists(interaction.guildId)
                if (exists) {
                    updateChannels(interaction.guild.id, i.values)
                } else {
                    initializeGuild(interaction.guild.id, i.values)
                }

            })
            .catch(err => {
                console.log(err.message);
                if (err.message === "Collector received no interactions before ending with reason: time"){
                    interaction.editReply({
                        content: "*This dialogue has expired, please run the command again to generate a new one.*", 
                        components: [], 
                        ephemeral: true
                    });
                }
                else{
                    interaction.editReply({
                        content: "An unknown error has occured, please contact Libra!\n*"+err.name+"*", 
                        components: [], 
                        ephemeral: true
                    });
                }
            });
	},
};