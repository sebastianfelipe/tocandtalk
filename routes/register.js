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

// Function Imports
var authenticate = authenticate_module.authenticate;

// Shared Variables
var error_adapter = function(model_name, err) {
  error_list = [];
  if (err) {
    var errors = err.errors;
    for (var key in errors) {
      var pieces = [key, errors[key].kind]
      error = 'error_' + model_name.toLowerCase();
      for (var piece in pieces) {
        error += '_' + pieces[piece].replace(' ','').replace('userdefined', errors[key].message);
      }
      error_list.push(error);
    }
  }
  error_list.push('');
  return error_list.join(';');
}

router.get('/', function (req, res) {
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

/*
  username: ObjectId,
  email: ObjectId,
  nationality: String,
  native_language: String,
  spoken_languages: [String],
  interest_languages: [String],
  first_name: String,
  last_name: String,
  password: String,
  sex: String,
  description: String
*/
router.post('/',function (req, res) {
  var errors = "";
  var username = new models.Username({username: req.body.i_username.trim().toLowerCase()});
  var email = new models.Email({email: req.body.i_email});
  var user = new models.User({  _username: username.username.trim().toLowerCase(),
                                _email: email.email.trim().toLowerCase(),
                                nationality: req.body.s_country.trim().toLowerCase(),
                                native_language: req.body.s_native_language.trim().toLowerCase(),
                                first_name: req.body.i_name.trim().toLowerCase(),
                                last_name: req.body.i_lastname.trim().toLowerCase(),
                                sex: req.body.r_sex.trim().toLowerCase(),
                                password: req.body.i_password,
                                description: ""
                                });

  if (req.body.i_password != req.body.i_password_confirmation)
  {
    errors += "error_user_password_confirmation"; 
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
    error_list = [];
    for (var key in results) {
      error_list.push(results[key]);
    }
    errors += error_list.join('');
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
          error_list = [];
          for (var key in results) {
            error_list.push(results[key]);
          }
          errors += error_list.join('');
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
/*
router.post('/',function (req, res) {
  var user = {"username"        : req.body.i_username,
              "name"            : req.body.i_name,
              "lastname"        : req.body.i_lastname,
              "sex"             : req.body.r_sex,
              "email"           : req.body.i_email,
              "password"        : req.body.i_password,
              "conf_password"   : req.body.i_password_confirmation
              };

    var resultUniqueUsername = uniqueUsername(req);
    var resultUniqueEmail = uniqueEmail(req);
    //var resultValidPass = validPass(req, user);
    var resultIsValid = isValid(req, user);

  console.log("Is unique? " + resultUniqueUsername);
  //if (resultUniqueUsername && resultUniqueEmail && resultValidPass && resultIsValid )
  if (resultUniqueUsername && resultUniqueEmail && resultIsValid )
  {
    // Asegurarse que cada una de las weas de aquí está bien

    // Guardar al usuario en la bd
    bd.user.push(user);
    console.log(bd);
    req.session.username = user.username;
    return res.redirect('/');
  }
 else
 {
    var error_handler = "";
    if (!resultUniqueUsername) {error_handler += "error_username_e;";}
    if (!resultUniqueEmail) {error_handler += "error_email_e;";}
    //if (!resultValidPass) {error_handler += "error_password_confirmation;";}
    if (!resultIsValid) {error_handler += "error_username;";}
    //console.log("Ha ocupado un caracter incorrecto!");
    return res.render('register/index.html', {foceType: "desktop", errors: error_handler});
  }
});
*/
module.exports = router;