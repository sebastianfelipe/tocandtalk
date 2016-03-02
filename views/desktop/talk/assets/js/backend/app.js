// APP

var app = angular.module('tocandtalk', []);

// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
    this.setUser = function(params) {
        params.body.user = params.sources.user;
    };

    this.showErrors = function (errors)
    {
      
    };

    this.clear = function (params)
    {
    };

    this.load = function (params)
    {	
        this.showErrors(params.errors);
    };

    this.reload = function (params)
    {
        this.clear(params);
	    this.setUser(params);
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
		console.log(scope.newMsg.content);
	};

    scope.nextUser = function (params) {
        var tUser = 'pedrito';
        var tLang =  'es';
        refs.conn.socket.emit('ask', params.body.user.username, tLang);

    } ;

    scope.connect = function (params) {
      var username = params.body.user.username;
      if (!username) {
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
        params.conn.peer = new Peer(username, peerOptions);

        // Peer Listening
        // ------------------------------
        params.conn.peer.on('call', function (recId, recConvId) {
            console.log(recId);
            console.log(recConvId);
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
            }
        });
        params.conn.data.on('close', function () {
            $log.info('The another peer has closed');
        });
    }

    refs.conn.socket = io(refs.meta.conn.url, {secure: refs.meta.conn.secure});
    refs.conn.socket.on('ansAsk', function(answer) {
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
                    //refs.conn.data.send(data);
                }
            }
        }
    });



    sStage.getSources(refs);
    sStage.load(refs);
	/*
	scope.loadMessages = function() {
	    scope.$apply();
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