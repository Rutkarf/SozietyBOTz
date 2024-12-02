const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Expulser un membre du serveur',
    execute(message, args) {
        // Vérifier les permissions
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return message.reply("Vous n'avez pas la permission d'expulser des membres.");
        }

        // Vérifier si un membre est mentionné
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Veuillez mentionner un membre à expulser.");
        }

        // Vérifier si le bot peut expulser le membre
        if (!member.kickable) {
            return message.reply("Je ne peux pas expulser ce membre. Il a peut-être un rôle supérieur au mien.");
        }

        // Obtenir la raison de l'expulsion
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

        // Expulser le membre
        member.kick(reason)
            .then(() => {
                message.reply(`${member.user.tag} a été expulsé. Raison : ${reason}`);
            })
            .catch(error => {
                console.error(error);
                message.reply("Une erreur s'est produite lors de la tentative d'expulsion.");
            });
    },
};
