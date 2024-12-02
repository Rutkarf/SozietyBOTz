const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bannir un membre du serveur',
    execute(message, args) {
        // Vérifier les permissions
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.reply("Vous n'avez pas la permission de bannir des membres.");
        }

        // Vérifier si un membre est mentionné
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Veuillez mentionner un membre à bannir.");
        }

        // Vérifier si le bot peut bannir le membre
        if (!member.bannable) {
            return message.reply("Je ne peux pas bannir ce membre. Il a peut-être un rôle supérieur au mien.");
        }

        // Obtenir la raison du bannissement
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

        // Bannir le membre
        member.ban({ reason: reason })
            .then(() => {
                message.reply(`${member.user.tag} a été banni. Raison : ${reason}`);
            })
            .catch(error => {
                console.error(error);
                message.reply("Une erreur s'est produite lors de la tentative de bannissement.");
            });
    },
};
