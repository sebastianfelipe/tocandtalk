var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

//var models = require('../database/models.js').models;

//var bd = {};
//bd.user = [];

// Module Imports
var global = require('../modules/global.js');
var validation_module = require('../modules/validations.js');
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

// Function Imports
var authenticateRegister = authenticate_module.authenticateRegister;
var error_adapter = functions_module.error_adapter;
var authenticateUser = functions_module.authenticateUser;
var setPageLang = functions_module.setPageLang;

router.get('/', authenticateRegister, setPageLang, function (req, res) {
    return res.render('register/index.html', {forceType: "desktop", errors: "", lang: req.session.meta.lang});
});

module.exports = router;