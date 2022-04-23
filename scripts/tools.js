const bitfieldCalculator = require('discord-bitfield-calculator');

function getChannels(guild, permission){
    const channels = guild.channels.cache

    validChannels = []

    for (channelObj of channels){
        const channel = channelObj[1]
        const bitfield = guild.me.permissionsIn(channel).bitfield.toString()
        let permissions = bitfieldCalculator.permissions(bitfield)
        if(channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(permission)){
            validChannels.push(channel)
        }
    }

    return validChannels
}

function IDfromURL(url){
    trackID = url.split("/track/")[1].split("?")[0]
    return trackID
}

module.exports = { getChannels, IDfromURL }