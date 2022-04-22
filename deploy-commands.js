const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, devGuildId, token } = require('./config.json');

const commands = [];

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, devGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);