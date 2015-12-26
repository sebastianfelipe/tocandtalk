var ip = require('ip');
var express = require('express');
var router = express.Router();

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;

router.get('/', authenticate, function (req, res) {
	var protocol = req.protocol;
	console.log(req.secure);
	console.log(protocol);
	var server_port = 4080;
	if (req.secure)
	{
		server_port = 4443;
	}
	var server_ip = 204.87.169.109;
	console.log(protocol);
  return res.render('talk2/index.html', {forceType: "desktop", username: req.session.username, server_ip: server_ip, protocol: protocol, secure: req.secure, server_port: server_port});
});

module.exports = router;