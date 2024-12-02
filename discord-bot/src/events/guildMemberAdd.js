module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue');
        if (!channel) return;

        channel.send(`Bienvenue sur le serveur, ${member}!`);

        // Vous pouvez ajouter ici la logique pour créer un personnage pour le nouveau membre
        // Par exemple:
        // const Character = require('../models/Character');
        // new Character({ userId: member.id }).save();
    },
};
