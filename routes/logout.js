var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  console.log(req.session);
  console.log(req.session._id);
  if (req.session._id)
  {
    delete req.session._id;
  }
  return res.redirect('/');
});

module.exports = router;