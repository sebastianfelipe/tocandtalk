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
var encrypt_module = require('./encrypt.js');

//var mAux = require('./aux.js');
var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var validateAccount = mAux.validateAccount;
var saveAccount = mAux.saveAccount;
var verifyPassword = encrypt_module.verifyPassword;

var passport = require('passport');

require('../../config/passport')(passport);


//localhost:4080/api/auth/:username/:password
//localhost:4080/api/auth/feliponcio/banana
router.post('/', function (req, res) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;

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
        console.log(doc._user._password);
        if (verifyPassword(password, doc._user._password.salt, doc._user._password.password))
        {
          req.session.username = doc._user._username.username;
        }
        else
        {
          errors += "eUser;";
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

router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email']}));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', scope: ['public_profile']}),
  function(req, res) {
    // successful auth, user is set at req.user.  redirect as necessary.
    //if (req.user.isNew) { return res.redirect('/register'); }
    //res.redirect('/profile');
    if (req.user.doc)
    {
        req.user.doc.populate('_user', function (err, doc) {
            if (doc)
            {
                req.session.username = doc._user._id;
                return res.send({result: "ok", profile: req.user.profile});
            }
        });
    }
    else
    {
      
      return res.send({result: "nope", profile: req.user.profile});
    }
  });

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/perfil', failureRedirect: '/login' }));

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/perfil', failureRedirect: '/login' }));

module.exports = router;




