const { TOKEN, DISCORD_API, } = require('./constants');
const axios = require('axios')
module.exports = {
  discordApi: axios.create({
    baseURL: DISCORD_API,
    timeout: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Authorization",
      "Authorization": `Bot ${TOKEN}`
    }
  })
}