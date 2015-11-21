// Module Imports
var global_module = require('./global.js');

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;

// Nota: Arreglar problema de baja probabildiad
var randomSearch = function (caller_id) {
  var recipient_id = availables[Math.floor(Math.random()*availables.length)];
  console.log("randomSearch: " + recipient_id + " " + caller_id);
  if (recipient_id == caller_id) {return randomSearch(caller_id);}
  return recipient_id;
};

module.exports.randomSearch = randomSearch;