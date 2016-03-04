// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
    this.setUser = function(params) {
        params.body.user = params.sources.user;
    };

    this.setRecUser = function(params) {
        params.body.recUser = params.sources.recUser;
        console.log('yeah!');
    };

    this.setLang = function (params) {
        params.body.lang = params.sources.lang;
        document.title = params.body.lang.title;
    };

    this.setLocalVideo = function (params)
    {
        $log.info('Setting the local video');
        console.log(params.conn.localStream);
        if (params.conn.localStream.active)
        {
            $('#local-video').attr('src', window.URL.createObjectURL(params.conn.localStream));
        }
    };

    this.setRemoteVideo = function (params)
    {
        $log.info('Setting the remote video');
        console.log(params.conn.remoteStream);
        if (params.conn.remoteStream.active)
        {
            $('#remote-video').attr('src', window.URL.createObjectURL(params.conn.remoteStream));
        }
    };

    this.showErrors = function (errors)
    {
      
    };

    this.clear = function (params)
    {
        params.body.messages = [];
        params.body.recUser = params.sources.recUser = {};
        params.conn.auth = {};
    };

    this.load = function (params)
    {	
        this.showErrors(params.errors);
    };

    this.reload = function (params)
    {
        this.clear(params);
	    this.setUser(params);
        this.setRecUser(params);
        this.showErrors(params.errors);
    };

	this.getSources = function (params)
    {
        
        $http.get('/api/get/user')
            .success(function (result) {
                /* Nombre de Usuario */
                params.sources.user = result.doc;
                service.setUser(params);
                // Temporal
                // ---------------------
                params.body.connect(params);
                params.body.onNextUserClick(params);
                // ---------------------
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
        });

        $http.get('/api/get/lang/'+params.meta.lang+'/'+params.meta.view)
            .success(function (result) {
                params.sources.lang = result;
                service.setLang(params);
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
        });
    };
}]);

app.service('sListen', ['$http', '$log', 'sStage', function ($http, $log, sStage) {
    var service = this;

    this.onDataConnection = function (params)
    {
        params.conn.data.on('open', function () {
            end_load();
            $log.info("A data connection was recieved");
            if (params.conn.auth.call)
            {
                var data = {};
                data.auth = {recId: params.conn.auth.recId, convId: params.conn.auth.convId};
                data.user = params.body.user; 
                params.conn.data.send(data);
            }
        });

        params.conn.data.on('data', function (data) {
            $log.info("Data received");
            if (data.auth)
            {
                if (params.conn.auth.convId == data.auth.convId)
                {
                    params.conn.data.send({'user': params.body.user});
                }
                else
                {
                    params.conn.data.close();
                }
            }

            if (data.user)
            {
                params.sources.recUser = data.user;
                sStage.setRecUser(params);
                //$scope.$apply();
            }

            if (data.message)
            {
                params.body.getMessage(data.message);
            }
        });
        params.conn.data.on('close', function () {
            $log.info('The another peer has closed');
        });
    }

    this.onMediaConnection = function (params)
    {
        $log.info('A call was received');
        $log.info('Someone has called');
        params.conn.media.on('stream', function (stream) {
            $log.info('onMediaConnection stream');
            params.conn.remoteStream = stream;
            sStage.setRemoteVideo(params);
        })
    };

    this.onSocket = function (params)
    {
        params.conn.socket.on('ansAsk', function(answer) {
            $log.info('The answer ansAsk was received from the server');
            params.conn.auth = answer;
            if (answer.call)
            {
                if (params.conn.peer)
                {
                    $log.info('Peer exists');
                    
                    params.conn.data = refs.conn.peer.connect(answer.recId);
                    if (params.conn.data)
                    {
                        service.onDataConnection(params);
                    }

                    if (params.conn.localStream.active)
                    {
                        $log.info('LocalStream is ready to go');
                        $log.info('This peer will call someone');
                        params.conn.media = params.conn.peer.call(answer.recId, params.conn.localStream);
                        console.log(params.conn.media);
                        if (params.conn.media)
                        {
                            $log.info('This peer has a call')
                            service.onMediaConnection(params);
                        }
                    }
                }
            }
        });
    };

    this.onPeer = function (params)
    {
        params.conn.peer.on('call', function (call) {
            $log.info('a perr.on call connection was received');
            params.conn.media = call;
            params.conn.media.answer(refs.conn.localStream);
            service.onMediaConnection(refs);
        });

        params.conn.peer.on('connection', function (dataConnection) {
            params.conn.data = dataConnection;
            service.onDataConnection(refs);
        });
    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', 'sListen', function($http, $log, sStage, sListen) {
	var service = this;

    this.onGetLocalStream = function (params)
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

    this.onConnect = function (params) {
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

    this.onNextUser = function (params) {
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
        params.conn.socket.emit('ask', params.body.language);
    };

    this.onSendMessage = function (params, content)
    {
        var message = {};
        message.type = "sender";
        message.content = content.trim();
        if (message.content)
        {   
            if (params.conn.data.open)
            {
                var data = {};
                data.message = message.content;
                params.conn.data.send(data);
                params.body.messages.push(message);
            }
            else
            {
                $log.error('The connection has not been stablished');
            }
        }
        params.body.tmpMessage = "";
    };

    this.onGetMessage = function (params, content)
    {
        var message = {};
        message.type = "receiver";
        message.content = content.trim();
        if (message.content)
        { 
            if (params.conn.data.open)
            {
                ChatNotification.new_msg();
                params.body.messages.push(message);
            }
            else
            {
                $log.error('The connection has not been stablished');
            }
        }
    };
}]);

