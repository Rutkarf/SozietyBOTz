const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Guild = require('../../models/Guild');
const Character = require('../../models/Character');

// Middleware pour vérifier si l'utilisateur est authentifié
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/discord');
}

// Dashboard principal
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const users = await User.countDocuments();
        const guilds = await Guild.countDocuments();
        const characters = await Character.countDocuments();

        res.render('dashboard', {
            user: req.user,
            stats: { users, guilds, characters }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// Gestion des utilisateurs
router.get('/users', isAuthenticated, async (req, res) => {
    try {
        const users = await User.find().limit(100);
        res.render('users', { user: req.user, users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// Gestion des serveurs
router.get('/guilds', isAuthenticated, async (req, res) => {
    try {
        const guilds = await Guild.find().limit(100);
        res.render('guilds', { user: req.user, guilds });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

// Gestion des personnages
router.get('/characters', isAuthenticated, async (req, res) => {
    try {
        const characters = await Character.find().limit(100);
        res.render('characters', { user: req.user, characters });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
