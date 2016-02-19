var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')(passport);

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/perfil', failureRedirect: '/login' }));

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/perfil', failureRedirect: '/login' }));

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/perfil', failureRedirect: '/login' }));

module.exports = router;