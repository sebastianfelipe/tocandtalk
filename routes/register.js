var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

//var models = require('../database/models.js').models;

//var bd = {};
//bd.user = [];

// Module Imports
var global = require('../modules/global.js');
var validation_module = require('../modules/validations.js');
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

// Function Imports
var authenticateRegister = authenticate_module.authenticateRegister;
var error_adapter = functions_module.error_adapter;

// Shared Variables

router.get('/', authenticateRegister, function (req, res) {
  async.parallel({
      countries: function(callback){
          setTimeout(function(){
              models.Country.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(err, docs);
              })
          }, 200);
      },
      languages: function(callback){
          setTimeout(function(){
              models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(err, docs);
              })
          }, 200);
      }
  },
  function(err, results) {
      // results is now equals to: {one: 1, two: 2}
    return res.render('register/index.html', {forceType: "desktop", countries: results.countries, languages: results.languages, req: req.body, errors: ""});
  });
});

router.post('/',function (req, res) {
  var errors = "";
  var username = new models.Username({username: req.body.iUsername.trim().toLowerCase()});
  var email = new models.Email({email: req.body.iEmail});
  var user = new models.User({  _username: username.username.trim().toLowerCase(),
                                _email: email.email.trim().toLowerCase(),
                                nationality: req.body.sCountry,
                                native_language: req.body.sNativeLanguage,
                                first_name: req.body.iName,
                                last_name: req.body.iLastname,
                                sex: req.body.rSex,
                                password: req.body.iPassword,
                                description: "",
                                sum_valoration: 0,
                                cant_valoration: 0
                                });

  if (req.body.iPassword != req.body.iPasswordConfirmation)
  {
    errors += "eUserPasswordConfirmation;"; 
  }

  // Validation step
  async.parallel({
      username: function(callback){
          setTimeout(function(){
              username.validate(function (err) {
                var errors_tmp = error_adapter(models.Username.modelName, err);
                callback(null, errors_tmp);
              });
          }, 200);
      },
      email: function(callback){
          setTimeout(function(){
              email.validate(function (err) {
                var errors_tmp = error_adapter(models.Email.modelName, err);
                callback(null, errors_tmp);
              });
          }, 200);
      },
      user: function(callback){
          setTimeout(function(){
              user.validate(function (err) {
                var errors_tmp = error_adapter(models.User.modelName, err);
                callback(null, errors_tmp);
              });
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    errorList = [];
    for (var key in results) {
      errorList.push(results[key]);
    }
    errors += errorList.join('');
    if (!errors) 
    {
      // Save
      async.parallel({
            username: function(callback){
                setTimeout(function(){
                    username.save(function (err) {
                      var errors_tmp = error_adapter(models.Username.modelName, err);
                      callback(null, errors_tmp);
                    });
                }, 200);
            },
            email: function(callback){
                setTimeout(function(){
                    email.save(function (err) {
                      var errors_tmp = error_adapter(models.Email.modelName, err);
                      callback(null, errors_tmp);
                    });
                }, 200);
            },
            user: function(callback){
                setTimeout(function(){
                    user.save(function (err) {
                      var errors_tmp = error_adapter(models.User.modelName, err);
                      callback(null, errors_tmp);
                    });
                }, 200);
            }
        },
        function(err, results) {
            // error handling
            errorList = [];
            for (var key in results) {
              errorList.push(results[key]);
            }
            errors += errorList.join('');
            if (!errors) 
            {
              req.session.username = user._username;
            }
            return res.send({req: req.body, errors: errors});
      });
    }
    else
    {
        return res.send({req: req.body, errors: errors});
    }
  });
});

/*
router.post('/',function (req, res) {
  var errors = "";
  var username = new models.Username({username: req.body.i_username.trim().toLowerCase()});
  var email = new models.Email({email: req.body.i_email});
  var user = new models.User({  _username: username.username.trim().toLowerCase(),
                                _email: email.email.trim().toLowerCase(),
                                nationality: req.body.s_country,
                                native_language: req.body.s_native_language,
                                first_name: req.body.i_name,
                                last_name: req.body.i_lastname,
                                sex: req.body.r_sex,
                                password: req.body.i_password,
                                description: ""
                                });

  if (req.body.i_password != req.body.i_password_confirmation)
  {
    errors += "error_user_password_confirmation;"; 
  }

  // Validation step
  async.parallel({
      username: function(callback){
          setTimeout(function(){
              username.validate(function (err) {
                var errors_tmp = error_adapter(models.Username.modelName, err);
                callback(null, errors_tmp);
              });
          }, 200);
      },
      email: function(callback){
          setTimeout(function(){
              email.validate(function (err) {
                var errors_tmp = error_adapter(models.Email.modelName, err);
                callback(null, errors_tmp);
              });
          }, 200);
      },
      user: function(callback){
          setTimeout(function(){
              user.validate(function (err) {
                var errors_tmp = error_adapter(models.User.modelName, err);
                callback(null, errors_tmp);
              });
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    errorList = [];
    for (var key in results) {
      errorList.push(results[key]);
    }
    errors += errorList.join('');
    if (errors) 
    {
      async.parallel({
          countries: function(callback){
              setTimeout(function(){
                  models.Country.find().sort([['name', 1]]).exec(function (err, docs) {
                    callback(err, docs);
                  })
              }, 200);
          },
          languages: function(callback){
              setTimeout(function(){
                  models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
                    callback(err, docs);
                  })
              }, 200);
          }
      },
      function(err, results) {
          // results is now equals to: {one: 1, two: 2}
        return res.render('register/index.html', {forceType: "desktop", countries: results.countries, languages: results.languages, req: req.body, errors: errors});
      });
    }
    else
    {
      // Save
      async.parallel({
            username: function(callback){
                setTimeout(function(){
                    username.save(function (err) {
                      var errors_tmp = error_adapter(models.Username.modelName, err);
                      callback(null, errors_tmp);
                    });
                }, 200);
            },
            email: function(callback){
                setTimeout(function(){
                    email.save(function (err) {
                      var errors_tmp = error_adapter(models.Email.modelName, err);
                      callback(null, errors_tmp);
                    });
                }, 200);
            },
            user: function(callback){
                setTimeout(function(){
                    user.save(function (err) {
                      var errors_tmp = error_adapter(models.User.modelName, err);
                      callback(null, errors_tmp);
                    });
                }, 200);
            }
        },
        function(err, results) {
          // error handling
          errorList = [];
          for (var key in results) {
            errorList.push(results[key]);
          }
          errors += errorList.join('');
          if (errors) 
          {
            async.parallel({
                countries: function(callback){
                    setTimeout(function(){
                        models.Country.find().sort([['name', 1]]).exec(function (err, docs) {
                          callback(err, docs);
                        })
                    }, 200);
                },
                languages: function(callback){
                    setTimeout(function(){
                        models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
                          callback(err, docs);
                        })
                    }, 200);
                }
            },
            function(err, results) {
                // results is now equals to: {one: 1, two: 2}
              return res.render('register/index.html', {forceType: "desktop", countries: results.countries, languages: results.languages, req: req.body, errors: errors});
            });
          }
          else
          {
            req.session.username = user._username;
            res.redirect('/');
          }
      });
    }
    //return res.render('register/index.html', {forceType: "desktop", countries: results.countries, languages: results.languages, errors: ""});
  });
});
*/


module.exports = router;