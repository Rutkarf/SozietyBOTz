const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: '!' },
    welcomeChannelId: { type: String, default: null },
    economyEnabled: { type: Boolean, default: true },
    rpgEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Guild', GuildSchema);
