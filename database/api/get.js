
var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');
var db = require('../configuration.js');
var schema = require('../schema.js');
var models = require('../models.js');

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

module.exports = router;
