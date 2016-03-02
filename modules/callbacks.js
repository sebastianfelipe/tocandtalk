// Node Modules
var ip = require('ip');

// Module Imports
var search_module = require('./search.js');
var global_module = require('./global.js');
var functions_module = require('./functions.js');

// Function Imports
var randomSearch = search_module.randomSearch;
var wasItAdded = functions_module.wasItAdded;
var createCode = functions_module.createCode;
var indexOfUser = functions_module.indexOfUser;

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
  /*
  user_index_id = users.indexOf(id);
  if (user_index_id > -1)
  {
    users.splice(user_index_id, 1); 
  }

  for (language in availables)
  {
    availables_index_id = availables[language].indexOf(id);
    if (availables_index_id > -1)
    {
      availables[language].splice(availables_index_id, 1); 
    }
  }
  console.log(users);
  console.log(availables);
  */
}

var _ioConnection = function(socket) {
  console.log('IO: User connected');
  //var userId = Math.floor(Math.random()*9999999999).toString();
  //console.log("IO: User Id was generated: " + userId);
  
  socket.on('ask', function (callerId, language) {
    var answer = {};
    answer.call = true;
    console.log(callerId);
    console.log(language);
    console.log('IO: ' + callerId + ' wants to verify if has to wait (be called) or is available (to call)');

    if (!(language in availables))
    {
      availables[language] = [];
    }

    if (availables[language].length < limit)
    {
      answer.call = false;
    }

    if (answer.call)
    {
      var user = randomSearch(callerId, language);
      var recId = user.userId
      answer.recId = recId;
      answer.convId = user.convId;
      console.log("IO: The get result has recipient_id: " + recId + " and caller_id: " + callerId);

      availablesIndexCallerId = indexOfUser(availables, callerId, language);
      availablesIndexRecId = indexOfUser(availables, recId, language);
      console.log('Availables before be removed:');
      console.log(availables);
      if (availablesIndexCallerId > -1)
      {
        availables[language].splice(availablesIndexCallerId, 1); 
      }
      if (availablesIndexRecId > -1)
      {
        availables[language].splice(availablesIndexRecId, 1); 
      }
    }

    else
    {
      var indexCaller = indexOfUser(availables, callerId, language);
      if (indexCaller > -1)
      {
        availables[language].splice(indexCaller, 1);
      }
      var user = {};
      user.userId = callerId;
      user.convId = createCode();
      answer.convId = user.convId;
      availables[language].push(user);
      console.log('IO: Push -> ' + callerId);
    }

    console.log("IO: Does " + callerId + " it has to call? " + answer.call);
    console.log('IO: Availables ');
    console.log(availables);
    socket.emit('ansAsk', answer);
  });







  data = {"ip": ip.address(),
          "port": port2};


  socket.emit('receiveConnection',data);

  socket.on('disconnect', function(){
    console.log('IO: User disconnected');
  });

  socket.on('toc', function(caller_id, language){
    console.log('IO: ' + caller_id + ' wants to verify if has to wait (be called) or is available (to call)');
    console.log('IO: Push -> ' + caller_id);
    if (!(language in availables))
    {
      availables[language] = [];
    }
    if (availables[language].indexOf(caller_id) == -1)
    {
      console.log('IO: Push -> Is first time, so it was added');
      availables[language].push(caller_id);
    }
    else
    {
      console.log('IO: It was not added');
    }

    var wait = false;
    if (availables[language].length <= limit)
    {
      wait = true;
    }

    console.log("IO: Does " + caller_id + " it has to wait? " + wait);
    console.log('IO: Availables ');
    console.log(availables);
    socket.emit('tocAnswer', wait);
  });

  socket.on('get', function(caller_id, language) {
      var recipient_id = randomSearch(caller_id, language);
      console.log("IO: The get result has recipient_id: " + recipient_id + " and caller_id: " + caller_id);

      availables_index_caller_id = availables[language].indexOf(caller_id);
      availables_index_recipient_id = availables[language].indexOf(recipient_id);
      if (availables_index_caller_id > -1)
      {
        availables[language].splice(availables_index_caller_id, 1); 
      }
      if (availables_index_recipient_id > -1)
      {
        availables[language].splice(availables_index_recipient_id, 1); 
      }
      console.log('Availables:');
      console.log(availables);
      socket.emit('talk',recipient_id);
  });
}

module.exports._peerConnection = _peerConnection;
module.exports._peerDisconnect = _peerDisconnect;
module.exports._ioConnection = _ioConnection;
