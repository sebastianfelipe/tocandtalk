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

	sStage.getSources(refs);
	sStage.load(refs);

	scope.sendMessage = function ()
	{
		console.log(scope.newMsg.content);
	};

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

app.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? capitalize(input) : '';
    }
});