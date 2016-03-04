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

// Function Imports
var errorAdapter = functions_module.error_adapter;

/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
*/
router.get('/', function (req, res) {
	console.log('/api/get');
});

/*
router.get('/user', authenticate, function (req, res) {
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {

                callback(null, {errors: err, doc: doc});
              })
          }, 200);
      }
  },
  function(err, results) {
     return res.send(results.user);
  });
});
*/

router.get('/user', authenticate, function (req, res) {
  var id = req.session.id;

  async.parallel({
        user: function(callback) {
            setTimeout(function(){
                models.User
                .findOne({"_id": id})
                .deepPopulate('_nationality _nativeLanguage _auth spokenLanguages interestLanguages')
                .exec(function (err, doc) {
                  callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: doc});

                })
            }, 200)
        }
  },
  function(err, results) {
    var errors = "";
    errors += results.user.errors;

    console.log(results.user.doc);
    var user = {};
    //user.username = results.user.doc._auth.classic.username || results.user.doc._auth.facebook.id || results.user.doc._auth.twitter.id || results.user.doc._auth.google.id;
    user.firstName = results.user.doc.firstName;
    user.lastName = results.user.doc.lastName;
    user.description = results.user.doc.description;
    user.sex = results.user.doc.sex;
    user.nativeLanguage = results.user.doc._nativeLanguage;
    user.nationality = results.user.doc._nationality;
    user.fullName = user.firstName + " " + user.lastName;

    user.spokenLanguages = results.user.doc.spokenLanguages;
    user.interestLanguages = results.user.doc.interestLanguages;

     return res.send({errors: errors, doc: user});
  });
});

router.get('/countries', function (req, res) {
	async.parallel({
    	countries: function(callback){
          	setTimeout(function(){
            	models.Country.find().sort([['name', 1]]).exec(function (err, docs) {
              		var results = {errors: err, docs: docs}
                	callback(null, results);
              	});
          	}, 200);
      	}
	},
	function (err, results)
	{
		res.send(results.countries);
	});
});

router.get('/languages', function (req, res) {
	async.parallel({
    	languages: function(callback){
          	setTimeout(function(){
            	models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
              		var results = {errors: err, docs: docs}
                	callback(null, results);
              	});
          	}, 200);
      	}
	},
	function (err, results)
	{
		res.send(results.languages);
	});
});

router.get('/lang/:lang/:view', function (req, res) {
  var langPath = "../../views/langs";
  // Verificar que lang y view sean válido

  // Supongamos que lang y view son válidos
  langPath += "/" + req.params.lang;
  langPath += "/" + req.params.view + '.json';
  var data = require(langPath);
  res.send(data);
});



//---------------------------------------------

router.get('/users', function (req, res) {
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User
              .find()
              .deepPopulate('_auth.classic')
              .exec(function (err, docs) {

                callback(null, {errors: err, docs: docs});
              })
          }, 200);
      }
  },
  function(err, results) {
     return res.send(results.user);
  });
});

router.get('/emails', function (req, res) {
  async.parallel({
      email: function(callback) {
          setTimeout(function(){
              models.Email.find().exec(function (err, docs) {

                callback(null, {errors: err, docs: docs});
              })
          }, 200);
      }
  },
  function(err, results) {
     return res.send(results.email);
  });
});

router.get('/usernames', function (req, res) {
  async.parallel({
      username: function(callback) {
          setTimeout(function(){
              models.Username.find().exec(function (err, docs) {

                callback(null, {errors: err, docs: docs});
              })
          }, 200);
      }
  },
  function(err, results) {
     return res.send(results.username);
  });
});

router.get('/passwords', function (req, res) {
  async.parallel({
      password: function(callback) {
          setTimeout(function(){
              models.Password.find().exec(function (err, docs) {

                callback(null, {errors: err, docs: docs});
              })
          }, 200);
      }
  },
  function(err, results) {
     return res.send(results.password);
  });
});

router.get('/auths', function (req, res) {
  async.parallel({
      password: function(callback) {
          setTimeout(function(){
              models.Auth.find().exec(function (err, docs) {

                callback(null, {errors: err, docs: docs});
              })
          }, 200);
      }
  },
  function(err, results) {
     return res.send(results.auth);
  });
});

//---------------------------------------------

module.exports = router;




