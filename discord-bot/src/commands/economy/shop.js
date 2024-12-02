const { EmbedBuilder } = require('discord.js');
const UserModel = require('../../models/User');

const shopItems = [
    { name: 'Café', price: 2.5, description: 'Un bon café pour bien commencer la journée' },
    { name: 'Sandwich', price: 5, description: 'Un sandwich délicieux pour le déjeuner' },
    { name: 'Livre', price: 15, description: 'Un livre passionnant pour se divertir' }
];

module.exports = {
    name: 'shop',
    description: 'Affiche le magasin ou permet d\'acheter un article',
    async execute(message, args) {
        if (!args.length) {
            // Afficher le magasin
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Magasin')
                .setDescription('Voici les articles disponibles:');

            shopItems.forEach(item => {
                embed.addFields({ name: item.name, value: `${item.price} R4V3 - ${item.description}` });
            });

            message.channel.send({ embeds: [embed] });
        } else {
            // Acheter un article
            const itemName = args.join(' ');
            const item = shopItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());

            if (!item) {
                return message.reply("Cet article n'existe pas dans le magasin.");
            }

            let user = await UserModel.findOne({ userId: message.author.id });
            if (!user) {
                user = new UserModel({ userId: message.author.id, balance: 0 });
            }

            if (user.balance < item.price) {
                return message.reply("Vous n'avez pas assez de R4V3 pour acheter cet article.");
            }

            user.balance -= item.price;
            await user.save();

            message.reply(`Vous avez acheté ${item.name} pour ${item.price} R4V3. Il vous reste ${user.balance.toFixed(2)} R4V3.`);
        }
    },
};
