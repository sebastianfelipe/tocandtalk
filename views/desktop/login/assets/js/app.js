var app = angular.module('tocandtalk', []);

// SERVICES
app.service('sStage', function() {
   
    this.showErrors(errors)
    {
        // Nombre de usuario
        if (errors.indexOf("eUser;") > -1) {
            $("#eUser").show();
        }
    }

    this.clear()
    {
        $("#eUser").hide();
    }

    this.load()
    {
    }

    this.reload(errors)
    {
        this.clear();
        this.showErrors(errors);
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