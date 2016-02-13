function show_req(req)
{
	if (req.i_name)
	{
		$('#i_name').val(req.i_name);
	}
	if (req.i_lastname)
	{
		$('#i_lastname').val(req.i_lastname);
	}
	if (req.i_username)
	{
		$('#i_username').val(req.i_username);
	}
	if (req.i_email)
	{
		$('#i_email').val(req.i_email);
	}
	if (req.i_password)
	{
		$('#i_password').val(req.i_password);
	}
	if (req.i_password_confirmation)
	{
		$('#i_password_confirmation').val(req.i_password_confirmation);
	}
	if (req.i_day)
	{
		$('#i_day').val(req.i_day);
	}
	if (req.i_year)
	{
		$('#i_year').val(req.i_year);
	}
	if (req.s_month)
	{
		$('#s_month').val(req.s_month);
	}
	if (req.r_sex)
	{
		$("input[name=r_sex]").filter("[value='"+req.r_sex+"']").attr('checked', true)	}
	if (req.s_native_language)
	{
		$('#s_native_language').val(req.s_native_language);
	}
	if (req.s_country)
	{
		$('#s_country').val(req.s_country);
	}
}

function show_errors(errors)
{
    // Nombre de usuario

    if (errors.indexOf("error_username-username_unique;") > -1) {
        $("#error_username-username_unique").show();
    }

    if (errors.indexOf("error_username-username_format;") > -1) {
        $("#error_username-username_format").show();
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
}

function clear()
{
    $("#error_username-username_unique").hide();
    $("#error_username-username_format").hide();
    $("#error_email_email_unique").hide();
    $("#error_email_email_format").hide();
    $("#error_user_password_confirmation").hide();
}

function load(req, errors)
{
    $.each(languages, function(_, language) {
        $('#s_native_language').append(new Option(language.name, language.name));
    });

    $.each(countries, function(_, country) {   
        $('#s_country').append(new Option(country.name, country.name));
    });

    show_req(req);
	show_errors(errors);
}

function reload(req, errors)
{
	clear();
    show_req(req);
	show_errors(errors);
}