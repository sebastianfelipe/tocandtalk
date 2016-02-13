// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
	$scope.body = {};
	scope = $scope.body;
	scope.onSubmit = function() {
        var data = {
                     iName: $scope.iName,
                     iLastname: $scope.iLastname,
                     iUsername: $scope.iUsername,
                     iEmail: $scope.iEmail,
                     iPassword: $scope.iPassword,
                     iPasswordConfirmation: $scope.iPasswordConfirmation,
                     iDay: $scope.iDay,
                     sMonth: $scope.sMonth,
                     iYear: $scope.iYear,
                     rSex: $scope.rSex,
                     sCountry: $scope.sCountry,
                     sNativeLanguage: $scope.sNativeLanguage
                   };
        $http.post('/register', data)
            .success(function (result) {
                console.log(result);
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
	};

    sStage.load();
}]);