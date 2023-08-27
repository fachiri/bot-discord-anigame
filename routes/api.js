const { CLIENT_ID, PUBLIC_KEY, TOKEN, GUILD_ID, DISCORD_API, BASE_URL } = require('./../config/constants')
const { discordApi } = require('./../config/axios')
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions')
const express = require('express')
const router = express.Router()

router.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;
  if (interaction.type !== InteractionType.APPLICATION_COMMAND) return console.log('Interaction Type is not APPLICATION_COMMAND')
  if (interaction.data.name == 'yo') {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          {
            title: 'YOO WASSAP DUDE',
            description: `Yo ${interaction.member.user.username}!`,
            color: 0x0099FF,
            image: {
              url: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`,
            },
            timestamp: new Date(),
            footer: {
              text: 'anigame',
            }
          }
        ]
      }
    })
  }

  if (interaction.data.name == 'dm') {
    // https://discord.com/developers/docs/resources/user#create-dm
    let c = (await discordApi.post(`/users/@me/channels`, {
      recipient_id: interaction.member.user.id
    })).data
    try {
      // https://discord.com/developers/docs/resources/channel#create-message
      let res = await discordApi.post(`/channels/${c.id}/messages`, {
        content: 'Yo! I got your slash command. I am not able to respond to DMs just slash commands.',
      })
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }

    return res.send({
      // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: '👍'
      }
    });
  }
});

module.exports = router;
