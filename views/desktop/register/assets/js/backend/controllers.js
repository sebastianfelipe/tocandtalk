// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.body = {};
	scope = $scope.body;
    refs.body = scope;
    refs.meta.lang = lang || refs.meta.lang;
    
    scope.lang = {};

    sStage.getSources(refs);
    sStage.load(refs);

}]);

app.controller('form', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.form = {};
	scope = $scope.form;
    refs.form = scope;

    scope.onSubmit = sActions.onSubmit(refs);
}]);

app.controller('fChangeLang', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
    var scope = refs.fChangeLang = $scope.fChangeLang = {};
    scope.sLang = lang || refs.meta.lang;

    scope.onClick = sActions.onChangeLangClick(refs);
}]);