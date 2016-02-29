
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

var errorAdapter = functions_module.error_adapter;


var validateAccount = function (data, callback) {
  var user = data.user;
  async.parallel({
      username: function(callback) {
          setTimeout(function(){
            var username = new models.Username({username: data.username.trim().toLowerCase()});
            username.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, 200);
      },
      email: function(callback) {
          setTimeout(function(){
            var email = new models.Email({email: data.email.trim().toLowerCase()});
            email.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, 200);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            var appraisement = new models.Appraisement({_user: user._id});
            appraisement.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, 200);
      },
      messenger: function(callback) {
          setTimeout(function(){
            var messenger = new models.Messenger({_user: user._id});
            messenger.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, 200);
      },      
      country: function(callback) {
          setTimeout(function(){
              models.Country.findOne({code: data.countryCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Country.modelName, err), docs: doc});
              })
          }, 200);
      },
      language: function(callback) {
          setTimeout(function(){
              models.Language.findOne({code: data.languageCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Language.modelName, err), docs: doc});
              })
          }, 200);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.country.errors;
    errors += results.language.errors;
    //----------------------------------

    user._username = results.username._id;
    user._email = results.email._id;
    user._nationality = results.country._id;
    user._nativeLanguage = results.language._id;
    user.sex = data.sexVal > '0';
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.password = data.password;
    user.description = "";
    user._appraisement = results.appraisement._id;
    user._messenger = results.messenger._id;
    
    //localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
    //localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/banana
    errors += errorAdapter(models.User.modelName, user.validateSync());

    username = results.username;
    email = results.email;
    appraisement = results.appraisement;
    messenger = results.messenger;

    var output = {
            errors: errors,
            username: username.doc,
            email: email.doc,
            appraisement: appraisement.doc,
            messenger: messenger.doc,
            user: user
          };
    callback(output);
  });
}

var saveAccount = function (data, callback) {
  var user = data.user;
  var username = data.username;
  var email = data.email;
  var appraisement = data.appraisement;
  var messenger = data.messenger;

  async.parallel({
      username: function(callback) {
          setTimeout(function(){
            username.save(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, 200);
      },
      email: function(callback) {
          setTimeout(function(){
            email.save(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, 200);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            appraisement.save(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, 200);
      },
      messenger: function(callback) {
          setTimeout(function(){
            messenger.save(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, 200);
      },
      user: function(callback) {
          setTimeout(function(){
            user.save(function (err) {
                callback(null, {errors: errorAdapter(models.User.modelName, err), doc: user})
            });
          }, 200);
      },
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.user.errors;
    //----------------------------------
    
    //localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
    //localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/banana
    var output = {
            errors: errors
          };
    callback(output);
  });
}
//---------------------------------------------

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
  validateAccount(data, function (output) {
    if (output.errors)
    {
      return res.send({errors: output.errors});
    }
    else
    {
      var data = {user: output.user,
                  username: output.username,
                  email: output.email,
                  appraisement: output.appraisement,
                  messenger: output.messenger};
      // Save
      // --------------------
      saveAccount(data, function (output) {
        return res.send(output);
      });
      // --------------------
    }
  });
  /*
  async.parallel({
      username: function(callback) {
          setTimeout(function(){
            var username = new models.Username({username: req.params.username.trim().toLowerCase()});
            username.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, 200);
      },
      email: function(callback) {
          setTimeout(function(){
            var email = new models.Email({email: req.params.email.trim().toLowerCase()});
            email.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, 200);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            var appraisement = new models.Appraisement({_user: user._id});
            appraisement.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, 200);
      },
      messenger: function(callback) {
          setTimeout(function(){
            var messenger = new models.Messenger({_user: user._id});
            messenger.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, 200);
      },      
      country: function(callback) {
          setTimeout(function(){
              models.Country.findOne({code: req.params.countryCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Country.modelName, err), docs: doc});
              })
          }, 200);
      },
      language: function(callback) {
          setTimeout(function(){
              models.Language.findOne({code: req.params.languageCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Language.modelName, err), docs: doc});
              })
          }, 200);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.country.errors;
    errors += results.language.errors;
    //----------------------------------

    user._username = results.username._id;
    user._email = results.email._id;
    user._nationality = results.country._id;
    user._nativeLanguage = results.language._id;
    user.sex = req.params.sexVal > '0';
    user.firstName = req.params.firstName;
    user.lastName = req.params.lastName;
    user.password = req.params.password;
    user.description = "";
    user._appraisement = results.appraisement._id;
    user._messenger = results.messenger._id;
    
    //localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
    //localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/banana
    errors += errorAdapter(models.User.modelName, user.validateSync());

    username = results.username;
    email = results.email;
    appraisement = results.appraisement;
    messenger = results.messenger;

    console.log(errors);
    return res.send({errors: errors});
  });
  */
});

/*
    async.parallel({
      username: function(callback) {
          setTimeout(function(){
            username.save(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, 200);
      },
      email: function(callback) {
          setTimeout(function(){
            email.save(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, 200);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            appraisement.save(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, 200);
      },
      messenger: function(callback) {
          setTimeout(function(){
            messenger.save(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, 200);
      },
      user: function(callback) {
          setTimeout(function(){
            
            //user.save(function (err) {
            //    callback(null, {errors: errorAdapter(models.User.modelName, err), doc: user})
            //});
            
          }, 200);
      }
    },
    function(err, results) {
      //----------------------------------
      // Si hay un error devolver error
      errors += results.username.errors;
      errors += results.email.errors;
      errors += results.appraisement.errors;
      errors += results.messenger.errors;
      errors += results.user.errors;
      //----------------------------------
      return res.send({errors: errors});
    });
    */

//---------------------------------------------

module.exports = router;




