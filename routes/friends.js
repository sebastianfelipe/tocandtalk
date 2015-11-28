var express = require('express');
var router = express.Router();

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;

router.get('/', authenticate, function (req, res) {
	return res.render('friends/index.html', {forceType: "desktop", errors: ""});
});

module.exports = router;