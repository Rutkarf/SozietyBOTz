const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(config.mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
            console.log('Connecté à la base de données MongoDB');
        } catch (error) {
            console.error('Erreur de connexion à la base de données:', error);
            process.exit(1);
        }
    },

    close: async () => {
        try {
            await mongoose.connection.close();
            console.log('Connexion à la base de données fermée');
        } catch (error) {
            console.error('Erreur lors de la fermeture de la connexion:', error);
        }
    }
};
