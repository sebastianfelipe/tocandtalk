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
//var mAux = require('./aux.js');
var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var validateAccount = mAux.validateAccount;
var saveAccount = mAux.saveAccount;
var sendMail = functions_module.sendMail;

//localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:nativeLanguageCode/:sexVal/:password/:passwordConfirmation
//localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/1/banana/banana
//localhost:4080/api/save/account/juanito/juanito@tocandtalk.com/juanito/bandolero/us/it/1/banana/banana
//localhost:4080/api/save/account/feliponcio/feliponcio@tocandtalk.com/feliponcio/bandolero/us/it/1/banana/banana

//router.get('/account/:username/:email/:firstName/:lastName/:countryCode/:nativeLanguageCode/:sexVal/:password/:passwordConfirmation', function (req, res) {
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
          //sendMail(output.email);
          //console.log('The user is');
          //console.log(output);
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
router.post('/user/spokenLanguage', authenticate, function (req, res) {
  var username = req.session.username;
  var code = req.body.code;

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
      if (user.spokenLanguages.indexOf(language._id) == -1)
      {
        user.spokenLanguages.push(language._id);
        user.save(function (err) {
          if (err) { errors +='eDBUpdate' }
          user.populate('spokenLanguages', function (err, doc) {
            return res.send({errors: errorAdapter(models.User.modelName, err), doc: doc.spokenLanguages});
          });
        });
      }
      else
      {
        errors += 'eUserSpokenLanguagesUnique'
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
  var username = req.session.username;
  var code = req.body.code;

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
          user.populate('interestLanguages', function (err, doc) {
            return res.send({errors: errorAdapter(models.User.modelName, err), doc: doc.interestLanguages});
          });
        });

      }
      else
      {
        errors += 'eUserInterestLanguagesUnique'
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




