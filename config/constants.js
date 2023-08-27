require('dotenv').config()
module.exports = {
  BASE_URL: process.env.BASE_URL,
  DISCORD_API: process.env.DISCORD_API,
  PUBLIC_KEY: process.env.PUBLIC_KEY || 'not set',
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  GUILD_ID: process.env.GUILD_ID,
}