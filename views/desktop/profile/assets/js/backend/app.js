// APP

var app = angular.module('tocandtalk', []);

// SERVICES

app.service('sStage', ['$http', '$log', function($http, $log) {
	var service = this;
	this.showUserInf = function(params) {
		console.log(params.user);
		if (params.user.nationality)
	    {	
	        $('.str_profile_country').text(params.user.nationality);
	        $('#s_country').val(params.user.nationality);
	    }

	    if (params.user.description)
	    {            
	        $('.str_desc_content').text(params.user.description);
	        $('#input_edit_desc').val(params.user.description);
	        var tmp_desc = jQuery.trim(params.user.description);
	        if (tmp_desc.length == 0) {
	            $('#desc-no').css("display", "inline-block");
	        } else {
	            $('#desc-no').css("display", "none");
	        }
	    }

	    if (params.user.native_language) {
	        $('.str_lang_native').text(params.user.native_language);
	    }

	    /* Idiomas que hablo */

	    if (params.user.spoken_languages.length > 0)
	    {
	        // Información para mostrar
	        var s_lang = params.user.spoken_languages;
	        var form = null;
	        console.log(s_lang)
	        for (key in s_lang)
	        {
	            $('#str_lang_spoken_list').append($('<p>', {value: s_lang[key], text: s_lang[key]}));
	        }

	        for (key in s_lang)
	        {
	            
	            form = $('<form>', {/*id: "form_remove_spoken_language", */ name: "form_remove_spoken_language", class: "item-lang"});
	            form.append($('<input>', {name: "remove_spoken_language", value: s_lang[key], hidden: true}));
	            form.append($('<p>', {text: s_lang[key], class: "subitem-lang"}));
	            form.append($('<input>', {type: "submit", value: "Eliminar", class: "subitem-lang-button"}));
	            $('#str_lang_spoken_list_edit').append(form);
	            form.attr('ng-submit', 'body.onRemoveSpokenLanguage()');
	            params.dinamicForms.push(form);
	        }
	    }
	    
	    /* Idiomas que me interesan */
	    
	    if (params.user.interest_languages.length > 0)
	    {
	        // Información para mostrar
	        var i_lang = params.user.interest_languages;
	        var form = null;

	        for (key in i_lang)
	        {
	            $('#str-lang-interest-list').append($('<p>', {value: i_lang[key], text: i_lang[key]}));
	        }

	        for (key in i_lang)
	        {
	            form = $('<form>', {/*id: "form_remove_interest_language", */ name: "form_remove_interest_language", class: "item-lang"});
	            form.append($('<input>', {name: "remove_interest_language", value: i_lang[key], hidden: true}));
	            form.append($('<p>', {text: i_lang[key], class: "subitem-lang"}));
	            form.append($('<input>', {type: "submit", value: "Eliminar", class: "subitem-lang-button"}));
	            $('#str-lang-interest-list_edit').append(form);
	            form.attr('ng-submit', 'body.onRemoveInterestLanguage()');
	            params.dinamicForms.push(form);
	            /*
	            form.on('submit', function(e) {
	                $.post(form.attr('action'), form.serialize(), function(res) {
	                    console.log(res);
	                    reload(res);
	                    return;
	                }, 'json');
	                e.preventDefault();
	            });
	            */
	        }
	    }

	};

    this.showErrors = function (errors)
    {
        // Nombre de usuario

       
    };

    this.clear = function (params)
    {
	    //params.user = null;
	    params.dinamicForms = [];
		$('.str_profile_country').empty();
		$('.str_desc_content').empty();
		$('.str_lang_native').empty();
	    $('#str_lang_spoken_list').empty();
	    $('#str_lang_spoken_list_edit').empty();
	    $('#str-lang-interest-list').empty();
	    $('#str-lang-interest-list_edit').empty()
	    $('#input_edit_desc').val('');
    };

    this.load = function (params)
    {
    	refs = params;
	    /* Idiomas que hablo */
	    $.each(params.countries, function(_, country) {
	        $('#s_country').append(new Option(country.name, country.name));
	    });

	    $.each(params.languages, function (i, item) {
	        $('#s_interest_languages').append($('<option>', {
	            value: item.name,
	            text : item.name 
	        }));
	    });

	    $.each(params.languages, function (i, item) {
	        $('#s_spoken_languages').append($('<option>', {
	            value: item.name,
	            text : item.name 
	        }));
	    });

	    if ($('#img-section2').height() >= 40) {
	        var new_margin = 100 - (($('#img-section2').height() - 36) / 2);
	        $('#img-section2').css("margin-top", new_margin + "px");
	    }

	    // Manejo de casos relacionados con errores de formulario e informacion que requiere ser cargada otra vez
	    var forms = [
	                 $('#form_edit_user_nationality'),
	                 $('#form_edit_user_description'),
	                 $('#form_add_user_spoken_language'),
	                 $('#form_add_user_interest_language')
	                ];

	    refs.staticForms = params.staticForms.concat(forms);

	    this.staticEvents(params);
	    this.dinamicEvents(params);
      	this.showUserInf(params);
        this.showErrors(params.errors);
    };

    this.reload = function (params)
    {
        this.clear(params);
	    refs.user = params.user;
	    console.log(refs);
	    console.log(params);
	    this.showUserInf(params);
	    this.dinamicEvents(params);
        this.showErrors(params.errors);
    };

	this.dinamicEvents = function (params)
	{
		/*
	    for (var key=0; key < params.dinamicForms.length; key++)
	    {
	        params.dinamicForms[key].on('submit', function(e) {
	            e.preventDefault();
	            var data = $(this).serializeObject();
	            console.log(data);
		        $http.post($(this).attr('action'), data)
		            .success(function (result) {
		            	params.user = result;
		            	service.reload(params);
		            })
		            .error(function (data, status) {
		                $log.error({data: data, status: status});
		        	});
	        });
	    }
	    */
	};

	this.staticEvents = function (params)
	{
		/*
	    for (var key=0; key < params.staticForms.length; key++)
	    {
	        params.staticForms[key].on('submit', function(e) {
	            e.preventDefault();
	            var data = $(this).serializeObject();
	            console.log(data);
	           
		        $http.post($(this).attr('action'), data)
		            .success(function (result) {
		            	params.user = result;
		            	service.reload(params);
		            })
		            .error(function (data, status) {
		                $log.error({data: data, status: status});
		        	});
		        
	        });
	    }
	    */
	};
}]);

