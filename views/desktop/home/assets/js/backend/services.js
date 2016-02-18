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

    this.showErrors = function (errors)
    {
    };

    this.showUserInf = function(params)
    {

    }

    this.clear = function ()
    {
    };

    this.load = function (params)
    {
        //console.log($scope);
        //params.body.languages = params.languages;

        this.showErrors(params.errors);

    /*
    $.each(languages, function(_, language) {
        //$('#s_native_language').append(new Option(language.name, language._id));
        $('#s_languages').append(new Option(language.name, language.name));
    });
    */
    };

    this.reload = function (params)
    {
        this.clear();
        this.showErrors(params.errors);
    };

    this.getSources = function (params)
    {
        $http.get('/api/get/user')
            .success(function (result) {
                /* Nombre de Usuario */
                params.sources.user = params.body.user;
                console.log(result.doc.first_name);
                params.body.user.firstName = sFunctions.capitalize(result.doc.first_name);
                params.body.user.lastName = sFunctions.capitalize(result.doc.last_name);
                params.body.user.fullName = params.body.user.firstName + " " + params.body.user.lastName;
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
    };
}]);

app.service('sActions', ['$http', '$log', 'sStage', function($http, $log, sStage) {
    /*
    this.onSubmit = function(params) {
        return function () {
            var data = {
                         iName: params.form.iName,
                         iLastname: params.form.iLastname,
                         iUsername: params.form.iUsername,
                         iEmail: params.form.iEmail,
                         iPassword: params.form.iPassword,
                         iPasswordConfirmation: params.form.iPasswordConfirmation,
                         iDay: params.form.iDay,
                         sMonth: params.form.sMonth,
                         iYear: params.form.iYear,
                         rSex: params.form.rSex,
                         sCountry: params.form.sCountry,
                         sNativeLanguage: params.form.sNativeLanguage
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
                        params.errors = result.errors;
                        sStage.reload(params);
                    }
                })
                .error(function (data, status) {
                    $log.error({data: data, status: status});
                });
        };
        
    };
    */
}]);