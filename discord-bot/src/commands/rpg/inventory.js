const mongoose = require('mongoose');
const User = require('../../models/User');

const NFTSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'], default: 'Common' },
  stats: {
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    speed: { type: Number, default: 0 }
  }
});

const NFT = mongoose.model('NFT', NFTSchema);

module.exports = {
  name: 'inventory',
  description: 'Affiche votre inventaire NFT',
  async execute(message, args) {
    try {
      const nfts = await NFT.find({ userId: message.author.id });

      if (nfts.length === 0) {
        return message.reply("Vous n'avez pas encore de NFT dans votre inventaire.");
      }

      const embed = {
        color: 0x0099ff,
        title: `Inventaire NFT de ${message.author.username}`,
        fields: nfts.map(nft => ({
          name: `${nft.name} (${nft.rarity})`,
          value: `ATK: ${nft.stats.attack} | DEF: ${nft.stats.defense} | SPD: ${nft.stats.speed}`,
          inline: true
        }))
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur:', error);
      message.reply("Une erreur s'est produite lors de la récupération de votre inventaire.");
    }
  }
};
