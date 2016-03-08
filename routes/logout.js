var express = require('express');
var router = express.Router();

var functionsModule = require('../modules/functions.js');
var signOut = functionsModule.signOut;

router.get('/', function (req, res) {
  if (req.session.user)
  {
    signOut(req);
  }
  return res.redirect('/');
});

module.exports = router;