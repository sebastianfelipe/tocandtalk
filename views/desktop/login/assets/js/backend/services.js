// SERVICES

app.service('sStage', ['$http', function($http) {

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
        this.loadLang(params);
    };

    this.reload = function (params)
    {
        this.clear();
        this.showErrors(params.errors);
    };

    this.loadLang = function (params)
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