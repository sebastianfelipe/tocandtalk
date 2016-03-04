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
var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var validateAccount = mAux.validateAccount;
var saveAccount = mAux.saveAccount;

//localhost:4080/api/save/user/spokenLanguage/:username/:code
//localhost:4080/api/save/user/spokenLanguage/pedrito/it
//localhost:4080/api/save/user/spokenLanguage/pedrito/fr
router.post('/user/spokenLanguage', authenticate, function (req, res) {
  var id = req.session._id;
  var code = req.body.code;

    async.parallel({
        user: function(callback) {
            setTimeout(function(){
                models.User
                .findOne({_id: id})
                .deepPopulate('_user')
                .exec(function (err, doc) {
                  callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: doc});

                })
            }, 200)
        },
        language: function(callback) {
          setTimeout(function(){
              models.Language.findOne({code: code}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Language.modelName, err), doc: doc});
              })
          }, 200);
      },
  },
  function(err, results) {
    var user = results.user.doc;
    var language = results.language.doc;
  var errors = "";
  errors += results.user.errors;
  errors += results.language.errors;
    if (user && language)
    {
      var spokenLanguageId = user.spokenLanguages.indexOf(language._id);
      if (spokenLanguageId > -1)
      {
        user.spokenLanguages.splice(spokenLanguageId, 1);

        //return res.send({errors: errors, doc: user});
        user.save(function (err) {
          if (err) { errors +='eDBUpdate' }
          user.populate('spokenLanguages', function (err, doc) {
            return res.send({errors: errorAdapter(models.User.modelName, err), doc: doc.spokenLanguages});
          });
        });
      }
      else
      {
        errors += 'eUserSpokenLanguagesNotFound'
        return res.send({errors: errors, doc: null});
      }
  }
  else
  {
    errors += 'eDBNotFound'
    return res.send({errors: errors, doc: null});
  }
  });
});

//localhost:4080/api/save/user/interestLanguage/:username/:code
//localhost:4080/api/save/user/interestLanguage/pedrito/it
//localhost:4080/api/save/user/interestLanguage/pedrito/fr
router.post('/user/interestLanguage', authenticate, function (req, res) {
  var id = req.session._id;
  var code = req.body.code;

    async.parallel({
        user: function(callback) {
            setTimeout(function(){
                models.User
                .findOne({_id: id})
                .deepPopulate('_user')
                .exec(function (err, doc) {
                  callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: doc});

                })
            }, 200)
        },
        language: function(callback) {
          setTimeout(function(){
              models.Language.findOne({code: code}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Language.modelName, err), doc: doc});
              })
          }, 200);
      },
  },
  function(err, results) {
    var user = results.user.doc;
    var language = results.language.doc;
  var errors = "";
  errors += results.user.errors;
  errors += results.language.errors;
    if (user && language)
    {
      var interestLanguageId = user.interestLanguages.indexOf(language._id);
      if (interestLanguageId > -1)
      {
        user.interestLanguages.splice(interestLanguageId, 1);

        //return res.send({errors: errors, doc: user});
        user.save(function (err) {
          if (err) { errors +='eDBUpdate' }
          user.populate('interestLanguages', function (err, doc) {
            return res.send({errors: errorAdapter(models.User.modelName, err), doc: doc.interestLanguages});
          });
        });
      }
      else
      {
        errors += 'eUserInterestLanguagesNotFound'
        return res.send({errors: errors, doc: null});
      }
  }
  else
  {
    errors += 'eDBNotFound'
    return res.send({errors: errors, doc: null});
  }
  });
});

module.exports = router;

