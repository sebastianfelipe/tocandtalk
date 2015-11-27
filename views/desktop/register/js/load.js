$(document).ready(function () {
    $.each(languages, function(_, language) {
        $('#s_native_language').append(new Option(language.name, language._id));
    });

    $.each(countries, function(_, country) {   
        $('#s_country').append(new Option(country.name, country._id));
    });
});
