var express = require('express');
var router = express.Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

var authenticate = authenticate_module.authenticate;
var setPageLang = functions_module.setPageLang;
router.get('/', authenticate, setPageLang, function (req, res) {
  	 return res.render('home/index.html', {forceType: "desktop", lang: req.session.meta.lang.code, errors: ""});
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;