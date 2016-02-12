// SERVICES

app.service('sStage', function() {

    this.showErrors = function (errors)
    {
        // Nombre de usuario

        if (errors.indexOf("eUsernameUsernameUnique;") > -1) {
            $("#eUsernameUsernameUnique").show();
        }

        if (errors.indexOf("eUsernameUsernameFormat;") > -1) {
            $("#eUsernameUsernameFormat").show();
        }

        if (errors.indexOf("eEmailEmailUnique;") > -1) {
            $("#eEmailEmailUnique").show();
        }

        if (errors.indexOf("eEmailEmailFormat;") > -1) {
            $("#eEmailEmailFormat").show();
        }
        if (errors.indexOf("eUserPasswordConfirmation;") > -1) {
            $("#eUserPasswordConfirmation").show();
        }
    };

    this.clear = function ()
    {
        $("#eUsernameUsernameUnique").hide();
        $("#eUsernameUsernameFormat").hide();
        $("#eEmailEmailUnique").hide();
        $("#eEmailEmailFormat").hide();
        $("#eUserPasswordConfirmation").hide();
    };

    this.load = function ()
    {
        console.log(languages);
        console.log(countries);
        $.each(languages, function(_, language) {
            $('#sNativeLanguage').append(new Option(language.name, language.name));
        });

        $.each(countries, function(_, country) {   
            $('#sCountry').append(new Option(country.name, country.name));
        });

        this.showErrors(errors);
    };

    this.reload = function (errors)
    {
        this.clear();
        this.showErrors(errors);
    };
});