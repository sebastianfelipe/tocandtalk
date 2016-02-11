var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

var authenticate = authenticate_module.authenticate;
var error_adapter = functions_module.error_adapter;

router.get('/', function (req, res) {
  if (!req.session.username )
  {
    return res.render('login/index.html', {forceType: "desktop", req: req.body, errors: ""});
  }
  else
  {

    return res.redirect('/');
  }
});

router.post('/', function (req, res) {
  async.parallel({
      username: function(callback){
          setTimeout(function(){
            var errors = "";
              models.User.findOne({_username: req.body.i_username, password: req.body.i_password}).exec(function (err, doc) {
                callback(null,doc);
                  })
          }, 200);
      },
      email: function(callback){
          setTimeout(function(){
            var errors = "";
              models.User.findOne({_email: req.body.i_username, password: req.body.i_password}).exec(function (err, doc) {
                callback(null,doc);
                  })
          }, 200);
      }
  },
  function(err, results) {
      var errors = "";
      var doc = results.username || results.email;
      if (doc)
      {
        req.session.username = doc._username;
      }
      else
      {
        errors += "eUser;";
        
      }
      //return res.req.res.redirect('/');
      return res.send({req: req.body, errors: errors});
  });
});

/*
router.post('/', function (req, res) {
  models.User.findOne({_username: req.body.i_username}, function(err, doc) {
    var errors = "";
    if (doc)
    {
      if (req.body.i_password == doc.password)
      {
        req.session.username = doc._username;
        return res.redirect('/');
      }
    }
    else
    {
      models.User.findOne({_email: req.body.i_username}, function(err, doc) {
        var errors = "";
        if (doc)
        {
          if (req.body.i_password == doc.password)
          {
            req.session.username = doc._username;
            console.log(req.session);
            return res.redirect('/');
          }
        }
        else
        {
          errors += "error_user;";
          return res.render('login/index.html', {forceType: "desktop", req: req.body, errors: errors});
        }
      });
    }
  });
});
*/

module.exports = router;