// Module Imports
var global = require('../modules/global.js');

// Shared Variables
var bd = global.bd;

var uniqueUsername = function (req) {
  for (var i in bd.user)
  {
    if (bd.user[i].username == req.body.i_username)
    {
      //req.session.username = Math.floor(Math.random()*9999999999).toString();
      return false;
    }
  }
  return true;
}

var uniqueEmail = function (req) {
    for (var i in bd.user)
    {
        if (bd.user[i].email == req.body.i_email)
        {
            //req.session.username = Math.floor(Math.random()*9999999999).toString();
            return false;
        }
    }
    return true;
}

var validPass = function (req, user){
  if (user.password == user.conf_password){
    return true;
  }
  return false;
}

var isValid = function (req,user){
 for(var i=0; i < req.body.i_username.length; i++){
   if( req.body.i_username.charCodeAt(i)>127){
    return false;
    }
  }
  return true;
}

module.exports.uniqueUsername = uniqueUsername;
module.exports.uniqueEmail = uniqueEmail;
module.exports.validPass = validPass;
module.exports.isValid = isValid;

