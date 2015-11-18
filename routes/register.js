var express = require('express');
var router = express.Router();

//var bd = {};
//bd.user = [];

// Module Imports
var global = require('../modules/global.js');
var validation_module = require('../modules/validations.js');
var authenticate_module = require('../modules/authenticate.js');

// Function Imports
var authenticate = authenticate_module.authenticate;
var uniqueUsername = validation_module.uniqueUsername;
var uniqueEmail = validation_module.uniqueEmail;
var validPass = validation_module.validPass;
var isValid = validation_module.isValid;

// Shared Variables
var bd = global.bd;


router.get('/', function (req, res) {
  return res.render('register/index.html', {forceType: "desktop", errors: ""});
});

router.post('/',function (req, res) {
  /*
  if (bd[req.body.username] == req.body.password)
  {
    req.session.username = req.body.username;
  }
  */
  var user = {"username"        : req.body.input_username,
              "name"            : req.body.input_name,
              "lastname"        : req.body.input_lastname,
              "sex"             : req.body.radio_sex,
              "email"           : req.body.input_email,
              "password"        : req.body.input_password,
              "conf_password"   : req.body.input_password_confirmation
              };

    var resultUniqueUsername = uniqueUsername(req);
    var resultUniqueEmail = uniqueEmail(req);
    //var resultValidPass = validPass(req, user);
    var resultIsValid = isValid(req, user);

  console.log("Is unique? " + resultUniqueUsername);
  //if (resultUniqueUsername && resultUniqueEmail && resultValidPass && resultIsValid )
  if (resultUniqueUsername && resultUniqueEmail && resultIsValid )
  {
    // Asegurarse que cada una de las weas de aquí está bien

    // Guardar al usuario en la bd
    bd.user.push(user);
    console.log(bd);
    req.session.username = user.username;
    return res.redirect('/');
  }
 else
 {
    var error_handler = "";
    if (!resultUniqueUsername) {error_handler += "error_username_e;";}
    if (!resultUniqueEmail) {error_handler += "error_email_e;";}
    //if (!resultValidPass) {error_handler += "error_password_confirmation;";}
    if (!resultIsValid) {error_handler += "error_username;";}
    //console.log("Ha ocupado un caracter incorrecto!");
    return res.render('register/index.html', {foceType: "desktop", errors: error_handler});
  }
});

module.exports = router;