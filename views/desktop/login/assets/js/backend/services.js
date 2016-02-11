// SERVICES

app.service('sStage', function() {

    this.showErrors = function (errors)
    {
        // Nombre de usuario
        if (errors.indexOf("eUser;") > -1) {
            $("#eUser").show();
        }
    };

    this.clear = function ()
    {
        $("#eUser").hide();
    };

    this.load = function ()
    {
    };

    this.reload = function (errors)
    {
        this.clear();
        this.showErrors(errors);
    };

});