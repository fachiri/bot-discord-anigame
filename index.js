const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", function (request, response) {
    response.sendStatus(200);
});

var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('MTA0NDI2NzA4MjU3NDk5NTQ2Ng.Gd_IdE.-Bj0mBtus1fgDeZq8Sx5zdquNUiK0IJIAY1vUo');