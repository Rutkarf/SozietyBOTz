const { EmbedBuilder } = require('discord.js');
const UserModel = require('../../models/User');
const User = require('../../models/User');

module.exports = {
  name: 'balance',
  description: 'Affiche votre solde en R4V3 et M4T3R',
  async execute(message, args) {
    try {
      let user = await User.findOne({ userId: message.author.id });
      if (!user) {
        user = new User({ userId: message.author.id, balance: 0 });
        await user.save();
      }

      const r4v3 = Math.floor(user.balance);
      const m4t3r = Math.floor((user.balance - r4v3) * 100);

      message.reply(`Votre solde : ${r4v3} R4V3 et ${m4t3r} M4T3R`);
    } catch (error) {
      console.error('Erreur:', error);
      message.reply("Une erreur s'est produite.");
    }
  },
};

module.exports = {
    name: 'balance',
    description: 'Affiche votre solde en R4V3 et M4T3R',
    async execute(message, args) {
        try {
            let user = await UserModel.findOne({ userId: message.author.id });
            if (!user) {
                user = new UserModel({ userId: message.author.id, balance: 0 });
                await user.save();
            }

            const r4v3 = Math.floor(user.balance);
            const m4t3r = Math.floor((user.balance - r4v3) * 100);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Solde')
                .setDescription(`Voici votre solde, ${message.author.username}:`)
                .addFields(
                    { name: 'R4V3', value: `${r4v3}`, inline: true },
                    { name: 'M4T3R', value: `${m4t3r}`, inline: true }
                )
                .setFooter({ text: '1 R4V3 = 100 M4T3R' });

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération du solde:', error);
            message.reply("Une erreur s'est produite lors de la récupération de votre solde.");
        }
    },
};
