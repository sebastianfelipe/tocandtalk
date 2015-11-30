$(document).ready(function () {
	var fullname;

    $.each(languages, function(_, language) {
        //$('#s_native_language').append(new Option(language.name, language._id));
        $('#s_languages').append(new Option(language.name, language.name));
    });

    $.each(countries, function(_, country) {
        $('#s_country').append(new Option(country.name, country.name));
    });

    // Informacion del usuario
    if (user)
    {
        if (user.first_name)
        {
            $('#bar_user_name').html(user.first_name);
        }

        if (user.nationality)
        {
            $('#usr_loc_section2').html(user.nationality);
        }
        if (user.description)
        {
            $('#usr_desc_section2').html(user.description);
            $('#input_edit_desc').html(user.description);
        }

        fullname = user.first_name + " " + user.last_name;
        console.log(fullname);
        $('#img_section2').html(fullname);
    }

    // Manejo de casos relacionados con errores de formulario e informacion que requiere ser cargada otra vez
    if (req)
    {

    }
});
