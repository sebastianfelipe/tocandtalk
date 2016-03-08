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

var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var verifyPassword = encrypt_module.verifyPassword;
var saveSocialAccount = mAux.saveSocialAccount;

var passport = require('passport');

require('../../config/passport')(passport);


//localhost:4080/api/auth/:username/:password
//localhost:4080/api/auth/feliponcio/banana
router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  async.parallel({
      username: function(callback){
          setTimeout(function(){
            var errors = "";
              models.Username
              .findOne({username: username})
              .deepPopulate('_user._auth.classic._password')
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
              .deepPopulate('_user._auth.classic._password')
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
        if (verifyPassword(password, doc._user._auth.classic._password.salt, doc._user._auth.classic._password.password))
        {
          req.session._id = doc._user._id;
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
                req.session._id = doc._user._id;
                return res.send({result: "ok", profile: req.user.profile});
            }
            else{
              return res.send({result: "nope", profile: req.user.profile});
            }
        });
    }
    else
    { 

      var errors = '';
      // Object Creation
      var user = new models.User();
      user.firstName = profile.name.givenName.trim().toLowerCase();
      user.lastName = profile.name.familyName.trim().toLowerCase();

      var appraisement = new models.Appraisement();
      appraisement._user = user._id;
      appraisement.mean = 0;

      var messenger = new models.Messenger();
      messenger._user = user._id;

      var friendship = new models.Friendship():
      friendship._user = user._id;

      var auth = new models.Auth();
      auth.facebook = {};
      auth.facebook.id = profile.id;

      user._appraisement = appraisement._id;
      user._messenger = messenger._id;
      user._friendship = friendship._id;
      user._auth = auth._id;

      // Validation
      // ------------
      errors += errorAdapter(models.User.modelName, user.validateSync());
      errors += errorAdapter(models.Appraisement.modelName, appraisement.validateSync());
      errors += errorAdapter(models.Messenger.modelName, messenger.validateSync());
      errors += errorAdapter(models.Friendship.modelName, friendship.validateSync());
      errors += errorAdapter(models.Auth.modelName, auth.validateSync());

      if (!errors)
      {
        var data = {};
        data.user = user;
        data.appraisement = appraisement;
        data.messenger = messenger;
        data.friendship = friendship;
        data.auth = auth;

        // Save
        // ------------
        saveFacebookAccount(data, function (errors, output) {
            if (!errors)
            {
              req.session._id = output.user._id;
            }
            return res.send({errors: errors, output: output});
          });
     
      }
      else
      {
        return res.send({errors: errors});
      }

    }
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/perfil', failureRedirect: '/login' }));

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/perfil', failureRedirect: '/login' }));

module.exports = router;




