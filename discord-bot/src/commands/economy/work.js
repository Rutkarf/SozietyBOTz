const UserModel = require('../../models/User');

module.exports = {
    name: 'work',
    description: 'Travailler pour gagner des R4V3',
    async execute(message, args) {
        try {
            let user = await UserModel.findOne({ userId: message.author.id });
            if (!user) {
                user = new UserModel({ userId: message.author.id, balance: 0 });
            }

            const earnedAmount = Math.random() * (5 - 0.5) + 0.5;
            user.balance += earnedAmount;
            await user.save();

            const r4v3 = Math.floor(earnedAmount);
            const m4t3r = Math.floor((earnedAmount - r4v3) * 100);

            message.reply(`Vous avez travaillé dur et gagné ${r4v3} R4V3 et ${m4t3r} M4T3R!`);
        } catch (error) {
            console.error('Erreur lors du travail:', error);
            message.reply("Une erreur s'est produite lors de votre travail.");
        }
    },
};
