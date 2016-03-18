
// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
	 
	refs.body = scope = $scope.body = {};
	refs.meta.lang = lang || refs.meta.lang;
	
	scope.user = {};
	
	 $.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	sStage.getSources(refs);
	sStage.load(refs);
}]);

app.controller('fUpdateUserLang', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.fUpdateUserLang = {};
	scope = $scope.fUpdateUserLang;
    refs.fUpdateUserLang = scope;

    scope.onSubmit = sActions.onUpdateUserLangSubmit(refs);
}]);

app.controller('fUpdateUserNationality', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.fUpdateUserNationality = {};
	scope = $scope.fUpdateUserNationality;
    refs.fUpdateUserNationality = scope;

    scope.onSubmit = sActions.onUpdateUserNationalitySubmit(refs);
}]);
