// set the "REMOTE" video element source
var _showRemoteStream = function (stream) {
  refs.remoteVideo.attr('src', window.URL.createObjectURL(stream));
};

var _search = function () {
  console.log('trying to send a message');
  if (refs.talking) {
    if (refs.call)
    {
      refs.call.close();
      refs.call = null;
    }
    refs.talking = false;
  }

  if (!refs.peer) {
    logError('please connect first');
  }

  /*
  if (!refs.localStream) {
    logError('could not search for a user because there is no localStream ready');
    return;
  }
  */
  refs.box_messages.html("");
  refs.entry_message.val('');
  refs.socket.emit('toc', refs.caller_id, refs.language);
  return;
};

// answer an incoming call
var _answer = function (incoming_call) {
  if (!refs.peer) {
    logError('cannot answer a call without a connection');
    return;
  }

  if (!refs.localStream) {
    logError('could not answer call as there is no localStream ready');
    return;
  }
  console.log('Answer ha sido llamado');
  refs.peer.on('connection', function(data_connection) {
    refs.data_connection = data_connection;
    refs.data_connection.on('open', function() {
    console.log('Answer ha enviado su información');
      refs.data_connection.send({user: refs.user});
    });
    refs.data_connection.on('data', function(data) {
    console.log('Answer ha recibido esto');

      console.log(data);
      if (data.message)
      {
        writeMessage(data.message);
      }
      if (data.user)
      {
        angular.element($('#TalkController')).scope().getRecipientUser(data.user);
      }
    });
    refs.data_connection.on('close', function() {
      console.log('Answer lo ha cerrado!');
      refs.data_connection = null;
    });
  });

  refs.call = incoming_call;
  logMessage('incoming call answered');
  refs.call.on('stream', _showRemoteStream);
  refs.call.on('close', function() {
    logError("The conversation with the user " + refs.call.peer + " finished");
    if (refs.data_connection)
    {
      refs.data_connection.close();
    }
    refs.call = null;
    refs.talking = false;
  });


  refs.call.answer(refs.localStream);
  refs.talking = true;
  logMessage("You are talking with " + refs.call.peer + " right now :)");
  end_load();
};
/*
var sendMessageEntry = function(key) {
  if (key.keyCode == 13) {
    send();
  }
  return;
};

var _sendMessage = function(key) {
    if (!key)
    {
      return;
    }
    if (key.keyCode != 13)
    {
      return;
    }
    if (!refs.peer) {
      logError('cannot answer a call without a connection');
    }

    else if (!refs.localStream) {
      logError('could not answer call as there is no localStream ready');
    }

    else if ((!refs.data_connection) || (!refs.call)) {
      logError('Nobody is talking with you right now. Search someone first!');
    }
    else
    {
      var message = refs.entry_message.val().trim();
      if (message) {
        refs.data_connection.send(message);
        writeMessage(callerId, message);
      }
    }
    refs.entry_message.val('');
    return;
};
*/