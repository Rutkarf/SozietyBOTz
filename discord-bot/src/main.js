const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { connectDatabase } = require('./utils/database');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/votre_base_discord', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion :'));
db.once('open', function() {
  console.log("Connecté à la base de données MongoDB");
});

// Création du client Discord avec les intents nécessaires
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

// Stockage des commandes et des événements
client.commands = new Collection();
client.cooldowns = new Collection();

// Chargement des commandes
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, 'commands', folder, file));
        client.commands.set(command.name, command);
    }
}

// Chargement des événements
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(path.join(__dirname, 'events', file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', error => {
    logger.error('Unhandled promise rejection:', error);
});

// Connexion à la base de données
connectDatabase().then(() => {
    logger.info('Connected to database');
}).catch(error => {
    logger.error('Database connection error:', error);
});

// Connexion du bot à Discord
client.login(config.token).then(() => {
    logger.info('Bot is now connected to Discord');
}).catch(error => {
    logger.error('Error connecting to Discord:', error);
});

// Exportation du client pour une utilisation dans d'autres fichiers si nécessaire
module.exports = client;
