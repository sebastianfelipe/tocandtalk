// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {

    this.showErrors = function (errors)
    {
        // Nombre de usuario
        if (errors.indexOf("eUser;") > -1) {
            $("#eUser").show();
        }
    };

    this.clear = function ()
    {
        $("#eUser").hide();
    };

    this.load = function (params)
    {
        this.getSources(params);
    };

    this.reload = function (params)
    {
        this.clear();
        this.showErrors(params.errors);
    };

    this.getSources = function (params)
    {
        //console.log($scope.fLogin);
        $http.get('/api/get/lang/'+params.meta.lang+'/'+params.meta.view)
            .success(function (result) {
                params.body.lang = result;
                document.title = params.body.lang.title;
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
            
        $http.get('/api/get/langs')
            .success(function (result) {
                console.log(result);
                params.sources.languages = result.docs;
                params.body.languages = params.sources.languages;
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });

    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', function($http, $log, sStage) {
    var service = this;

    this.onSubmit = function(params) {
        return function () {
            var data = {
                        username: params.form.iUsername,
                        password: params.form.iPassword
                       };
            $http.post('/api/auth/classic', data)
                .success(function (result) {
                    if (!result.errors)
                    {
                        $(location).attr('href','/');
                    }
                    else
                    {   
                        params.errors = result.errors;
                        sStage.reload(params);
                    }
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
                });
            };
    };

    this.onSocialClick = function(params) {
        return function (social) {
            $(location).attr('href','/api/auth/' + social);
            /*
            $http.get('/api/auth/' + social)
                .success(function (result) {
                    if (!result.errors)
                    {
                        $(location).attr('href','/');
                    }
                    else
                    {   
                        params.errors = result.errors;
                        sStage.reload(params);
                    }
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
                });
                */
            };
    };

    this.onChangeLangClick = function (params) {
        return function (code) {
            var data = {
                         code: params.fChangeLang.sLang,
                       };
            params.meta.lang = data.code;
            $http.get('/api/get/lang/'+params.meta.lang+'/'+params.meta.view)
                .success(function (result) {
                    params.body.lang = result;
                    document.title = params.body.lang.title;
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
            });
        };
    };
}]);