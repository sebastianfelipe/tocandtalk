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
var setPageLang = functions_module.setPageLang;
//var access = functions_module.access;

router.get('/', setPageLang, function (req, res) {
	if (req.session.user)
	{
		if (req.session.user._id)
		{
			return res.redirect('/');
		}
	}
	return res.render('login/index.html', {forceType: "desktop", errors: "", lang: req.session.meta.lang.code});
});

module.exports = router;