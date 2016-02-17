var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')(passport);

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports

console.log(passport.authenticate('facebook'));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;