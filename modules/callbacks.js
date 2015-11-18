// Node Modules
var ip = require('ip');

// Module Imports
var search_module = require('./search.js');
var global_module = require('./global.js');

// Function Imports
var randomSearch = search_module.randomSearch;

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;

var peerConnection = function (id) {

  //console.log(server._clients['peerjs']);
  console.log('P2P: User connected ' + id);
  users.push(id);
  console.log(users);
}

var peerDisconnect = function (id) {
  console.log('P2P: User disconnected ' + id);
  users.splice(users.indexOf(id),1);
  availables.splice(availables.indexOf(id),1);
  console.log(users);
  console.log(availables);
}

var ioConnection = function(socket) {
  console.log('IO: User connected');
  //var userId = Math.floor(Math.random()*9999999999).toString();
  //console.log("IO: User Id was generated: " + userId);
  data = {"ip": ip.address(),
          "port": port2};
  socket.emit('receiveConnection',data);

  socket.on('disconnect', function(){
    console.log('IO: User disconnected');
  });

  socket.on('toc', function(callerId){
    console.log('IO: ' + callerId + ' wants to verify if has to wait (be called) or is available (to call)');
    console.log('IO: Push -> ' + callerId);
    if (availables.indexOf(callerId) == -1)
    {
      console.log('IO: Push -> Is first time, so it was added');
      availables.push(callerId);
    }
    else
    {
      console.log('IO: It was not added');
    }

    var wait = false;
    if (availables.length <= limit)
    {
      wait = true;
    }

    console.log("IO: Does " + callerId + " it has to wait? " + wait);
    console.log('IO: Availables ');
    console.log(availables);
    socket.emit('tocAnswer', wait);
  });

  socket.on('get', function(callerId) {
      var recipientId = randomSearch(callerId);
      console.log("IO: The get result has recipientId: " + recipientId + " and callerId: " + callerId);
      availables.splice(availables.indexOf(callerId),1);
      availables.splice(availables.indexOf(recipientId),1);
      console.log('Availables:');
      console.log(availables);
      socket.emit('talk',recipientId);
  });
}

module.exports.peerConnection = peerConnection;
module.exports.peerDisconnect = peerDisconnect;
module.exports.ioConnection = ioConnection;
