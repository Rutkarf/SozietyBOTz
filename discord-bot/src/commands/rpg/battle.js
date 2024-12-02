const mongoose = require('mongoose');
const User = require('../../models/User');
const Character = require('./character');
const NFT = require('./inventory');

module.exports = {
  name: 'battle',
  description: 'Défiez un autre utilisateur en combat',
  async execute(message, args) {
    if (!args[0]) return message.reply("Veuillez mentionner l'utilisateur que vous souhaitez défier.");
    const opponent = message.mentions.users.first();
    if (!opponent) return message.reply("Utilisateur non trouvé.");
    if (opponent.id === message.author.id) return message.reply("Vous ne pouvez pas vous défier vous-même.");

    const bet = parseInt(args[1]);
    if (isNaN(bet) || bet <= 0) return message.reply("Veuillez spécifier un montant valide à parier en M4T3R.");

    try {
      const player1 = await Character.findOne({ userId: message.author.id });
      const player2 = await Character.findOne({ userId: opponent.id });

      if (!player1 || !player2) return message.reply("L'un des joueurs n'a pas de personnage.");

      const user1 = await User.findOne({ userId: message.author.id });
      const user2 = await User.findOne({ userId: opponent.id });

      if (user1.balance < bet * 0.000000000000001 || user2.balance < bet * 0.000000000000001) {
        return message.reply("L'un des joueurs n'a pas assez de R4V3 pour ce pari.");
      }

      const nfts1 = await NFT.find({ userId: message.author.id });
      const nfts2 = await NFT.find({ userId: opponent.id });

      const calculatePower = (character, nfts) => {
        let power = Object.values(character.skills).reduce((a, b) => a + b, 0);
        nfts.forEach(nft => {
          power += Object.values(nft.stats).reduce((a, b) => a + b, 0);
        });
        return power;
      };

      const power1 = calculatePower(player1, nfts1);
      const power2 = calculatePower(player2, nfts2);

      const winner = power1 > power2 ? message.author : opponent;
      const loser = winner.id === message.author.id ? opponent : message.author;

      user1.balance -= bet * 0.000000000000001;
      user2.balance -= bet * 0.000000000000001;
      if (winner.id === message.author.id) {
        user1.balance += bet * 0.000000000000002;
      } else {
        user2.balance += bet * 0.000000000000002;
      }

      await user1.save();
      await user2.save();

      message.channel.send(`${winner} a remporté le combat contre ${loser} et gagné ${bet} M4T3R !`);
    } catch (error) {
      console.error('Erreur:', error);
      message.reply("Une erreur s'est produite lors du combat.");
    }
  }
};
