var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');

var authenticate = authenticate_module.authenticate;

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

module.exports = router;