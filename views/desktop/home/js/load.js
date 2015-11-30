$(document).ready(function () {
	var fullname;

    $.each(languages, function(_, language) {
        //$('#s_native_language').append(new Option(language.name, language._id));
        $('#s_languages').append(new Option(language.name, language.name));
    });

    if (user)
    {
    	if (user.first_name)
    	{
    		$('#bar_user_name').html(user.first_name);
    	}
    }
});
