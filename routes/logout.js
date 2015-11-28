var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  if (req.session.username)
  {
    delete req.session.username;
  }
  return res.redirect('/');
});

module.exports = router;