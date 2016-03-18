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
router.post('/user/nationality', authenticate, function (req, res) {
	var id = req.session.user._id;
	var countryCode = req.body.countryCode;

	  async.parallel({
	      user: function(callback) {
	          setTimeout(function(){
	              models.User
	              .findOne({_id: id})
	              .deepPopulate('_nationality')
	              .exec(function (err, doc) {
	                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: doc});

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
			return res.send({errors: errors, doc: country});
		});
	}
	else
	{
		errors += 'eDBNotFound';
		return res.send({errors: errors, doc: null});
	}
  });
});

router.post('/user/lang', authenticate, function (req, res) {
	var id = req.session.user._id;
	var code = req.body.code;

	  async.parallel({
	      user: function(callback) {
	          setTimeout(function(){
	              models.User
	              .findOne({_id: id})
	              .deepPopulate('_nationality')
	              .exec(function (err, doc) {
	                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: doc});

	              })
	          }, 200)
	      },
	      lang: function(callback) {
          setTimeout(function(){
              models.Lang.findOne({code: code}).exec(function (err, doc) {
                callback(null, {errors: errorAdapter(models.Lang.modelName, err), doc: doc});
              })
          }, 200);
      },
  },
  function(err, results) {
  	var user = results.user.doc;
  	var lang = results.lang.doc;
	var errors = "";
	errors += results.user.errors;
	errors += results.lang.errors;
  	if (user && lang)
  	{
		user._lang = lang._id;
		
		user.save(function (err) {
			if (err) { errors +='eDBUpdate' }
			return res.send({errors: errors, doc: lang});
		});
		
	}
	else
	{
		errors += 'eDBNotFound';
		return res.send({errors: errors, doc: null});
	}
  });
});

//localhost:4080/api/update/user/description/:username/:description
//localhost:4080/api/update/user/description/pedrito/Meencantan
//localhost:4080/api/update/user/description/pedrito/kjdhsakdhkajkhdjkakjdhjkakjha
router.post('/user/description', authenticate, function (req, res) {
	var id = req.session.user._id;
	var description = req.body.description.trim();

	  async.parallel({
	      user: function(callback) {
	          setTimeout(function(){
	              models.User
	              .findOne({_id: id})
	              .exec(function (err, doc) {
	                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: doc});

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
			return res.send({errors: errors, doc: user.description});
		});
	}
	else
	{
		errors += 'eDBNotFound';
		return res.send({errors: errors, doc: null});
	}
  });
});

module.exports = router;