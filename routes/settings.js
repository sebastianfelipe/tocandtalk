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
var setPageLang = functions_module.setPageLang;
// Shared Variables

router.get('/', authenticate, setPageLang, function (req, res) {
    return res.render('settings/index.html', {forceType: "desktop", lang: req.session.meta.lang.code, errors: ""});
});

module.exports = router;