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
    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', function($http, $log, sStage) {
    this.onSubmit = function(params) {
        return function () {
            var data = {
                        iUsername: params.form.iUsername,
                        iPassword: params.form.iPassword
                       };
            $http.post('/login', data)
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
}]);