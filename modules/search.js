// Module Imports
var global_module = require('./global.js');

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;

var randomSearch = function (callerId) {
  var recipientId = availables[Math.floor(Math.random()*availables.length)];
  console.log("randomSearch: " + recipientId + " " + callerId);
  if (recipientId == callerId) {return randomSearch(callerId);}
  return recipientId;
};

module.exports.randomSearch = randomSearch;