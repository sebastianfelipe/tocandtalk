$(document).ready(function(){
    // Nombre de usuario

    if (errors.indexOf("error_username_username_unique;") > -1) {
        $("#error_username_username_unique").show();
    }

    if (errors.indexOf("error_username_username_format;") > -1) {
        $("#error_username_username_format").show();
    }

    if (errors.indexOf("error_email_email_unique;") > -1) {
        $("#error_email_email_unique").show();
    }

    if (errors.indexOf("error_email_email_format;") > -1) {
        $("#error_email_email_format").show();
    }
    if (errors.indexOf("error_user_password_confirmation;") > -1) {
        $("#error_user_password_confirmation").show();
    }
    /*
    if (error_handler.indexOf("error_password_confirmation;") > -1) {
        $("#error_password_confirmation").toggle();
    }
    */
});
