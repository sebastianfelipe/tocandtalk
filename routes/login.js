var express = require('express');
var router = express.Router();

var global = require('../modules/global.js');
var bd = global.bd;

router.get('/', function (req, res) {
  if (!req.session.username )
  {
    return res.render('login/index.html', {forceType: "desktop", errors: ""});
  }
  else
  {

    return res.redirect('/');
  }
});

router.post('/',function (req, res) {
  for (var i in bd.user)
  {
    console.log("bduser -> " + bd.user[i].username);
    console.log("reqbody -> " + req.body.input_username);
    if (((bd.user[i].username == req.body.input_username) || (bd.user[i].email == req.body.input_username)) && bd.user[i].password== req.body.input_password )
    {
      console.log(bd.user[i].username == req.body.input_username);

      //req.session.username = Math.floor(Math.random()*9999999999).toString();
      req.session.username = bd.user[i].username;
      return res.redirect('/');
    }
  }
  return res.render('login/index.html', {forceType: "desktop", errors: "error_user;"});
});

module.exports = router;