const bitfieldCalculator = require('discord-bitfield-calculator');

function firstChannel(guild, permission){
    const channels = guild.channels.cache
    
    for (channelObj of channels){
        const channel = channelObj[1]
        const bitfield = guild.me.permissionsIn(channel).bitfield.toString()
        let permissions = bitfieldCalculator.permissions(bitfield)
        if(channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(permission)){
            return channel
        }
    }

    return undefined
}

module.exports = { firstChannel}