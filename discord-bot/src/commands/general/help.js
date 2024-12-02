const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Liste des commandes')
            .setDescription('Voici la liste des commandes disponibles :')
            .addFields(
                { name: '!help', value: 'Affiche cette liste de commandes' },
                { name: '!ping', value: 'Vérifie la latence du bot' },
                { name: '!info', value: 'Affiche des informations sur le bot' }
                // Ajoutez d'autres commandes ici au fur et à mesure que vous les créez
            )
            .setFooter({ text: 'Utilisez !help <commande> pour plus d informations sur une commande spécifique' });

        message.channel.send({ embeds: [embed] });
    },
};
