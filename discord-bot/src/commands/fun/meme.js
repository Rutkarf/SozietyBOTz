const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Affiche un meme aléatoire',
    async execute(message, args) {
        try {
            const response = await axios.get('https://meme-api.com/gimme');
            const memeData = response.data;

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(memeData.title)
                .setURL(memeData.postLink)
                .setImage(memeData.url)
                .setFooter({ text: `👍 ${memeData.ups} | Subreddit: r/${memeData.subreddit}` });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération du meme:', error);
            message.reply("Désolé, je n'ai pas réussi à trouver un meme pour le moment.");
        }
    },
};
