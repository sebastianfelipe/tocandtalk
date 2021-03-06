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
    var lang = "es";
    if (req.session.meta)
    {
      var lang = req.session.meta.lang || lang;
    }
  	 return res.render('friends/index.html', {forceType: "desktop", lang: lang, errors: ""});
  });});

module.exports = router;