const { CLIENT_ID, PUBLIC_KEY, TOKEN, GUILD_ID, DISCORD_API, BASE_URL } = require('./config/constants');

var createError = require('http-errors');
const axios = require('axios')
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);
app.use('/api', apiRouter);

const { discordApi } = require('./config/axios')

app.get('/register_commands', async (req, res) => {
	let slash_commands = [
		{
			"name": "yo",
			"description": "replies with Yo!",
			"options": []
		},
		{
			"name": "dm",
			"description": "sends user a DM",
			"options": []
		}
	]
	try {
		await discordApi.put(`/applications/${CLIENT_ID}/commands`, slash_commands)
		return res.send('global commands have been registered')
	} catch (e) {
		console.error(e.code)
		console.error(e.response?.data)
		return res.send(`${e.code} error from discord`)
	}
})

app.get('/api/commands/delete', async (req, res) => {
	try {
		const globalCommands = await discordApi.get(`/applications/${CLIENT_ID}/commands`)
		const guildCommands = await discordApi.get(`/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`)
		// globalCommands.data.map(async (command) => {
		// 	await discordApi.delete(`/applications/${CLIENT_ID}/commands/${command.id}`)
		// })
		return res.send({
			message: 'Global & Guild commands have been fetched',
			data: {
				globalCommands: globalCommands.data,
				guildCommands: guildCommands.data
			}
		})
	} catch (e) {
		console.error(e.code)
		console.error(e.response?.data)
		return res.send(`${e.code} error from discord`)
	}
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})


app.listen(3000, () => {
	console.log(`Server is running on ${BASE_URL}`)
})


// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');
// const { TOKEN } = require('./config/const');
// const { Client, GatewayIntentBits, Collection, Events, REST, Routes, EmbedBuilder } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.commands = new Collection();

// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	// Set a new item in the Collection with the key as the command name and the value as the exported module
// 	if ('data' in command && 'execute' in command) {
// 		client.commands.set(command.data.name, command);
// 	} else {
// 		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 	}
// }

// client.on(Events.InteractionCreate, async interaction => {
// 	// if (!interaction.isChatInputCommand()) return;

// 	if (interaction.isButton() && interaction.customId === 'play') {
// 		await interaction.update({ embeds: [new EmbedBuilder()
// 			.setColor(0x0099FF)
// 			.setTitle('Play')
// 			.setDescription('Sabar guyss, fitur ini sementara dibekeng.')
// 			.setTimestamp()
// 			.setFooter({ text: 'anigame'})], components: [] });
// 	}

// 	const command = interaction.client.commands.get(interaction.commandName);

// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	}

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
// });

// client.login(TOKEN);