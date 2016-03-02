// Module Imports
var global_module = require('./global.js');

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;

// Nota: Arreglar problema de baja probabildiad
var randomSearch = function (callerId, language) {
  var user = availables[language][Math.floor(Math.random()*availables[language].length)];
  console.log("randomSearch: " + user.userId + " " + callerId);
  if (user.userId  == callerId) {return randomSearch(callerId, language);}
  return user;
};

module.exports.randomSearch = randomSearch;