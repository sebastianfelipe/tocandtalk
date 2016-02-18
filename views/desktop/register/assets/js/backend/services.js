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
        if (errors.indexOf("eUserPasswordConfirmation;") > -1) {
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
        this.getSources(params);
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