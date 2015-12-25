var ip = require('ip');
var express = require('express');
var router = express.Router();

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;

router.get('/', authenticate, function (req, res) {
	var protocol = req.protocol;
	console.log(req.secure);
	if (req.secure)
	{
		protocol += "s";
	}
  return res.render('talk2/index.html', {forceType: "desktop", username: req.session.username, server_ip: ip.address(), protocol: protocol });
});

module.exports = router;