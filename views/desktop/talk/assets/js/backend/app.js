// APP

var app = angular.module('tocandtalk', []);

// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
	this.setUser = function(params) {
        params.body.user.firstName =capitalize(params.sources.user.first_name);
        params.body.user.lastName = capitalize(params.sources.user.last_name);
        params.body.user.fullName = params.body.user.firstName + " " + params.body.user.lastName;
        params.body.user.nationality = params.sources.user.nationality;
        params.body.user.username = params.sources.user._username;  
        params.body.user.nativeLanguage = params.sources.user.native_language;
        params.body.user.interestLanguages = params.sources.user.interest_languages;
       	params.body.user.spokenLanguages = params.sources.user.spoken_languages;
       	params.body.user.description = params.sources.user.description;
	};
/*
	this.setRecUser = function(params) {
        params.body.recUser.firstName =capitalize(params.sources.recUser.first_name);
        params.body.recUser.lastName = capitalize(params.sources.recUser.last_name);
        params.body.recUser.fullName = params.body.recUser.firstName + " " + params.body.recUser.lastName;
        params.body.recUser.nationality = params.sources.recUser.nationality;
        params.body.recUser.username = params.sources.recUser._username;  
        params.body.recUser.nativeLanguage = params.sources.recUser.native_language;
        params.body.recUser.interestLanguages = params.sources.recUser.interest_languages;
       	params.body.recUser.spokenLanguages = params.sources.recUser.spoken_languages;
       	params.body.recUser.description = params.sources.recUser.description;
	};
*/
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
                // Nombre de Usuario 
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