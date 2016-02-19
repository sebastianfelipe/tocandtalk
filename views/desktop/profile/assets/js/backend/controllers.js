
// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
	 
	refs.body = scope = $scope.body = {};
	
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

app.controller('fUpdateUserNationality', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.fUpdateUserNationality = {};
	scope = $scope.fUpdateUserNationality;
    refs.fUpdateUserNationality = scope;

    scope.onSubmit = sActions.onUpdateUserNationalitySubmit(refs);
}]);

app.controller('fUpdateUserDescription', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.fUpdateUserDescription = {};
	scope = $scope.fUpdateUserDescription;
    refs.fUpdateUserDescription = scope;


    scope.onSubmit = sActions.onUpdateUserDescriptionSubmit(refs);
}]);

app.controller('fSaveUserSpokenLanguage', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.fSaveUserSpokenLanguage = {};
	scope = $scope.fSaveUserSpokenLanguage;
    refs.fSaveUserSpokenLanguage = scope;


    scope.onSubmit = sActions.onSaveUserSpokenLanguageSubmit(refs);
}]);

app.controller('fSaveUserInterestLanguage', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.fSaveUserInterestLanguage = {};
	scope = $scope.fSaveUserInterestLanguage;
    refs.fSaveUserInterestLanguage = scope;


    scope.onSubmit = sActions.onSaveUserInterestLanguageSubmit(refs);
}]);

app.controller('dRemoveUserSpokenLanguage', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.dRemoveUserSpokenLanguage = {};
	scope = $scope.dRemoveUserSpokenLanguage;
    refs.dRemoveUserSpokenLanguage = scope;

    scope.onClick = sActions.onRemoveUserSpokenLanguageClick(refs);
}]);

app.controller('dRemoveUserInterestLanguage', ['$scope', '$http', '$log', 'sStage', 'sActions', function ($scope, $http, $log, sStage, sActions) {
	$scope.dRemoveUserInterestLanguage = {};
	scope = $scope.dRemoveUserInterestLanguage;
    refs.dRemoveUserInterestLanguage = scope;

    scope.onClick = sActions.onRemoveUserInterestLanguageClick(refs);
}]);


