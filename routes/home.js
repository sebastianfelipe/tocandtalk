var express = require('express');
var router = express.Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;

router.get('/', authenticate, function (req, res) {
  	 return res.render('home/index.html', {forceType: "desktop", errors: ""});
});

module.exports = router;