var logError = function (text) {
  console.log('ERROR: ' + text);
};

var logMessage = function (text) {
  console.log(text);
};

var writeMessage = function(message) {
  /*
  if (refs.callerId == id) {id = "You";}
  var message = '<p>' + id + ": " + message +'</p>';
  refs.box_messages.append(message);
  */
  angular.element($('#TalkController')).scope().getMessage(message);
  return;
};

var getLocalStream = function (successCb)
{
  if (refs.localStream && successCb) {
      successCb(refs.localStream);
  }
  else
  {
    navigator.mediaDevices = navigator.mediaDevices || ((navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia) ? {
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
    var constraints = { audio: true, video: true };
        
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            refs.localStream = stream;
            refs.localVideo.attr('src', window.URL.createObjectURL(stream));
            
            enable_buttons_media();
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
  
  if ((!refs.server_ip) || (!refs.server_ports.peer))
  {
    logError('Problem with the server connection. Please reload the page');
    return false;  
  }

  try {
    var peer_options = {key: 'peerjs',
                        host: refs.host_name,//refs.server_ip, //"https.tocandtalk.com",
                        port: 443,//refs.server_ports.peer,
                        secure: true,
                        debug: 0};
    refs.peer = new Peer(refs.caller_id, peer_options);
    refs.peer.on('call', _answer);
    
  }
  catch (e) {
    refs.peer = null;
    logError('error while connecting to server');
  }
};

var call = function (recipient_id) {
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
        if (refs.data_connection)
        {
          refs.data_connection.close();
        }
        refs.call = null;
        refs.talking = false;
    });
  });
  refs.data_connection = refs.peer.connect(recipient_id);
  refs.data_connection.on('open', function() {
    refs.data_connection.send({user: refs.user});
  });
  refs.data_connection.on('data', function(data) {
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
    refs.data_connection = null;
  });

  refs.talking = true;
  logMessage("You are talking with " + recipient_id + " right now :)");
  return;
};

