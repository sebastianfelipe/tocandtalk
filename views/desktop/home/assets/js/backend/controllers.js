// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
	$scope.body = {};
	scope = $scope.body;
	refs.body = scope;
	
	scope.user = {};
	sStage.getSources(refs);
    sStage.load(refs);
}]);