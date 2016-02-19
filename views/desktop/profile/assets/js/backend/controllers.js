
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


	
	/*
	refs.languages = languages;
	refs.countries = countries;
	refs.errors = errors;
	refs.dinamicForms = [];
	refs.staticForms = [];
	*/
	sStage.getSources(refs);
	/*
	sStage.load(refs);
	*/
	scope.onEditUserNationality = function() {
	    var data = {"s_country": scope.strUserNationality};
	    console.log(data);	
	    $http.post("/profile/edit_user_nationality", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	sStage.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
	}

	scope.onEditUserDescription = function() {
	    var data = {"input_edit_desc": scope.strUserDescription};
	    console.log(data);
	    $http.post("/profile/edit_user_description", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	sStage.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
	}

	scope.onAddSpokenLanguage = function(sSpokenLanguage) {
	    var data = {"s_spoken_language": sSpokenLanguage};
	    console.log(data);

	    /*
	    $http.post("/profile/add_user_spoken_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	sStage.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
		*/
	};

	scope.onAddInterestLanguage = function(sInterestLanguage) {
	    var data = {"s_interest_language": sInterestLanguage};
	    //var data = $(this).serializeObject();
	    console.log(data);
	    console.log(scope.onAddInterestLanguage);
	    /*
	    $http.post("/profile/add_user_interest_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	sStage.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
		*/
	};

	scope.onRemoveInterestLanguage = function() {
	    var data = $(this).serializeObject();
	    console.log(data);
	    /*
	    $http.post("/profile/remove_interest_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	service.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
		*/
	};

	scope.onRemoveSpokenLanguage = function() {
	    var data = $(this).serializeObject();
	    console.log(data);
	    /*
	    $http.post("/profile/remove_spoken_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	service.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
		*/
	};
	/*
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
                    sStage.reload({errors: result.errors});
                }
            })
            .error(function (data, status) {
                $log.error({data: data, status: status});
            });
	};
	*/
    
}]);
