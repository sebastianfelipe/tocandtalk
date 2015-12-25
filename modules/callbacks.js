// Node Modules
var ip = require('ip');
var WebSocketServer = require('ws').Server

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

var _peerConnection = function (id) {

  //console.log(server._clients['peerjs']);
  console.log('P2P: User connected ' + id);
  users.push(id);
  console.log(users);
}

var _peerDisconnect = function (id) {
  console.log('P2P: User disconnected ' + id);
  user_index_id = users.indexOf(id);
  availables_index_id = availables.indexOf(id);
  if (user_index_id > -1)
  {
    users.splice(user_index_id, 1); 
  }
  if (availables_index_id > -1)
  {
    availables.splice(availables_index_id, 1); 
  }

  console.log(users);
  console.log(availables);
}

var _ioConnection = function(socket) {
  var wss = new WebSocketServer({
      server: server,
      path: '/socket.io/' + socket.id
  });
  wss.on('connection', function(ws) {
      ws.on('message', function(message) {
          console.log(message);
      });
  });
  console.log('IO: User connected');
  //var userId = Math.floor(Math.random()*9999999999).toString();
  //console.log("IO: User Id was generated: " + userId);
  data = {"ip": ip.address(),
          "port": port2};
  socket.emit('receiveConnection',data);

  socket.on('disconnect', function(){
    console.log('IO: User disconnected');
  });

  socket.on('toc', function(caller_id){
    console.log('IO: ' + caller_id + ' wants to verify if has to wait (be called) or is available (to call)');
    console.log('IO: Push -> ' + caller_id);
    if (availables.indexOf(caller_id) == -1)
    {
      console.log('IO: Push -> Is first time, so it was added');
      availables.push(caller_id);
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

    console.log("IO: Does " + caller_id + " it has to wait? " + wait);
    console.log('IO: Availables ');
    console.log(availables);
    socket.emit('tocAnswer', wait);
  });

  socket.on('get', function(caller_id) {
      var recipient_id = randomSearch(caller_id);
      console.log("IO: The get result has recipient_id: " + recipient_id + " and caller_id: " + caller_id);

      availables_index_caller_id = availables.indexOf(caller_id);
      availables_index_recipient_id = availables.indexOf(recipient_id);
      if (availables_index_caller_id > -1)
      {
        availables.splice(availables_index_caller_id, 1); 
      }
      if (availables_index_recipient_id > -1)
      {
        availables.splice(availables_index_recipient_id, 1); 
      }
      console.log('Availables:');
      console.log(availables);
      socket.emit('talk',recipient_id);
  });
}

module.exports._peerConnection = _peerConnection;
module.exports._peerDisconnect = _peerDisconnect;
module.exports._ioConnection = _ioConnection;
