const mongoose = require('mongoose');
const User = require('../../models/User');

const CharacterSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  skills: {
    communication: { type: Number, default: 1 },
    participation: { type: Number, default: 1 },
    leadership: { type: Number, default: 1 },
    creativity: { type: Number, default: 1 }
  }
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = {
  name: 'character',
  description: 'Affiche ou crée votre personnage',
  async execute(message, args) {
    try {
      let character = await Character.findOne({ userId: message.author.id });
      if (!character) {
        character = new Character({ userId: message.author.id });
        await character.save();
      }

      const embed = {
        color: 0x0099ff,
        title: `Personnage de ${message.author.username}`,
        fields: [
          { name: 'Niveau', value: character.level.toString(), inline: true },
          { name: 'Expérience', value: character.experience.toString(), inline: true },
          { name: 'Communication', value: character.skills.communication.toString(), inline: true },
          { name: 'Participation', value: character.skills.participation.toString(), inline: true },
          { name: 'Leadership', value: character.skills.leadership.toString(), inline: true },
          { name: 'Créativité', value: character.skills.creativity.toString(), inline: true }
        ]
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur:', error);
      message.reply("Une erreur s'est produite lors de la récupération de votre personnage.");
    }
  }
};
