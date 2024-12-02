const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Rendre muet un membre du serveur',
    async execute(message, args) {
        // Vérifier les permissions
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return message.reply("Vous n'avez pas la permission de rendre muet des membres.");
        }

        // Vérifier si un membre est mentionné
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Veuillez mentionner un membre à rendre muet.");
        }

        // Vérifier si le rôle "Muted" existe, sinon le créer
        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#808080",
                    permissions: []
                });
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.permissionOverwrites.edit(muteRole, {
                        SendMessages: false,
                        AddReactions: false,
                        Speak: false
                    });
                });
            } catch (error) {
                console.error(error);
                return message.reply("Une erreur s'est produite lors de la création du rôle Muted.");
            }
        }

        // Ajouter le rôle Muted au membre
        try {
            await member.roles.add(muteRole);
            message.reply(`${member.user.tag} a été rendu muet.`);
        } catch (error) {
            console.error(error);
            message.reply("Une erreur s'est produite lors de la tentative de rendre muet le membre.");
        }
    },
};
