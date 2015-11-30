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
        if (user.nationality)
        {
            $('.str_profile_country').text(user.nationality);
        }
        if (user.description)
        {            
            $('.str_desc_content').text(user.description);
        }
        if (user.native_language) {
            $('.str_lang_native').text(user.native_language);
        }

    }

    // Manejo de casos relacionados con errores de formulario e informacion que requiere ser cargada otra vez
    if (req)
    {

    }
});
