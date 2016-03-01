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
//var mAux = require('./aux.js');
var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var validateAccount = mAux.validateAccount;
var saveAccount = mAux.saveAccount;

//localhost:4080/api/update/user/nationality/:username/:nationality
//localhost:4080/api/update/user/nationality/pedrito/es
//localhost:4080/api/update/user/nationality/pedrito/it
router.get('/user/nationality/:username/:countryCode',function (req, res) {
	var username = req.params.username;
	var countryCode = req.params.countryCode;

	  async.parallel({
	      user: function(callback) {
	          setTimeout(function(){
	              models.Username
	              .findOne({username: username})
	              .deepPopulate('_user')
	              .exec(function (err, doc) {
	              	/*
	                  doc.nationality = req.body.s_country;
	                  doc.save(function (err) {
	                    var errors_tmp = error_adapter(models.Username.modelName, err);
	                 */
	                var obj = null;
	                if (doc) { obj = doc._user; }
	                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: obj});

	              })
	          }, 200)
	      },
	      country: function(callback) {
          setTimeout(function(){
              models.Country.findOne({code: countryCode}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Country.modelName, err), doc: doc});
              })
          }, 200);
      },
  },
  function(err, results) {
  	var user = results.user.doc;
  	var country = results.country.doc;
	var errors = "";
	errors += results.user.errors;
	errors += results.country.errors;
  	if (user && country)
  	{
		user._nationality = country._id;
		user.save(function (err) {
			if (err) { errors +='eDBUpdate' }
			return res.send({errors: errors});
		});
	}
	else
	{
		errors += 'eDBNotFound'
		return res.send({errors: errors})
	}
  });
});

router.post('/edit_user_description',function (req, res) {
  var errors = "";

  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  doc.description = req.body.input_edit_desc;
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('edit_user_description');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

//localhost:4080/api/update/user/description/:username/:description
//localhost:4080/api/update/user/description/pedrito/Meencantan
//localhost:4080/api/update/user/description/pedrito/kjdhsakdhkajkhdjkakjdhjkakjha
router.get('/user/description/:username/:description',function (req, res) {
	var username = req.params.username;
	var description = req.params.description.trim();

	  async.parallel({
	      user: function(callback) {
	          setTimeout(function(){
	              models.Username
	              .findOne({username: username})
	              .deepPopulate('_user')
	              .exec(function (err, doc) {
	                var obj = null;
	                if (doc) { obj = doc._user; }
	                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: obj});

	              })
	          }, 200)
	      }
  },
  function(err, results) {
  	var user = results.user.doc;
	var errors = "";
	errors += results.user.errors;
  	if (user)
  	{
		user.description = description;
		user.save(function (err) {
			if (err) { errors +='eDBUpdate' }
			return res.send({errors: errors});
		});
	}
	else
	{
		errors += 'eDBNotFound'
		return res.send({errors: errors})
	}
  });
});


router.post('/add_user_interest_language',function (req, res) {
  var errors = "";
  add_interest_language = req.body.s_interest_languages;

  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  add_interest_language_id = doc.interest_languages.indexOf(add_interest_language);
                  if (add_interest_language_id < 0)
                  {
                    doc.interest_languages.push(add_interest_language);
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('add_user_interest_language');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/add_user_spoken_language',function (req, res) {
  var errors = "";
  add_spoken_language = req.body.s_spoken_languages;
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  add_spoken_language_id = doc.spoken_languages.indexOf(add_spoken_language);
                  if ((add_spoken_language_id < 0) && (add_spoken_language != doc.native_language))
                  {
                    doc.spoken_languages.push(add_spoken_language);
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('add_user_spoken_language');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/remove_interest_language',function (req, res) {
  var errors = "";
  remove_interest_language = req.body.remove_interest_language;
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  remove_interest_language_id = doc.interest_languages.indexOf(remove_interest_language);
                  if (remove_interest_language_id > -1)
                  {
                    doc.interest_languages.splice(remove_interest_language_id, 1); 
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('remove_interest_language');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });

});

router.post('/remove_spoken_language',function (req, res) {
  var errors = "";
  remove_spoken_language = req.body.remove_spoken_language;
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  remove_spoken_language_id = doc.spoken_languages.indexOf(remove_spoken_language);
                  if (remove_spoken_language_id > -1)
                  {
                    doc.spoken_languages.splice(remove_spoken_language_id, 1); 
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('remove_spoken_language');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });

});

module.exports = router;