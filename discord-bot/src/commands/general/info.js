const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Affiche des informations sur le bot',
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Informations sur le bot')
            .addFields(
                { name: 'Nom du bot', value: client.user.username },
                { name: 'Créé le', value: client.user.createdAt.toDateString() },
                { name: 'Serveurs', value: `${client.guilds.cache.size}` },
                { name: 'Utilisateurs', value: `${client.users.cache.size}` },
                { name: 'Version Discord.js', value: require('discord.js').version }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `Demandé par ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        message.channel.send({ embeds: [embed] });
    },
};
