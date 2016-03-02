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
        //params.conn.peer.on('call', _answer);
      }
      catch (e) {
        params.conn.peer = null;
        $log.error('error while connecting to server');
      }
    };

    refs.conn.socket = io(refs.meta.conn.url, {secure: refs.meta.conn.secure});
    refs.conn.socket.on('ansAsk', function(answer) {
        if (answer.call)
        {

        }

        else
        {

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