// CONTROLLERS

app.controller('body', ['$scope', '$http', '$log', 'sStage', function ($scope, $http, $log, sStage) {
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

	$scope.body = {};
	scope = $scope.body;
	refs.user = user;

	scope.onAddSpokenLanguage = function(sSpokenLanguage) {
	    var data = {"s_spoken_language": sSpokenLanguage};
	    console.log(data);
	    $http.post("/profile/add_user_spoken_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	sStage.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
	};

	scope.onAddInterestLanguage = function(sInterestLanguage) {
	    var data = {"s_interest_language": sInterestLanguage};
	    //var data = $(this).serializeObject();
	    console.log(data);
	    $http.post("/profile/add_user_interest_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	sStage.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
	};

	scope.onRemoveInterestLanguage = function() {
	    var data = $(this).serializeObject();
	    console.log(data);
	    $http.post("/profile/remove_interest_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	service.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
	};

	scope.onRemoveSpokenLanguage = function() {
	    var data = $(this).serializeObject();
	    console.log(data);
	    $http.post("/profile/remove_spoken_language", data)
	        .success(function (result) {
	        	refs.user = result.user;
	        	service.reload(refs);
	        })
	        .error(function (data, status) {
	            $log.error({data: data, status: status});
	    	});
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
    sStage.load({body: $scope.body, user: user, languages: languages, countries: countries, errors: errors, dinamicForms: [], staticForms: []});
}]);
