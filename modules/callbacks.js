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

var _ioConnection = function(socket) {
  
  var session = socket.handshake.session;
  console.log('IO: User connected');

  socket.on('ask', function (language) {
    var callerId = session._id;
    console.log('IO: on Ask');
    //console.log('The caller Id who has connected');
    //console.log(callerId);
    if (callerId)
    {
      var answer = {};
      answer.call = true;
      //console.log(callerId);
      //console.log(language);
      //console.log('IO: ' + callerId + ' wants to verify if has to wait (be called) or is available (to call)');

      if (!(language in availables))
      {
        availables[language] = [];
      }

      if (availables[language].length < limit)
      {
          answer.call = false;
      }

      if (limit < 2 && (wasItAdded(availables, callerId, language)))
      {
        answer.call = false;
      }
          
      if (answer.call)
      {
        var user = randomSearch(callerId, language);
        var recId = user.userId
        answer.recId = recId;
        answer.convId = user.convId;
        //console.log("IO: The get result has recipient_id: " + recId + " and caller_id: " + callerId);
        //console.log('Availables before be removed:');
        //console.log(availables);

        availablesIndexCallerId = indexOfUser(availables, callerId, language);
        availablesIndexRecId = indexOfUser(availables, recId, language);
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

      //console.log("IO: Does " + callerId + " it has to call? " + answer.call);
      //console.log('IO: Availables ');
      //console.log(availables);
      socket.emit('ansAsk', answer);
    }
  });

  socket.on('disconnect', function() {
      console.log('IO: User disconnected');
      console.log(availables);
      for (var lang in availables)
      {
        var indexId = indexOfUser(availables, id, lang);
        if (indexId > -1)
        {
          availables[language].splice(indexId, 1);
        }
      }
      console.log(availables);
  });
};

var _peerConnection = function (id) {

  console.log('P2P: User connected ' + id);
  //users.push(id);
};

var _peerDisconnect = function (id) {
  console.log('P2P: User disconnected ' + id);
};

module.exports._ioConnection = _ioConnection;
module.exports._peerConnection = _peerConnection;
module.exports._peerDisconnect = _peerDisconnect;
