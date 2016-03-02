// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
	this.setUser = function(params) {
        params.body.user = params.sources.user;
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
	    if ($('#img-section2').height() >= 40) {
	        var new_margin = 100 - (($('#img-section2').height() - 36) / 2);
	        $('#img-section2').css("margin-top", new_margin + "px");
	    }
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
    		
    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', function($http, $log, sStage) {
	var service = this;
	
	this.onUpdateUserNationalitySubmit = function (params) {
        return function () {
            var data = {
                         s_country: params.fUpdateUserNationality.sUserNationality,
                       };
            
            $http.post('/profile/edit_user_nationality', data)
                .success(function (result) {
                	console.log(result);
                    params.errors = result.errors;
                    params.sources.user = result.user;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
	};

	this.onUpdateUserDescriptionSubmit = function (params) {
        return function () {
            var data = {
                         input_edit_desc: params.body.user.description,
                       };
            
            $http.post('/profile/edit_user_description', data)
                .success(function (result) {
                    console.log(result);
                    params.errors = result.errors;
                    params.sources.user = result.user;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
			
        };
	};

	this.onSaveUserSpokenLanguageSubmit = function (params) {
        return function () {
            var data = {
                         s_spoken_languages: params.fSaveUserSpokenLanguage.sSpokenLanguage,
                       };
            console.log(data);
            
            $http.post('/profile/add_user_spoken_language', data)
                .success(function (result) {
                    params.errors = result.errors;
                    params.sources.user = result.user;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
	};

	this.onSaveUserInterestLanguageSubmit = function (params) {
        return function () {
            var data = {
                         s_interest_languages: params.fSaveUserInterestLanguage.sInterestLanguage,
                       };
            console.log(data);
            
            $http.post('/profile/add_user_interest_language', data)
                .success(function (result) {
                    params.errors = result.errors;
                    params.sources.user = result.user;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
	};

	this.onRemoveUserSpokenLanguageClick = function (params) {
        return function (id) {
            var data = {
                         remove_spoken_language: id,
                       };
            console.log(data);
            $http.post('/profile/remove_spoken_language', data)
                .success(function (result) {
                	console.log(result);
                    params.errors = result.errors;
                    params.sources.user = result.user;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
	};

	this.onRemoveUserInterestLanguageClick = function (params) {
        return function (id) {
            var data = {
                         remove_interest_language: id,
                       };
            console.log(data);
            
            $http.post('/profile/remove_interest_language', data)
                .success(function (result) {
                	console.log(result);
                    params.errors = result.errors;
                    params.sources.user = result.user;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
	};
}]);