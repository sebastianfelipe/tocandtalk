var logError = function (text) {
  console.log('ERROR: ' + text);
};

var logMessage = function (text) {
  console.log(text);
};

var writeMessage = function(id, message) {
  if (refs.callerId == id) {id = "You";}
  var message = '<p>' + id + ": " + message +'</p>';
  refs.box_messages.append(message);
  return;
};

var getLocalStream = function (successCb)
{
  if (refs.localStream && successCb) {
      successCb(refs.localStream);
  }
  else
  {
    navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia) ? {
       getUserMedia: function(c) {
         return new Promise(function(y, n) {
           (navigator.mozGetUserMedia ||
            navigator.webkitGetUserMedia).call(navigator, c, y, n);
         });
       }
    } : null);

    if (!navigator.mediaDevices) {
      logError("getUserMedia() not supported.");
      return;
    }
    // Prefer camera resolution nearest to 1280x720.
    var constraints = { audio: false, video: true };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      refs.localStream = stream;
      refs.localVideo.attr('src', window.URL.createObjectURL(stream));
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
  }
};

// set caller ID and connect to the PeerJS server
var connect = function () {
  if (!refs.caller_id) {
    logError('please set caller ID first');
    return false;
  }

  if ((!refs.server_ip) || (!refs.server_port))
  {
    logError('Problem with the server connection. Please reload the page');
    return false;  
  }

  try {
    //refs.peer = new Peer(refs.caller_id, {key: refs.peer_key, host: refs.server_ip, port: refs.server_port});
    //refs.peer = new Peer(refs.caller_id, {host: refs.server_ip, port: refs.server_port});
    //refs.peer = new Peer(refs.caller_id, {host: refs.server_ip, port: refs.server_port, path: refs.peer_path});
    refs.peer = new Peer(refs.caller_id, {host: refs.server_ip, port: refs.peer_port, path: refs.peer_path});
    refs.peer = new Peer(refs.caller_id, {host: refs.server_ip, port: refs.peer_port});
    //console.log(peer);
    refs.peer.on('connection', function(data_connection) {
      refs.data_connection = data_connection;
      refs.data_connection.on('data', function(data) {
        writeMessage(data_connection.peer, data);
      });
      refs.data_connection.on('close', function() {
        refs.data_connection = null;
      });
    });
    refs.peer.on('call', _answer);
  }
  catch (e) {
    refs.peer = null;
    logError('error while connecting to server');
  }
};

var talk = function (recipient_id) {
  if (!refs.peer) {
    logError('please connect first');
    return;
  }

  if (!refs.localStream) {
    logError('could not start call as there is no local camera');
    return
  }

  if (!recipient_id) {
    logError('could not start call as no recipient ID is set');
    return;
  }

  getLocalStream(function (stream) {
    logMessage('outgoing call initiated');

    refs.call = refs.peer.call(recipient_id, stream);
    refs.call.on('stream', _showRemoteStream);
    refs.call.on('error', function (e) {
      logError('error with call');
      logError(e.message);
    });
    refs.call.on('close', function() {
        logError("The conversation with the user " + refs.call.peer + " finished");
        refs.data_connection.close();
        refs.call = null;
        refs.talking = false;
    });
  });
  refs.data_connection = refs.peer.connect(recipient_id);
  refs.data_connection.on('data', function(data) {
    writeMessage(refs.data_connection.peer, data);
  });
  refs.data_connection.on('close', function() {
    refs.data_connection = null;
  });
  refs.talking = true;
  logMessage("You are talking with " + recipient_id + " right now :)");
  return;
};

