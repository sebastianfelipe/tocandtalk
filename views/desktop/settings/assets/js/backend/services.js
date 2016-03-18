// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
	this.setUser = function(params) {
        params.body.user = params.sources.user;
        console.log(params.sources.user.lang);
        //params.fUpdateUserLang.sUserLang = params.body.user.lang.code || "";
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
	    this.setUser(params);
        this.showErrors(params.errors);
    };

    this.getLang = function (params)
    {
        console.log(params.meta.lang);
        console.log('/api/get/lang/'+params.meta.lang+'/'+params.meta.view);
        $http.get('/api/get/lang/'+params.meta.lang+'/'+params.meta.view)
            .success(function (result) {
                params.body.lang = result;
                document.title = params.body.lang.title;
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
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

            $http.get('/api/get/langs')
                .success(function (result) {
                    console.log(result);
                    params.sources.languages = result.docs;
                    params.body.langs = params.sources.languages;
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
                });
    		
    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', function($http, $log, sStage) {
	var service = this;

    this.onUpdateUserLangSubmit = function (params) {
        return function () {
            var data = {
                         code: params.fUpdateUserLang.sUserLang,
                       };
            
            $http.post('/api/update/user/lang', data)
                .success(function (result) {
                    params.errors = result.errors;
                    params.sources.user.lang = result.doc;
                    refs.meta.lang = params.sources.user.lang.code;
                    sStage.reload(params);
                    sStage.getLang(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
    };

	this.onUpdateUserNationalitySubmit = function (params) {
        return function () {
            var data = {
                         countryCode: params.fUpdateUserNationality.sUserNationality,
                       };
            console.log(data);
            
            $http.post('/api/update/user/nationality', data)
                .success(function (result) {
                    params.errors = result.errors;
                    params.sources.user.nationality = result.doc;
                    sStage.reload(params);
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
            
        };
	};
}]);