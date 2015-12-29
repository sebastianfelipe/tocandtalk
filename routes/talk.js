var ip = require('ip');
var express = require('express');
var router = express.Router();

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var global_module = require('../modules/global.js');
var authenticate = authenticate_module.authenticate;
var ports = global_module.ports;
var host_name = global_module.host_name;

console.log(host_name);
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
  return res.render('talk2/index.html', {forceType: "desktop", username: req.session.username, host_name: host_name, server_ip: server_ip, protocol: protocol, secure: req.secure, server_ports: server_ports});
});

module.exports = router;