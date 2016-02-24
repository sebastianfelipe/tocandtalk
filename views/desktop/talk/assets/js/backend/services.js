// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
	this.showUserInf = function(params) {
        /*
        params.body.user.firstName =capitalize(params.sources.user.first_name);
        params.body.user.lastName = capitalize(params.sources.user.last_name);
        params.body.user.fullName = params.body.user.firstName + " " + params.body.user.lastName;
        params.body.user.nationality = params.sources.user.nationality;
        params.body.user.username = params.sources.user._username;  
        params.body.user.nativeLanguage = params.sources.user.native_language;
        params.body.user.interestLanguages = params.sources.user.interest_languages;
       	params.body.user.spokenLanguages = params.sources.user.spoken_languages;
       	params.body.user.description = params.sources.user.description;
        */
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
	    this.showUserInf(params);
        this.showErrors(params.errors);
    };

	this.getSources = function (params)
	    {
            /*
	        $http.get('/api/get/user')
	            .success(function (result) {
	                // Nombre de Usuario 
	                params.sources.user = result.doc;
	                service.showUserInf(params);
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