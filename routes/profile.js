var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	return res.render('profile/index.html', {forceType: "desktop", errors: ""});
});

module.exports = router;