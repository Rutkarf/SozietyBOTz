const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    lastWorked: { type: Date, default: null },
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NFT'
    }]
});

// Conversion R4V3 en M4T3R
UserSchema.virtual('balanceM4T3R').get(function() {
    return Math.floor(this.balance * 100000000000000);
});

module.exports = mongoose.model('User', UserSchema);

