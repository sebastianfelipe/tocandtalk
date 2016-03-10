var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

var authenticate = authenticate_module.authenticate;
var error_adapter = functions_module.error_adapter;

router.get('/', function (req, res) {
	var errors = "";
	var lang = "es";
	if (req.session.meta)
	{
		var lang = req.session.meta.lang || lang;
	}
	
	if (req.session.user)
	{
		if (req.session.user._id)
		{
			return res.redirect('/');
		}
	}
	
	return res.render('login/index.html', {forceType: "desktop", errors: errors, lang: lang});
});

module.exports = router;