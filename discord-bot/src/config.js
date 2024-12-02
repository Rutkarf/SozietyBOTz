require('dotenv').config();

module.exports = {
  token: process.env.DISCORD_BOT_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  prefix: process.env.BOT_PREFIX,
  owners: [process.env.OWNER_ID],
};

  