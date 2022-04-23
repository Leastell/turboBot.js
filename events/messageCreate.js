const { channelDict } = require('../scripts/database.js')
const { IDfromURL } = require('../scripts/tools.js')

const urlRegex = /(https?:\/\/open.spotify.com\/track\/[^\s]+)/g;

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message) {
        let links = [...message.content.matchAll(urlRegex)];
        for (let link of links) {
            trackID = IDfromURL(link[0])
            console.log(trackID);
        }
	},
};
