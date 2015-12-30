function show_user_inf(user)
{
    if (user.nationality)
    {
        $('.str_profile_country').text(user.nationality);
        $('#s_country').val(user.nationality);
        //$('#s_country').val(user.nationality);
    }

    if (user.description)
    {            
        $('.str_desc_content').text(user.description);
        $('#input_edit_desc').val(user.description);
        var tmp_desc = jQuery.trim(user.description);
        if (tmp_desc.length == 0) {
            $('#desc_no').css("display", "inline-block");
        } else {
            $('#desc_no').css("display", "none");
        }
    }

    if (user.native_language) {
        $('.str_lang_native').text(user.native_language);
    }

    /* Idiomas que hablo */

    if (user.spoken_languages.length > 0)
    {
        // Información para mostrar
        var s_lang = user.spoken_languages;
        var form = null;
        console.log(s_lang)
        for (key in s_lang)
        {
            $('#str_lang_spoken_list').append($('<p>', {value: s_lang[key], text: s_lang[key]}));
        }

        for (key in s_lang)
        {
            
            form = $('<form>', {id: "form_remove_spoken_language", name: "form_remove_spoken_language", action: "/profile/remove_spoken_language", method: "post", class: "item_lang"});
            form.append($('<input>', {name: "remove_spoken_language", value: s_lang[key], hidden: true}));
            form.append($('<p>', {text: s_lang[key], class: "subitem_lang"}));
            form.append($('<input>', {type: "submit", value: "Eliminar", class: "subitem_lang_button"}));
            $('#str_lang_spoken_list_edit').append(form);
        }
    }
    
    /* Idiomas que me interesan */
    
    if (user.interest_languages.length > 0)
    {
        // Información para mostrar
        var i_lang = user.interest_languages;
        var form = null;

        for (key in i_lang)
        {
            $('#str_lang_interest_list').append($('<p>', {value: i_lang[key], text: i_lang[key]}));
        }

        for (key in i_lang)
        {
            form = $('<form>', {id: "form_remove_interest_language", name: "form_remove_interest_language", action: "/profile/remove_interest_language", method: "post", class: "item_lang"});
            form.append($('<input>', {name: "remove_interest_language", value: i_lang[key], hidden: true}));
            form.append($('<p>', {text: i_lang[key], class: "subitem_lang"}));
            form.append($('<input>', {type: "submit", value: "Eliminar", class: "subitem_lang_button"}));
            $('#str_lang_interest_list_edit').append(form);
        }
    }
}

function show_req(req)
{
	if (req.user)
	{
		show_user_inf(req.user);
	}
}

function show_errors(errors)
{

}

function clear()
{
	$('.str_profile_country').empty();
	$('.str_desc_content').empty();
	$('.str_lang_native').empty();
    $('#str_lang_spoken_list').empty();
    $('#str_lang_spoken_list_edit').empty();
    $('#str_lang_interest_list').empty();
    $('#str_lang_interest_list_edit').empty()
    $('#input_edit_desc').val('');
}

function load(req, errors)
{
    var fullname;

    /* Idiomas que hablo */
    $.each(countries, function(_, country) {
        $('#s_country').append(new Option(country.name, country.name));
    });

    $.each(languages, function (i, item) {
        $('#s_interest_languages').append($('<option>', {
            value: item.name,
            text : item.name 
        }));
    });

    $.each(languages, function (i, item) {
        $('#s_spoken_languages').append($('<option>', {
            value: item.name,
            text : item.name 
        }));
    });

    // Informacion del usuario
    if (user)
    {
    	show_user_inf(user);

    }

    if ($('#img_section2').height() >= 40) {
        var new_margin = 100 - (($('#img_section2').height() - 36) / 2);
        $('#img_section2').css("margin-top", new_margin + "px");
    }

    // Manejo de casos relacionados con errores de formulario e informacion que requiere ser cargada otra vez
    show_req(req);
	show_errors(errors);
}

function reload(res)
{
	clear();
    //show_req(res.req);
    show_user_inf(res.user);
	show_errors(res.errors);
}