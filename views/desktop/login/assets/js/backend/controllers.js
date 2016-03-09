// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.body = {};
	scope = $scope.body;
    refs.body = scope;

    scope.languages = [];
    scope.metaLang = refs.meta.lang;
    refs.meta.lang = lang || scope.metaLang;
    
    scope.lang = {};

    sStage.load(refs);

}]);

app.controller('form', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.form = {};
	scope = $scope.form;
    refs.form = scope;

    scope.onSubmit = sActions.onSubmit(refs);
}]);

app.controller('dMetaLang', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
    $scope.dMetaLang = {};
    scope = $scope.dMetaLang;
    refs.dMetaLang = scope;

    scope.foo = function ()
    {
        console.log('kjdhsajkdhakjdjha');
    };
    //scope.onSubmit = sActions.onSubmit(refs);
}]);