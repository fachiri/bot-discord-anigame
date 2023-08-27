const { CLIENT_ID, PUBLIC_KEY, TOKEN, GUILD_ID, DISCORD_API, BASE_URL } = require('./config/constants');
const axios = require('axios')

(async () => {
	try {
		const discord_api = axios.create({
			baseURL: DISCORD_API,
			timeout: 3000,
			headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
			"Access-Control-Allow-Headers": "Authorization",
			"Authorization": `Bot ${TOKEN}`
			}
		});
		await discord_api.delete(`/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`)
		console.log('Successfully deleted all guild commands.')
	} catch (e) {
		console.error(e)
	}
})

// const { REST, Routes } = require('discord.js');
// const { CLIENT_ID, GUILD_ID, TOKEN } = require('./config/constants');

// const rest = new REST({ version: '10' }).setToken(TOKEN);

// // ...

// // for guild-based commands
// rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// // for global commands
// rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);
