document.addEventListener('DOMContentLoaded', function () {
  // PeerJS server location
  var server_ip = null;
  var server_port = null;

  // DOM elements manipulated as user interacts with the app
  // Information Boxes
  var tracking_box = document.querySelector('#tracking');
  var messages_box = document.querySelector('#messages');

  // Entries
  var callerIdEntry = document.querySelector('#caller-id');
  var messageEntry = document.querySelector('#message-entry');

  // Buttons
  var searchBtn = document.querySelector('#search');
  var sendMessageBtn = document.querySelector('#send-message');

  // Stream
  var remoteVideo = document.querySelector('#remote-video');
  var localVideo = document.querySelector('#local-video');

  // the ID set for this client
  //var callerId = null;

  // PeerJS object, instantiated when this client connects with its
  // caller ID
  var peer = null;

  // the local video stream captured with getUserMedia()
  var localStream = null;

  // socket
  var socket = null;

  // talking
  var talking = false;

  // call
  var call = null;

  // dataConnection
  var dataConnection = null;

  // DOM utilities
  var makePara = function (text) {
    var p = document.createElement('p');
    p.innerText = text;
    return p;
  };

  var addMessage = function (para) {
    if (tracking_box.firstChild) {
      tracking_box.insertBefore(para, tracking_box.firstChild);
    }
    else {
      tracking_box.appendChild(para);
    }
  };

  var logError = function (text) {
    var p = makePara('ERROR: ' + text);
    p.style.color = 'red';
    addMessage(p);
  };

  var logMessage = function (text) {
    addMessage(makePara(text));
  };

  // get the local video and audio stream and show preview in the
  // "LOCAL" video element
  // successCb: has the signature successCb(stream); receives
  // the local video stream as an argument

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    return;
  };

  function writeMessage(id, message) {
    if (callerId == id) {id = "You";}
    para = makePara(id + ": " + message);
    if (messages_box.firstChild) {
      messages_box.insertBefore(para, messages_box.firstChild);
    }
    else {
      messages_box.appendChild(para);
    }
    return;
  };

  function send() {
    if (!peer) {
      logError('cannot answer a call without a connection');
    }

    else if (!localStream) {
      logError('could not answer call as there is no localStream ready');
    }

    else if ((!dataConnection) || (!call)) {
      logError('Nobody is talking with you right now. Search someone first!');
    }
    else if (messageEntry.value.trim()) {
      dataConnection.send(messageEntry.value.trim());
      writeMessage(callerId,messageEntry.value.trim());
    }
    document.getElementById("message-entry").value = "";
    return;
  };

  var sendMessage = function () {
    send();
  };

  var sendMessageEntry = function(key) {
    if (key.keyCode == 13) {
      send();
    }
    return;
  }

 var getLocalStream = function (successCb) {
    if (localStream && successCb) {
      successCb(localStream);
    }
    else {
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
        localStream = stream;
        localVideo.src = window.URL.createObjectURL(stream);
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
      /*
      navigator.webkitGetUserMedia(
          {
            audio: false,
            video: true
          },

          function (stream) {
            localStream = stream;

            localVideo.src = window.URL.createObjectURL(stream);

            if (successCb) {
              successCb(stream);
            }
          },

          function (err) {
            logError('failed to access local camera');
            logError(err.message);
          }
      );
      */
    }
  };

  // set the "REMOTE" video element source
  var showRemoteStream = function (stream) {
    remoteVideo.src = window.URL.createObjectURL(stream);
  };

  var search = function () {
    if (talking) {
      if (call)
      {
        call.close();
        call = null;
      }
      talking = false;
    }

    if (!peer) {
      logError('please connect first');
    }

    if (!localStream) {
      logError('could not search for a user because there is no localStream ready');
      return;
    }
    document.getElementById("messages").innerHTML = "";
    document.getElementById("message-entry").value = "";
    document.getElementById("tracking").innerHTML = "";
    socket.emit('toc', callerId);
    return;
  };

  // answer an incoming call
  var answer = function (incomingCall) {
    if (!peer) {
      logError('cannot answer a call without a connection');
      return;
    }

    if (!localStream) {
      logError('could not answer call as there is no localStream ready');
      return;
    }
    call = incomingCall;
    logMessage('incoming call answered');
    call.on('stream', showRemoteStream);
    call.on('close', function() {
      logError("The conversation with the user " + call.peer + " finished");
      dataConnection.close();
      call = null;
      talking = false;
    });


    call.answer(localStream);
    talking = true;
    logMessage("You are talking with " + call.peer + " right now :)");
  };

  // set caller ID and connect to the PeerJS server
  function connect() {
    //callerId = callerIdEntry.value;

    if (!callerId) {
      logError('please set caller ID first');
      return false;
    }

    if ((!server_ip) || (!server_port))
    {
      logError('Problem with the server connection. Please reload the page');
      return false;  
    }

    try {
      // create connection to the ID server
      peer = new Peer(callerId, {key: '6sdshp5kg3edbo6r', host: server_ip, port: server_port});
      //peer = new Peer(callerId, {key: '6sdshp5kg3edbo6r'});
      // hack to get around the fact that if a server connection cannot
      // be established, the peer and its socket property both still have
      // open === true; instead, listen to the wrapped WebSocket
      // and show an error if its readyState becomes CLOSED
      /*
      peer.socket._socket.onclose = function () {
        logError('no connection to server');
        //peer = null;
      };
      */

      // get local stream ready for incoming calls once the wrapped
      // WebSocket is open
      /*
      peer.socket._socket.onopen = function () {
        //getLocalStream();
      };
      */
      peer.on('connection', function(dataConnectionPeer) {
        dataConnection = dataConnectionPeer;
        dataConnection.on('data', function(data) {
          writeMessage(dataConnection.peer, data);
        });
        dataConnection.on('close', function() {
          dataConnection = null;
        });
      });
      peer.on('call',answer);
      return true;
    }
    catch (e) {
      peer = null;
      logError('error while connecting to server');
      return false;
    }
  };

  function talk (recipientId) {
    if (!peer) {
      logError('please connect first');
      return;
    }

    if (!localStream) {
      logError('could not start call as there is no local camera');
      return
    }

    //var recipientId = recipientIdEntry.value;

    if (!recipientId) {
      logError('could not start call as no recipient ID is set');
      return;
    }

    getLocalStream(function (stream) {
      logMessage('outgoing call initiated');

      call = peer.call(recipientId, stream);
      call.on('stream', showRemoteStream);
      call.on('error', function (e) {
        logError('error with call');
        logError(e.message);
      });
      call.on('close', function() {
          logError("The conversation with the user " + call.peer + " finished");
          dataConnection.close();
          call = null;
          talking = false;
      });
    });
    dataConnection = peer.connect(recipientId);
    dataConnection.on('data', function(data) {
      writeMessage(dataConnection.peer, data);
    });
    dataConnection.on('close', function() {
      dataConnection = null;
    });
    talking = true;
    logMessage("You are talking with " + recipientId + " right now :)");
    return;
  };

  // Main
  if (!socket)
  {
    
    socket = io();
    socket.on('receiveConnection', function(data) {
      server_ip = data["ip"];
      server_port = data["port"];
      document.getElementById('user').innerHTML = "User connected as " + callerId;
      getLocalStream();
      connect();
    });

    socket.on('tocAnswer', function (wait){
    if (wait)
    {
      //socket.emit('push',callerId);
      logMessage('Wait a moment for someone to talk');
    }
    else
    {
      socket.emit('get',callerId);
      logMessage('Wait a moment for someone to talk');
    }
    });

    socket.on('talk', function(recipientId){
      talk(recipientId);
    });
  }
  // Finish Main

  // wire up button events
  searchBtn.addEventListener('click',search);
  sendMessageBtn.addEventListener('click',sendMessage);
  messageEntry.addEventListener('keypress', sendMessageEntry);
});
