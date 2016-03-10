var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

// Functions
var authenticate = authenticate_module.authenticate;
var error_adapter = functions_module.error_adapter;

// Shared Variables

router.get('/', authenticate, function (req, res) {
	var lang = "es";
	if (req.session.meta)
	{
		var lang = req.session.meta.lang || lang;
	}
  	return res.render('profile/index.html', {forceType: "desktop", lang: lang, errors: ""});
});

module.exports = router;