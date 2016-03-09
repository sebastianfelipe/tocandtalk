// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {

    this.showErrors = function (errors)
    {
        // Nombre de usuario

        if (errors.indexOf("eUsernameUsernameUnique;") > -1) {
            $("#eUsernameUsernameUnique").show();
        }

        if (errors.indexOf("eUsernameUsernameFormat;") > -1) {
            $("#eUsernameUsernameFormat").show();
        }

        if (errors.indexOf("eEmailEmailUnique;") > -1) {
            $("#eEmailEmailUnique").show();
        }

        if (errors.indexOf("eEmailEmailFormat;") > -1) {
            $("#eEmailEmailFormat").show();
        }
        if (errors.indexOf("ePasswordPasswordConfirmation;") > -1) {
            $("#eUserPasswordConfirmation").show();
        }
    };

    this.clear = function ()
    {
        $("#eUsernameUsernameUnique").hide();
        $("#eUsernameUsernameFormat").hide();
        $("#eEmailEmailUnique").hide();
        $("#eEmailEmailFormat").hide();
        $("#eUserPasswordConfirmation").hide();
    };

    this.load = function (params)
    {
        this.showErrors(params.errors);
    };

    this.reload = function (params)
    {
        this.clear();
        this.showErrors(params.errors);
    };

    this.getSources = function (params)
    {
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
    this.onSubmit = function(params) {
        return function () {
            var data = {
                         firstName: params.form.iName,
                         lastName: params.form.iLastname,
                         username: params.form.iUsername,
                         email: params.form.iEmail,
                         password: params.form.iPassword,
                         passwordConfirmation: params.form.iPasswordConfirmation,
                         day: params.form.iDay,
                         month: params.form.sMonth,
                         year: params.form.iYear,
                         sexVal: params.form.rSex,
                         countryCode: params.form.sCountry,
                         nativeLanguageCode: params.form.sNativeLanguage
                       };
            $http.post('/api/save/account/classic', data)
                .success(function (result) {
                    console.log(result);
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
}]);