// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
	$scope.body = {};
	scope = $scope.body;

	scope.onSubmit = function() {
		var data = {
                    iUsername: $scope.iUsername,
                    iPassword: $scope.iPassword
                   };
        //console.log($scope.fLogin);
        $http.post('/login', data)
            .success(function (result) {
                if (!result.errors)
                {
                    $(location).attr('href','/');
                }
                else
                {   
                    sStage.reload(result.errors);
                }
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
	}

    sStage.load();
}]);