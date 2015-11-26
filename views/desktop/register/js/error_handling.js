$(document).ready(function(){
    // Nombre de usuario

    if (error_handler.indexOf("error_username_e;") > -1) {
        $("#error_username_e").show();
    }

    if (error_handler.indexOf("error_username;") > -1) {
        $("#error_username").show();
    }

    if (error_handler.indexOf("error_email_e;") > -1) {
        $("#error_email_e").show();
    }
    /*
    if (error_handler.indexOf("error_password_confirmation;") > -1) {
        $("#error_password_confirmation").toggle();
    }
    */
});
