const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../src/config');

const commands = [];
const commandsPath = path.join(__dirname, '../src/commands');

function loadCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      loadCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command = require(filePath);
      commands.push(command.data.toJSON());
    }
  }
}

loadCommands(commandsPath);

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log('Début du déploiement des commandes slash (/).');

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log('Déploiement des commandes slash (/) réussi.');
  } catch (error) {
    console.error('Erreur lors du déploiement des commandes :', error);
  }
})();
