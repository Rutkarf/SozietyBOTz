const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    skills: {
        communication: { type: Number, default: 1 },
        participation: { type: Number, default: 1 },
        leadership: { type: Number, default: 1 },
        creativity: { type: Number, default: 1 }
    },
    equippedNFT: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT', default: null }
});

// Calcul de la puissance totale du personnage
CharacterSchema.virtual('power').get(function() {
    return Object.values(this.skills).reduce((a, b) => a + b, 0);
});

// Méthode pour gagner de l'expérience
CharacterSchema.methods.gainExperience = async function(amount) {
    this.experience += amount;
    if (this.experience >= this.level * 100) {
        this.level += 1;
        this.experience = 0;
        // Augmenter une compétence aléatoire
        const skills = Object.keys(this.skills);
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        this.skills[randomSkill] += 1;
    }
    await this.save();
};

module.exports = mongoose.model('Character', CharacterSchema);
