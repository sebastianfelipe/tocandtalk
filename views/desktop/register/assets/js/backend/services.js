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

    this.load = function (params)
    {
        params.body.languages = params.languages;
        params.body.countries = params.countries;
        this.showErrors(params.errors);
    };

    this.reload = function (params)
    {
        this.clear();
        this.showErrors(params.errors);
    };
});