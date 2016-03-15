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
var global_module = require('../../modules/global.js');
var encrypt_module = require('./encrypt.js');
//var mAux = require('./aux.js');
var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var authenticateUser = functions_module.authenticateUser;
var validateAccount = mAux.validateAccount;
var saveAccount = mAux.saveAccount;
var validateClassicAccount = mAux.validateClassicAccount;
var saveClassicAccount = mAux.saveClassicAccount;
var sendMail = functions_module.sendMail;
var DEFAULT_LANGUAGE = global_module.DEFAULT_LANGUAGE;
var setPageLang = functions_module.setPageLang;

var createCode = functions_module.createCode;
var hashPassword = encrypt_module.hashPassword;
//localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:nativeLanguageCode/:sexVal/:password/:passwordConfirmation
//localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/1/banana/banana
//localhost:4080/api/save/account/juanito/juanito@tocandtalk.com/juanito/bandolero/us/it/1/banana/banana
//localhost:4080/api/save/account/feliponcio/feliponcio@tocandtalk.com/feliponcio/bandolero/us/it/1/banana/banana

//router.get('/account/:username/:email/:firstName/:lastName/:countryCode/:nativeLanguageCode/:sexVal/:password/:passwordConfirmation', function (req, res) {
//router.get('/account/classic/:username/:email/:firstName/:lastName/:countryCode/:nativeLanguageCode/:sexVal/:password/:passwordConfirmation', function (req, res) {
//localhost:4080/api/save/account/classic/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/1/banana/banana
router.post('/account/classic', setPageLang, function (req, res) {
    var data = {};
    data.username = req.body.username.trim().toLowerCase();
    data.email = req.body.email.trim().toLowerCase();
    data.firstName = req.body.firstName.trim().toLowerCase();
    data.lastName = req.body.lastName.trim().toLowerCase();
    data.password = req.body.password;
    data.passwordConfirmation = req.body.passwordConfirmation;
    data.encryptedPassword = hashPassword(data.password);
    data.emailCode = createCode();
    data.lang = req.session.meta.lang;

    // Object Creation
    var user = new models.User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user._lang = data.lang._id;

    var username = new models.Username();
    username._user = user._id;
    username.username = data.username;

    var email = new models.Email();
    email._user = user._id;
    email.email = data.email;
    email.code = data.emailCode;
    email.verified = false;

    var password = new models.Password();
    password._user = user._id;
    password.password = data.encryptedPassword.hash;
    password.salt = data.encryptedPassword.salt;

    var appraisement = new models.Appraisement();
    appraisement._user = user._id;
    appraisement.mean = 0;

    var messenger = new models.Messenger();
    messenger._user = user._id;

    var friendship = new models.Friendship();
    friendship._user = user._id;

    var auth = new models.Auth();
    auth._user = user._id;
    auth.classic = {};
    auth.classic._username = username._id;
    auth.classic._email = email._id;
    auth.classic._password = password._id;

    user._appraisement = appraisement._id;
    user._messenger = messenger._id;
    user._friendship = friendship._id;
    user._auth = auth._id;

    // Validation
    // ------------
    var errors = "";
    errors += errorAdapter(models.User.modelName, user.validateSync());
    errors += errorAdapter(models.Username.modelName, username.validateSync());
    errors += errorAdapter(models.Email.modelName, email.validateSync());
    errors += errorAdapter(models.Password.modelName, password.validateSync());
    errors += errorAdapter(models.Appraisement.modelName, appraisement.validateSync());
    errors += errorAdapter(models.Messenger.modelName, messenger.validateSync());
    errors += errorAdapter(models.Friendship.modelName, friendship.validateSync());
    errors += errorAdapter(models.Auth.modelName, auth.validateSync());

    if (data.password != data.passwordConfirmation)
    {
      errors += "ePasswordPasswordConfirmation;";
    }
    
    if (!errors)
    {
      var data = {};
      data.user = user;
      data.username = username;
      data.email = email;
      data.password = password;
      data.appraisement = appraisement;
      data.messenger = messenger;
      data.friendship = friendship;
      data.auth = auth;

      // Save
      // ------------
      saveClassicAccount(data, function (errors, output) {
          if (!errors)
          {
            output.user._lang = req.session.meta.lang;
            output.user.populate('_lang', function (err, doc) {
              authenticateUser(req, doc);
              output.user = doc;
              return res.send({errors: errors, output: output});
            });
          }
          else
          {
            return res.send({errors: errors, output: output});
          }
        });
   
    }
    else
    {
      return res.send({errors: errors});
    }
});

//localhost:4080/api/save/user/spokenLanguage/:username/:code
//localhost:4080/api/save/user/spokenLanguage/pedrito/it
//localhost:4080/api/save/user/spokenLanguage/pedrito/fr
router.post('/user/spokenLanguage', authenticate, function (req, res) {
  var id = req.session.user._id;
  var code = req.body.code;

    async.parallel({
        user: function(callback) {
            setTimeout(function(){
                models.User
                .findOne({_id: id})
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
      if (user.spokenLanguages.indexOf(language._id) == -1)
      {
        user.spokenLanguages.push(language._id);
        user.save(function (err) {
          if (err) { errors +='eDBUpdate' }
          user.populate('spokenLanguages', function (err, doc) {
            console.log('spokenLanguages');
            console.log(doc);
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
  var id = req.session.user._id;
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

//localhost:4080/api/save/appreciation/56dccd1d616cc7fd0758a614/56dccd1d616cc7fd0758a614/3/meencantooooo
router.get('/appreciation/:idUserA/:idUserB/:punctuation/:comment', function (req, res) {
    var idUserA = req.params.idUserA;
    var idUserB = req.params.idUserB;
    var punctuation = req.params.punctuation;
    var comment = req.params.comment.trim();

    console.log(req.params);
    async.parallel({
        appraisement: function(callback) {
            setTimeout(function(){
                models.User
                .findOne({_id: idUserB})
                .deepPopulate('_appraisement')
                .exec(function (err, doc) {
                  // Need to be validated
                  callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: doc._appraisement});

                });
            }, 200)
        },
        appreciation: function(callback) {
            setTimeout(function(){
                models.Appreciation
                .findOne({_userA: idUserA, _userB: idUserB})
                .exec(function (err, doc) {
                    callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: doc});                 
                });
            }, 200)
        }
  },
  function(err, results) {
    console.log(results);
    var errors = "";
    errors += results.appraisement.errors;
    errors += results.appreciation.errors;

    var appraisement = results.appraisement.doc;
    var appreciation = results.appreciation.doc;
    var exists = true;
    if (!errors)
    {
      if (!appreciation)
      {
        exists = false;
        appreciation = new models.Appreciation({_userA: idUserA, _userB: idUserB});
      }
      appreciation.punctuation = punctuation;
      appreciation.comment = comment;
      appreciation.save(function (err) {
        if (!err)
        {
          if (!exists)
          {
            appraisement.appreciations.push(appreciation._id);
            appraisement.save(function (err) {
              if (!err)
              {
                // Here we have to recalculate the mean
                return res.send({errors: errors});
              }
              else
              {
                errors += "eDBSave;";
                return res.send({errors: errors});
              }
            });
          }
          else
          {
            // Here we have to recalculate the mean

            return res.send({errors: errors});
          }
        }
        else
        {
          errors += "eDBSave;";
           return res.send({errors: errors});
        }
      });
    }
    else
    {
      errors += "eDBSave;";
      return res.send({errors: errors});
    }
  });
});

module.exports = router;




