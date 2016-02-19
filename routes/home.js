var express = require('express');
var router = express.Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;

router.get('/', authenticate, function (req, res) {
  async.parallel({
      languages: function(callback){
          setTimeout(function(){
              models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(err, docs);
              })
          }, 200);
      },
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                callback(err, doc);
              })
          }, 200);
      }
  },
  function(err, results) {
  	 return res.render('home/index.html', {forceType: "desktop", user: results.user, languages: results.languages, req: req.body, errors: ""});
  });});

router.get('/perfil', isLoggedIn, function(req, res) {
        res.render('perfil.html', {
            user : req.user // get the user out of session and pass to template
        });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;