var router = require('express').Router();
var ip = require('ip');
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var global_module = require('../modules/global.js');
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

// Functions
var authenticate = authenticate_module.authenticate;
var error_adapter = functions_module.error_adapter;
var setPageLang = functions_module.setPageLang;

router.post('/', authenticate, setPageLang, function (req, res) {
	var language = req.body.language || 'en';
  	return res.render('talk/index.html', {forceType: "desktop", lang: req.session.meta.lang.code, language: language});
});

/*
router.get('/', authenticate, function (req, res) {
	var protocol = req.protocol;
	var server_ports;
	if (req.secure)
	{
		server_ports = ports.https;
	}
	else
	{
		server_ports = ports.http;
	}
	//var server_ip = "204.87.169.109";
	var server_ip = ip.address();
  	return res.render('talk/index.html', {forceType: "desktop", host_name: host_name, server_ip: server_ip, protocol: protocol, secure: req.secure, server_ports: server_ports});
});
*/

/*
router.post('/', authenticate, function (req, res) {
	var protocol = req.protocol;
	var server_ports;
	if (req.secure)
	{
		server_ports = ports.https;
	}
	else
	{
		server_ports = ports.http;
	}
	//var server_ip = "204.87.169.109";
	var server_ip = ip.address();
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                callback(null, doc);
              })
          }, 200);
      }
  },
  function(err, results) {
  	return res.render('talk/index.html', {forceType: "desktop", username: req.session.username, host_name: host_name, server_ip: server_ip, protocol: protocol, secure: req.secure, server_ports: server_ports, user: results.user, language: req.body.s_languages});
  });
});
*/

module.exports = router;