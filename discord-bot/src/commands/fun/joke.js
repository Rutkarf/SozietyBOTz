const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Raconte une blague aléatoire',
    async execute(message, args) {
        try {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any?lang=fr');
            const joke = response.data;

            if (joke.type === 'single') {
                message.channel.send(joke.joke);
            } else if (joke.type === 'twopart') {
                message.channel.send(joke.setup);
                setTimeout(() => {
                    message.channel.send(joke.delivery);
                }, 5000); // Attendre 5 secondes avant d'envoyer la chute
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la blague:', error);
            message.reply("Désolé, je n'ai pas réussi à trouver une blague pour le moment.");
        }
    },
};
