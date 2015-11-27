var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	return res.render('friends/index.html', {forceType: "desktop", errors: ""});
});

module.exports = router;