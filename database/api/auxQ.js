var async = require('async');
var schema = require('../schema.js');
var models = require('../models.js');

// Module Imports
var functions_module = require('../../modules/functions.js');
var encrypt_module = require('./encrypt.js');

// Functions Imports
var errorAdapter = functions_module.error_adapter;
var createCode = functions_module.createCode;
var hashPassword = encrypt_module.hashPassword;

var validateAccount = function (data, callback) {
  var timeout = 200;
  var user = data.user;
  async.parallel({
      username: function(callback) {
          setTimeout(function(){
            var username = new models.Username({
                                                _user: user._id,
                                                username: data.username
                                              });
            username.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, timeout);
      },
      email: function(callback) {
          setTimeout(function(){
            var email = new models.Email({
                                                _user: user._id,
                                                email: data.email,
                                                code: createCode(),
                                                verified: false
                                              });
            email.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, timeout);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            var appraisement = new models.Appraisement({_user: user._id});
            appraisement.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, timeout);
      },
      messenger: function(callback) {
          setTimeout(function(){
            var messenger = new models.Messenger({_user: user._id});
            messenger.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, timeout);
      },
      password: function(callback) {
          setTimeout(function(){
            var encryptedPassword = hashPassword(data.password);
            var password = new models.Password({_user: user._id, password: encryptedPassword.hash, salt: encryptedPassword.salt});
            password.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Password.modelName, err), doc: password})
            });
          }, timeout);
      },
      country: function(callback) {
          setTimeout(function(){
              models.Country.findOne({code: data.countryCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Country.modelName, err), doc: doc});
              })
          }, timeout);
      },
      language: function(callback) {
          setTimeout(function(){
              models.Language.findOne({code: data.languageCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Language.modelName, err), doc: doc});
              })
          }, timeout);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.password.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.country.errors;
    errors += results.language.errors;
    //----------------------------------
    if (data.password != data.passwordConfirmation)
    {
      errors += "eUserPasswordConfirmation;"; 
    }
    // Worry but the error handling
    //-----------------------------------
    user._username = results.username.doc._id;
    user._email = results.email.doc._id;
    user._password = results.password.doc._id;
    user._nationality = results.country.doc._id;
    user._nativeLanguage = results.language.doc._id;
    user.sex = data.sexVal > '0';
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.description = "";
    user._appraisement = results.appraisement.doc._id;
    user._messenger = results.messenger.doc._id;
    //-----------------------------------

    //localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
    //localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/banana
    errors += errorAdapter(models.User.modelName, user.validateSync());

    var output = {
            username: results.username.doc,
            email: results.email.doc,
            password: results.password.doc,
            appraisement: results.appraisement.doc,
            messenger: results.messenger.doc,
            user: user
          };
    callback(errors, output);
  });
}

