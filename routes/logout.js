var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.session.username)
  {
    delete req.session.username;
  }
  console.log("Cookies: ",req.cookies);
  console.log("Session: ",req.session);
  return res.redirect('/');
});

module.exports = router;