// SERVICES

app.service('sStage', function() {

    this.showErrors = function (errors)
    {
    };

    this.clear = function ()
    {
    };

    this.load = function (params)
    {
        //console.log($scope);
        params.body.languages = params.languages;

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
});