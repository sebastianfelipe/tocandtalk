
// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', 'sListen', function ($scope, $http, $log, sStage, sListen) {
	refs.body = scope = $scope.body = {};
	scope.lang = {};
	scope.user = {};
	scope.recUser = {};
    scope.messages = []; // Arreglo de mensajes
    scope.newMsg = {}; // Mensaje enviado
    scope.rcvMsg = {}; // Mensaje recibido

	scope.sendMessage = function ()
	{
        var message = {};
        message.type = "sender";
        message.content = scope.tmpMessage.trim();
        if (message.content)
        {   
            if (refs.conn.data.open)
            {
                var data = {};
                data.message = message.content;
                refs.conn.data.send(data);
                scope.messages.push(message);
            }
            else
            {
                $log.error('The connection has not been stablished');
            }
        }
        scope.tmpMessage = "";
	};

    scope.getMessage = function(content)
    {
        var message = {};
        message.type = "receiver";
        message.content = content.trim();
        if (message.content)
        { 
            if (refs.conn.data.open)
            {
                ChatNotification.new_msg();
                scope.messages.push(message);
            }
            else
            {
                $log.error('The connection has not been stablished');
            }
        }
        if (chat_visible()) {$scope.$apply();};
    };

    scope.nextUser = function (params) {
        var tLang =  'es';
        start_load();
        if (params.conn.data.open)
        {
            params.conn.data.close();
        }

        if (params.conn.media.open)
        {
            params.conn.media.close();
        }
        sStage.clear(params);
        console.log('nextUser in action');
        params.conn.socket.emit('ask', tLang);
    };

    scope.onNextUserClick = function () {
        scope.nextUser(refs);
    }

    scope.connect = function (params) {
      var id = params.body.user.id;
      
      if (!id) {
        $log.error("There is no id to connect to the server");
        return false;
      }

      // Socket.io Connection
      // --------------------------------------------------------
      try {
        var socketOptions = {secure: params.meta.conn.secure};
        params.conn.socket = io(params.meta.conn.url);
        // Peer Listening
        // ------------------------------
        sListen.onSocket(params);
        // ------------------------------
      }
      catch (e) {
        params.conn.socket = {};
        $log.error('An error occurred while connecting with the Socket Server: ' + e);
      }
      // --------------------------------------------------------

      // P2P Connection
      // --------------------------------------------------------
      try {
        var peerOptions = {key: 'peerjs',
                            host: params.meta.conn.hostName,
                            port: params.meta.conn.serverPort,
                            secure: params.meta.conn.secure,
                            debug: 0};
        params.conn.peer = new Peer(id, peerOptions);
        // Peer Listening
        // ------------------------------
        sListen.onPeer(params);
        // ------------------------------
      }
      catch (e) {
        params.conn.peer = {};
        $log.error('An error occurred while connecting with the P2P Server: ' + e);
      }
      // --------------------------------------------------------
    };

    scope.getLocalStream = function (params)
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
          $log.error("getUserMedia() is not supported.");
          return;
        }
        // Prefer camera resolution nearest to 1280x720.
        var constraints = { audio: true, video: true };
            
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                params.conn.localStream = stream;
                //$('#local-video').attr('src', window.URL.createObjectURL(refs.conn.localStream));
                sStage.setLocalVideo(refs);
                //enable_buttons_media();
            })
            .catch(function(err) {
                $log.error(err.name + ": " + err.message);
            });
    };

    scope.getLocalStream(refs);
    sStage.getSources(refs);
    sStage.load(refs);
}]);