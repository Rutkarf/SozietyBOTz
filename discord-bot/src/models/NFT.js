const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'], default: 'Common' },
    stats: {
        attack: { type: Number, default: 0 },
        defense: { type: Number, default: 0 },
        speed: { type: Number, default: 0 }
    },
    ownerId: { type: String, required: true }
});

module.exports = mongoose.model('NFT', NFTSchema);
