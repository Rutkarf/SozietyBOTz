module.exports = {
    name: 'ping',
    description: 'Vérifie la latence du bot',
    execute(message, args) {
        message.channel.send('Calcul en cours...').then(sentMessage => {
            const latency = sentMessage.createdTimestamp - message.createdTimestamp;
            sentMessage.edit(`Pong! Latence: ${latency}ms. Latence API: ${Math.round(message.client.ws.ping)}ms`);
        });
    },
};
