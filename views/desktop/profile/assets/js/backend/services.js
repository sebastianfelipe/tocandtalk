// SERVICES

app.service('sFunctions', [function(){
    this.capitalizeWord = function (word) {
        var word_tmp = word;
        if (!!word_tmp)
        {
            word = word_tmp[0].toUpperCase();
            if (word_tmp.length > 1)
            {
                word += word_tmp.substring(1).toLowerCase();
            }
        }
        return word;
    };

    this.capitalize = function (msg) {
        var words = "";
        if (!!msg)
        {
            //var msg_tmp = msg;
            var words_list = [];
            words = msg.split(' ');
            
            words.forEach(function(word) {
                word = capitalizeWord(word);
                words_list.push(word);
            }); 

            words = words_list.join(' ').trim();
        }
        return words;
    };
}]);


app.service('sStage', ['$http', '$log', 'sFunctions', function($http, $log, sFunctions) {
	var service = this;
	this.showUserInf = function(params) {
		/*
		console.log(params.user);
		params.body.strUserNationality = params.user.nationality || "default";
		params.body.strUserDescription = params.user.description || "default";
		params.body.strUserNativeLanguage = params.user.native_language || "default";
		*/
		/*
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
	    */

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
	    /* Idiomas que hablo */
	    /*
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
		*/
	    if ($('#img-section2').height() >= 40) {
	        var new_margin = 100 - (($('#img-section2').height() - 36) / 2);
	        $('#img-section2').css("margin-top", new_margin + "px");
	    }

	    // Manejo de casos relacionados con errores de formulario e informacion que requiere ser cargada otra vez
	    /*
	    var forms = [
	                 $('#form_edit_user_nationality'),
	                 $('#form_edit_user_description'),
	                 $('#form_add_user_spoken_language'),
	                 $('#form_add_user_interest_language')
	                ];

	    params.staticForms = params.staticForms.concat(forms);
		*/
	    //this.staticEvents(params);
	    //this.dinamicEvents(params);
      	this.showUserInf(params);
        this.showErrors(params.errors);
    };

    this.reload = function (params)
    {
        this.clear(params);
	    this.showUserInf(params);
	    //this.dinamicEvents(params);
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
	this.getSources = function (params)
	    {
	        $http.get('/api/get/user')
	            .success(function (result) {
	                /* Nombre de Usuario */
	                params.sources.user = params.body.user;
	                console.log(result.doc);
	                params.body.user.firstName = sFunctions.capitalize(result.doc.first_name);
	                params.body.user.lastName = sFunctions.capitalize(result.doc.last_name);
	                params.body.user.fullName = params.body.user.firstName + " " + params.body.user.lastName;
	                params.body.user.nationality = result.doc.nationality;
	                params.body.user.username = result.doc._username;
	                params.body.user.interestLanguages = result.doc.interest_languages;
	               	params.body.user.spokenLanguages = result.doc.spoken_languages;      
	                params.body.user.nativeLanguage = result.doc.native_language;
	                
	               

	            })
	            .error(function (data, status) {
	                $log.error({data: data, status: status});
            });


	        $http.get('/api/get/lang/'+params.meta.lang+'/'+params.meta.view)
	            .success(function (result) {
	                params.body.lang = result;
	                document.title = params.body.lang.title;
	            })
	            .error(function (data, status) {
	                $log.error({data: data, status: status});
	            });
	            
	       
	        $http.get('/api/get/languages')
	            .success(function (result) {
	                params.sources.languages = result.docs;
	                params.body.languages = params.sources.languages;
	            })
	            .error(function (data, status) {
	                $log.error({data: data, status: status});
	            });

	        $http.get('/api/get/countries')
	            .success(function (result) {
	                params.sources.countries = result.docs;
	                params.body.countries = params.sources.countries;
	            })
	            .error(function (data, status) {
	                $log.error({data: data, status: status});
	            });
    		
    };






}]);