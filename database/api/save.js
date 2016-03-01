var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');
var db = require('../configuration.js');
var schema = require('../schema.js');
var models = require('../models.js');

// Module Imports
var authenticate_module = require('../../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;
var functions_module = require('../../modules/functions.js');
var mAux = require('./aux.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var validateAccount = mAux.validateAccount;
var saveAccount = mAux.saveAccount;

//localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
//localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/1/banana
//localhost:4080/api/save/account/juanito/juanito@tocandtalk.com/juanito/bandolero/us/it/1/banana
//localhost:4080/api/save/account/feliponcio/feliponcio@tocandtalk.com/feliponcio/bandolero/us/it/1/banana
router.get('/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password', function (req, res) {
  var user = new models.User();
  var data = {
              username: req.params.username,
              email: req.params.email,
              firstName: req.params.firstName,
              lastName: req.params.lastName,
              countryCode: req.params.countryCode,
              languageCode: req.params.languageCode,
              sexVal: req.params.sexVal,
              password: req.params.password,
              user: user
            };
  validateAccount(data, function (errors, output) {
    if (errors)
    {
      return res.send({errors: errors});
    }
    else
    {
      var data = {
                  user: output.user,
                  username: output.username,
                  email: output.email,
                  appraisement: output.appraisement,
                  messenger: output.messenger,
                  password: output.password
                 };
      // Save
      // --------------------
      saveAccount(data, function (errors, output) {
        return res.send({errors: errors});
      });
      // --------------------
    }
  });
});

module.exports = router;




