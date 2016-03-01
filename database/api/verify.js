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

//localhost:4080/api/auth/:username/:password
//localhost:4080/api/auth/feliponcio/banana
router.get('/email/:email/:code', function (req, res) {
  var email = req.params.email;
  var code = req.params.code;

  async.parallel({
      email: function(callback) {
          setTimeout(function(){
              models.Email.findOne({email: email}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: doc});
              })
          }, 200);
      }
  },
  function(err, results) {
      var email = results.email.doc;
      var errors = "";
      errors += results.email.errors;

      if (email)
      {
        email.verified = true;
        email.save(function (err) {
          if (err) { errors += "eDBUpdate"; }
          return res.send({errors: errors});
        });
      }
      else
      {
        errors += 'eDBNotFound'
        return res.send({errors: errors})
      }
  });
});

module.exports = router;




