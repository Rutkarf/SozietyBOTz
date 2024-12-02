module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Connecté en tant que ${client.user.tag}`);
        client.user.setActivity('vous aider', { type: 'PLAYING' });
    },
};
