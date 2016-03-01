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
router.get('/:username/:password', function (req, res) {
  
  var username = req.params.username;
  var password = req.params.password;

  async.parallel({
      username: function(callback){
          setTimeout(function(){
            var errors = "";
              models.Username
              .findOne({username: username})
              .deepPopulate('_user._username _user._password')
              .exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.User.modelName, err), doc: doc});
              });
          }, 200);
      },
      email: function(callback){
          setTimeout(function(){
            var errors = "";
              models.Email
              .findOne({email: username})
              .deepPopulate('_user._username _user._password')
              .exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.User.modelName, err), doc: doc});
              });
          }, 200);
      }
  },
  function(err, results) {
      var errors = "";
      var doc = results.username.doc || results.email.doc;
      if (doc)
      {       
        if (doc._user._password.password == password)
        {
          req.session.username = doc._user._username.username;
        }
      }
      else
      {
        errors += "eUser;";
      }
      return res.send({errors: errors});
      //return res.req.res.redirect('/');
  });
});
module.exports = router;




