// APP
var app = angular.module('tocandtalk', []);

// CONTROLLERS
app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
	$scope.body = {};
	scope = $scope.body;

	scope.onSubmit = function() {
		var data = angular.toJson($scope.fLogin);
        $http.post('/login', data)
            .success(function (result) {
                sStage.reload(result.errors);
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
	}

    sStage.load();
}]);