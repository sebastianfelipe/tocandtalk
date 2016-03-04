// APP

var app = angular.module('tocandtalk', []);

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

    this.showErrors = function (errors)
    {
      
    };

    this.clear = function (params)
    {
        params.body.messages = [];
        params.body.recUser = params.sources.recUser = {};
        params.meta.auth = {};
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
                params.body.nextUser(params);
                // ---------------------
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
        });

        $http.get('/api/get/lang/'+params.meta.lang+'/'+params.meta.view)
            .success(function (result) {
                params.body.lang = result;
                document.title = params.body.lang.title;
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
    
    refs.socket = io(refs.meta.conn.url, {secure: refs.meta.conn.secure});

		/*	            
        $http.get('/api/get/languages')
            .success(function (result) {
                params.sources.languages = result.docs;
                params.body.languages = params.sources.languages;
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });

        $http.get('/api/get/countries')
            .success(function (result) {
                params.sources.countries = result.docs;
                params.body.countries = params.sources.countries;
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
		*/
    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', function($http, $log, sStage) {
	var service = this;
	
}]);

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
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
        if (params.conn.data.open)
        {
            start_load();
            params.conn.data.close();
            params.conn.media.close();
        }
        sStage.clear(params);
        params.conn.socket.emit('ask', params.body.user.id, tLang);
    };

    scope.onNextUserClick = function () {
        scope.nextUser(refs);
    }

    scope.connect = function (params) {
      var id = params.body.user.id;
      if (!id) {
        $log.error('please set caller ID first');
        return false;
      }
      /*
      if ((!refs.server_ip) || (!refs.server_ports.peer))
      {
        logError('Problem with the server connection. Please reload the page');
        return false;  
      }
      */

      try {
        var peerOptions = {key: 'peerjs',
                            host: params.meta.conn.hostName,//refs.server_ip, //"https.tocandtalk.com",
                            port: params.meta.conn.serverPort,//refs.server_ports.peer,
                            secure: params.meta.conn.secure,
                            debug: 0};
        params.conn.peer = new Peer(id, peerOptions);

        // Peer Listening
        // ------------------------------
        params.conn.peer.on('call', function (call) {
            $log.info('a perr.on call connection was received');
            params.conn.media = call;
            params.conn.media.answer(refs.conn.localStream);
            params.body.onMediaConnection(refs);
        });

        params.conn.peer.on('connection', function (dataConnection) {
            params.conn.data = dataConnection;
            params.body.onDataConnection(refs);
        });
        // ------------------------------
      }
      catch (e) {
        params.conn.peer = null;
        $log.error('error while connecting to server');
      }
    };

    scope.onDataConnection = function (params)
    {
        params.conn.data.on('open', function () {
            end_load();
            $log.info("A data connection was recieved");
            if (params.meta.auth.call)
            {
                var data = {};
                data.auth = {recId: params.meta.auth.recId, convId: params.meta.auth.convId};
                data.user = params.body.user; 
                refs.conn.data.send(data);
            }
        });
        params.conn.data.on('data', function (data) {
            $log.info("Data received");
            if (data.auth)
            {
                if (params.meta.auth.convId == data.auth.convId)
                {
                    params.conn.data.send({'user': params.body.user});
                }
                //else
                //{
                    //params.conn.data.close();
                //}
            }

            if (data.user)
            {
                params.sources.recUser = data.user;
                sStage.setRecUser(params);
                $scope.$apply();
            }

            if (data.message)
            {
                scope.getMessage(data.message);
            }
        });
        params.conn.data.on('close', function () {
            $log.info('The another peer has closed');
        });
    }

    scope.onMediaConnection = function (params)
    {
        $log.info('A call was received');
        $log.info('Someone has called');
        params.conn.media.on('stream', function (stream) {
            $log.info('onMediaConnection stream');
            params.conn.remoteStream = stream;
            params.body.setRemoteVideo(params);
        })
        /*
        params.conn.data.on('open', function () {
        });
        params.conn.data.on('data', function (data) {
        });
        params.conn.data.on('close', function () {
            $log.info('The another peer has closed');
        });
        */
    }

    scope.getLocalStream = function (params)
    {
        /*
      if (refs.conn.localStream && successCb) {
          successCb(refs.conn.localStream);
      }
      else
      {
        */
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
                params.body.setLocalVideo(refs);
                //enable_buttons_media();
            })
            .catch(function(err) {
                $log.error(err.name + ": " + err.message);
            });
      /*
      }
      */
    };

    scope.setLocalVideo = function (params)
    {
        $log.info('Setting the local video');
        console.log(params.conn.localStream);
        if (params.conn.localStream.active)
        {
            $('#local-video').attr('src', window.URL.createObjectURL(params.conn.localStream));
        }
    };

    scope.setRemoteVideo = function (params)
    {
        $log.info('Setting the remote video');
        console.log(params.conn.remoteStream);
        if (params.conn.remoteStream.active)
        {
            $('#remote-video').attr('src', window.URL.createObjectURL(params.conn.remoteStream));
        }
    };

    refs.conn.socket = io(refs.meta.conn.url, {secure: refs.meta.conn.secure});
    refs.conn.socket.on('ansAsk', function(answer) {
        $log.info('The answer ansAsk was received from the server');
        refs.meta.auth = answer;
        if (answer.call)
        {
            if (refs.conn.peer)
            {
                $log.info('Peer exists');
                
                refs.conn.data = refs.conn.peer.connect(answer.recId);
                if (refs.conn.data)
                {
                    scope.onDataConnection(refs);
                }

                if (refs.conn.localStream.active)
                {
                    $log.info('LocalStream is ready to go');
                    $log.info('This peer will call someone');
                    refs.conn.media = refs.conn.peer.call(answer.recId, refs.conn.localStream);
                    console.log(refs.conn.media);
                    if (refs.conn.media)
                    {
                        $log.info('This peer has a call')
                        scope.onMediaConnection(refs);
                    }
                }
            }
        }
    });

    scope.getLocalStream(refs);
    sStage.getSources(refs);
    sStage.load(refs);
	
    /*
    scope.tabChat = true;

    scope.onChatClick = function () {
        scope.tabChat = true;
        $log.info('onChatClick');
    };

    scope.onProfileClick = function () {
        scope.tabChat = false;
        $log.info('onProfileClick');
    };

	scope.loadMessages = function() {
	    $scope.$apply();
	};
    */
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                //console.log('Se ha presionado el enter');
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

app.directive('updateChat', function() {
    return function(scope, element, attrs) {
        chat_position();
        chat_scroll_bottom();
    };
});