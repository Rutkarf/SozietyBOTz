const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const path = require('path');
const config = require('../config');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Configuration de la session
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

// Configuration de Passport
passport.use(new DiscordStrategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    // Ici, vous pouvez sauvegarder ou récupérer l'utilisateur dans votre base de données
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(passport.initialize());
app.use(passport.session());

// Configuration des vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Page d'accueil
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dashboard running on port ${PORT}`));
