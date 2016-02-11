var app = angular.module('tocandtalk', []);

// SERVICES
app.service('sStage', function() {
   
    this.city = "New York, NY";
    this.showErrors(errors)
    {
        // Nombre de usuario
        if (errors.indexOf("error_user;") > -1) {
            $("#error_user").show();
        }
    }

    this.clear()
    {
        $("#error_user").hide();
    }

    this.load()
    {
        show_errors(errors);
    }



    this.reload(req, errors)
    {
        clear();
        show_req(req);
        show_errors(errors);
    }    
});

// CONTROLLERS
app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, $sStage) {
	$scope.body = {};
	scope = $scope.body;

	scope.onSubmit = function() {
		var data = angular.toJson($scope.fLogin);
        $http.post('/login', data)
            .success(function (result) {
                console.log(result);
            })
            .error(function (data, status) {
                $log.error(data);
            });
	}
}]);