var saveAccount = function (data, callback) {
  var user = data.user;
  var username = data.username;
  var email = data.email;
  var appraisement = data.appraisement;
  var messenger = data.messenger;
  var password = data.password;

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
      password: function(callback) {
          setTimeout(function(){
            password.save(function (err) {
              //console.log("There is an error");
              //console.log(err);
                callback(null, {errors: errorAdapter(models.Password.modelName, err), doc: password})
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
    errors += results.password.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.user.errors;
    //----------------------------------
    
    var output = {
            username: results.username.doc,
            email: results.email.doc,
            password: results.password.doc,
            user: results.user.doc
          };
    callback(errors, output);
  });
}

var validateClassicAccount = function (data, callback) {
  var timeout = 200;
  var user = data.user;
  async.parallel({
      username: function(callback) {
          setTimeout(function(){
            var username = new models.Username({
                                                _user: user._id,
                                                username: data.username
                                              });
            username.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, timeout);
      },
      email: function(callback) {
          setTimeout(function(){
            var email = new models.Email({
                                                _user: user._id,
                                                email: data.email,
                                                code: createCode(),
                                                verified: false
                                              });
            email.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, timeout);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            var appraisement = new models.Appraisement({_user: user._id});
            appraisement.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, timeout);
      },
      messenger: function(callback) {
          setTimeout(function(){
            var messenger = new models.Messenger({_user: user._id});
            messenger.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, timeout);
      },
      password: function(callback) {
          setTimeout(function(){
            var encryptedPassword = hashPassword(data.password);
            var password = new models.Password({_user: user._id, password: encryptedPassword.hash, salt: encryptedPassword.salt});
            password.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Password.modelName, err), doc: password})
            });
          }, timeout);
      },
      country: function(callback) {
          setTimeout(function(){
              models.Country.findOne({code: data.countryCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Country.modelName, err), doc: doc});
              })
          }, timeout);
      },
      language: function(callback) {
          setTimeout(function(){
              models.Language.findOne({code: data.languageCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Language.modelName, err), doc: doc});
              })
          }, timeout);
      },
      auth: function(callback) {
          setTimeout(function(){
            var auth = new models.Auth({_user: user._id});
            auth.validate(function (err) {
                callback(null, {errors: errorAdapter(models.Auth.modelName, err), doc: auth})
            });
          }, timeout);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.password.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.country.errors;
    errors += results.language.errors;
    errors += results.auth.errors;
    //----------------------------------
    if (data.password != data.passwordConfirmation)
    {
      errors += "eUserPasswordConfirmation;"; 
    }
    // Worry but the error handling
    //-----------------------------------
    //user._username = results.username.doc._id;
    //user._email = results.email.doc._id;
    //user._password = results.password.doc._id;

    var auth = results.auth.doc;
    auth.classic = {};
    auth.classic._username = results.username.doc._id;
    auth.classic._email = results.email.doc._id;
    auth.classic._password = results.password.doc._id;

    user._nationality = results.country.doc._id;
    user._nativeLanguage = results.language.doc._id;
    user.sex = data.sexVal > '0';
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.description = "";
    user._appraisement = results.appraisement.doc._id;
    user._messenger = results.messenger.doc._id;
    user._auth = auth._id;
    //-----------------------------------

    //localhost:4080/api/save/account/:username/:email/:firstName/:lastName/:countryCode/:languageCode/:sexVal/:password
    //localhost:4080/api/save/account/pedrito/pedrito@tocandtalk.com/pedrito/bandolero/us/it/banana
    errors += errorAdapter(models.User.modelName, user.validateSync());
    errors += errorAdapter(models.Auth.modelName, auth.validateSync());

    var output = {
            username: results.username.doc,
            email: results.email.doc,
            password: results.password.doc,
            appraisement: results.appraisement.doc,
            messenger: results.messenger.doc,
            user: user,
            auth: auth
          };
    callback(errors, output);
  });
}

var saveClassicAccount = function (data, callback) {
  var user = data.user;
  var username = data.username;
  var email = data.email;
  var appraisement = data.appraisement;
  var messenger = data.messenger;
  var password = data.password;
  var auth = data.auth;

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
      password: function(callback) {
          setTimeout(function(){
            password.save(function (err) {
              //console.log("There is an error");
              //console.log(err);
                callback(null, {errors: errorAdapter(models.Password.modelName, err), doc: password})
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
      auth: function(callback) {
          setTimeout(function(){
            auth.save(function (err) {
                callback(null, {errors: errorAdapter(models.Auth.modelName, err), doc: auth})
            });
          }, 200);
      } 
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.password.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.user.errors;
    errors += results.auth.errors;
    //----------------------------------
    
    var output = {
            username: results.username.doc,
            email: results.email.doc,
            password: results.password.doc,
            user: results.user.doc,
            auth: results.auth.doc
          };
    callback(errors, output);
  });
}
//---------------------------------------------

module.exports = {}
module.exports.validateAccount = validateAccount;
module.exports.saveAccount = saveAccount;
module.exports.validateClassicAccount = validateClassicAccount;
module.exports.saveClassicAccount = saveClassicAccount;
