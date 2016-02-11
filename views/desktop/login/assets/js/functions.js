function show_req(req)
{
	if (req.i_username)
	{
		$('#i_username').val(req.i_username);
	}
	if (req.i_password)
	{
		$('#i_password').val(req.i_password);
	}
}

function show_errors(errors)
{
    // Nombre de usuario
    if (errors.indexOf("error_user;") > -1) {
        $("#error_user").show();
    }
}
function clear()
{
    $("#error_user").hide();
}

function load()
{
	show_errors(errors);
}



function reload(req, errors)
{
	clear();
    show_req(req);
	show_errors(errors);
}