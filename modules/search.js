// Module Imports
var global_module = require('./global.js');

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;

// Nota: Arreglar problema de baja probabildiad
var randomSearch = function (caller_id, language) {
  var recipient_id = availables[language][Math.floor(Math.random()*availables[language].length)];
  console.log("randomSearch: " + recipient_id + " " + caller_id);
  if (recipient_id == caller_id) {return randomSearch(caller_id, language);}
  return recipient_id;
};

module.exports.randomSearch = randomSearch;