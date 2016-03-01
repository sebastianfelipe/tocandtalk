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

//localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
//localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/1/banana
//localhost:4080/api/save/account/juanito/juanito@tocandtalk.com/juanito/bandolero/us/it/1/banana
//localhost:4080/api/save/account/feliponcio/feliponcio@tocandtalk.com/feliponcio/bandolero/us/it/1/banana
router.post('/account', function (req, res) {
  var user = new models.User();
  var data = {
              username: req.body.username.trim().toLowerCase(),
              email: req.body.email.trim().toLowerCase(),
              firstName: req.body.firstName.trim().toLowerCase(),
              lastName: req.body.lastName.trim().toLowerCase(),
              countryCode: req.body.countryCode.trim().toLowerCase(),
              languageCode: req.body.nativeLanguageCode.trim().toLowerCase(),
              sexVal: req.body.sexVal,
              password: req.body.password,
              passwordConfirmation: req.body.passwordConfirmation,
              user: user
            };
  console.log(req.body);
  console.log(data);
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
        if (!errors)
        {
          req.session.username = output.username.username;
        }
        return res.send({errors: errors});
      });
      // --------------------
    }
  });
});

//localhost:4080/api/save/user/spokenLanguage/:username/:code
//localhost:4080/api/save/user/spokenLanguage/pedrito/it
//localhost:4080/api/save/user/spokenLanguage/pedrito/fr
router.get('/user/spokenLanguage/:username/:code',function (req, res) {
  var username = req.params.username;
  var code = req.params.code;

    async.parallel({
        user: function(callback) {
            setTimeout(function(){
                models.Username
                .findOne({username: username})
                .deepPopulate('_user')
                .exec(function (err, doc) {
                  /*
                    doc.nationality = req.body.s_country;
                    doc.save(function (err) {
                      var errors_tmp = error_adapter(models.Username.modelName, err);
                   */
                  var obj = null;
                  if (doc) { obj = doc._user; }
                  callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: obj});

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
      if (user.spokenLanguages.indexOf(language._id) == -1)
      {
        user.spokenLanguages.push(language._id);
        user.save(function (err) {
          if (err) { errors +='eDBUpdate' }
          return res.send({errors: errors});
        });
      }
      else
      {
        return res.send({errors: errors});
      }
  }
  else
  {
    errors += 'eDBNotFound'
    return res.send({errors: errors})
  }
  });
});

//localhost:4080/api/save/user/interestLanguage/:username/:code
//localhost:4080/api/save/user/interestLanguage/pedrito/it
//localhost:4080/api/save/user/interestLanguage/pedrito/fr
router.get('/user/interestLanguage/:username/:code',function (req, res) {
  var username = req.params.username;
  var code = req.params.code;

    async.parallel({
        user: function(callback) {
            setTimeout(function(){
                models.Username
                .findOne({username: username})
                .deepPopulate('_user')
                .exec(function (err, doc) {
                  var obj = null;
                  if (doc) { obj = doc._user; }
                  callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: obj});

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
      if (user.interestLanguages.indexOf(language._id) == -1)
      {
        user.interestLanguages.push(language._id);
        user.save(function (err) {
          if (err) { errors +='eDBUpdate' }
          return res.send({errors: errors});
        });
      }
      else
      {
        return res.send({errors: errors});
      }
  }
  else
  {
    errors += 'eDBNotFound'
    return res.send({errors: errors})
  }
  });
});

module.exports = router;




