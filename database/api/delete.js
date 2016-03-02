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
  var username = req.session.username;
  var code = req.body.code;

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
  var username = req.session.username;
  var code = req.body.code;

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









//localhost:4080/api/delete/user/spokenLanguage/:username/:code
//localhost:4080/api/delete/user/spokenLanguage/pedrito/it
//localhost:4080/api/delete/user/spokenLanguage/pedrito/fr
/*
router.get('/user/spokenLanguage/:username/:code', function (req, res) {
  var username = req.session.useraname;
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
      var spokenLanguageId = user.spokenLanguages.indexOf(language._id);
      if (spokenLanguageId > -1)
      {
        user.spokenLanguages.splice(spokenLanguageId, 1);
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
*/

//localhost:4080/api/delete/user/interestLanguage/:username/:code
//localhost:4080/api/delete/user/interestLanguage/pedrito/it
//localhost:4080/api/delete/user/interestLanguage/pedrito/fr
/*
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
      var interestLanguageId = user.interestLanguages.indexOf(language._id);
      if (interestLanguageId > -1)
      {
        user.interestLanguages.splice(interestLanguageId, 1);
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
*/

module.exports = router;

