function show_user_inf()
{
    if (refs.user.nationality)
    {
        $('.str_profile_country').text(refs.user.nationality);
        $('#s_country').val(refs.user.nationality);
        //$('#s_country').val(user.nationality);
    }

    if (refs.user.description)
    {            
        $('.str_desc_content').text(refs.user.description);
        $('#input_edit_desc').val(refs.user.description);
        var tmp_desc = jQuery.trim(refs.user.description);
        if (tmp_desc.length == 0) {
            $('#desc-no').css("display", "inline-block");
        } else {
            $('#desc-no').css("display", "none");
        }
    }

    if (refs.user.native_language) {
        $('.str_lang_native').text(refs.user.native_language);
    }

    /* Idiomas que hablo */

    if (refs.user.spoken_languages.length > 0)
    {
        // Información para mostrar
        var s_lang = refs.user.spoken_languages;
        var form = null;
        console.log(s_lang)
        for (key in s_lang)
        {
            $('#str_lang_spoken_list').append($('<p>', {value: s_lang[key], text: s_lang[key]}));
        }

        for (key in s_lang)
        {
            
            form = $('<form>', {/*id: "form_remove_spoken_language", */ name: "form_remove_spoken_language", action: "/profile/remove_spoken_language", method: "post", class: "item-lang"});
            form.append($('<input>', {name: "remove_spoken_language", value: s_lang[key], hidden: true}));
            form.append($('<p>', {text: s_lang[key], class: "subitem-lang"}));
            form.append($('<input>', {type: "submit", value: "Eliminar", class: "subitem-lang-button"}));
            $('#str_lang_spoken_list_edit').append(form);
            refs.dinamic_forms.push(form);
        }
    }
    
    /* Idiomas que me interesan */
    
    if (refs.user.interest_languages.length > 0)
    {
        // Información para mostrar
        var i_lang = refs.user.interest_languages;
        var form = null;

        for (key in i_lang)
        {
            $('#str-lang-interest-list').append($('<p>', {value: i_lang[key], text: i_lang[key]}));
        }

        for (key in i_lang)
        {
            form = $('<form>', {/*id: "form_remove_interest_language", */ name: "form_remove_interest_language", action: "/profile/remove_interest_language", method: "post", class: "item-lang"});
            form.append($('<input>', {name: "remove_interest_language", value: i_lang[key], hidden: true}));
            form.append($('<p>', {text: i_lang[key], class: "subitem-lang"}));
            form.append($('<input>', {type: "submit", value: "Eliminar", class: "subitem-lang-button"}));
            $('#str-lang-interest-list_edit').append(form);
            refs.dinamic_forms.push(form);
            /*
            form.on('submit', function(e) {
                $.post(form.attr('action'), form.serialize(), function(res) {
                    console.log(res);
                    reload(res);
                    return;
                }, 'json');
                e.preventDefault();
            });
            */
        }
    }
}

function show_req(req)
{
    refs.user = user;
	if (refs.user)
	{
		show_user_inf();
	}
}

function show_errors(errors)
{

}

function clear()
{
    refs.user = null;
    refs.dinamic_forms = [];
	$('.str_profile_country').empty();
	$('.str_desc_content').empty();
	$('.str_lang_native').empty();
    $('#str_lang_spoken_list').empty();
    $('#str_lang_spoken_list_edit').empty();
    $('#str-lang-interest-list').empty();
    $('#str-lang-interest-list_edit').empty()
    $('#input_edit_desc').val('');
}

function load(req, errors)
{
    clear();
    refs.user = user;
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
    if (refs.user)
    {
    	show_user_inf();

    }

    if ($('#img-section2').height() >= 40) {
        var new_margin = 100 - (($('#img-section2').height() - 36) / 2);
        $('#img-section2').css("margin-top", new_margin + "px");
    }

    // Manejo de casos relacionados con errores de formulario e informacion que requiere ser cargada otra vez
    var forms = [
                 $('#form_edit_user_nationality'),
                 $('#form_edit_user_description'),
                 $('#form_add_user_spoken_language'),
                 $('#form_add_user_interest_language')
                ];
    refs.static_forms = refs.static_forms.concat(forms);

    staticEvents();
    dinamicEvents();
    //show_req(req);
	//show_errors(errors);
}

function reload(res)
{
    clear();
    refs.user = res.user;
    //show_req(res.req);
    show_user_inf();

    dinamicEvents();
	//show_errors(res.errors);
}

function dinamicEvents()
{
    for (var key=0; key < refs.dinamic_forms.length; key++)
    {
        refs.dinamic_forms[key].on('submit', function(e) {
            e.preventDefault();
            console.log($(this));
            console.log($(this).serialize());
            $.post($(this).attr('action'), $(this).serialize(), function(res) {
                reload(res);
                return;
            }, 'json');
        });
    }
}

function staticEvents()
{
    for (var key=0; key < refs.static_forms.length; key++)
    {
        refs.static_forms[key].on('submit', function(e) {
            e.preventDefault();
            console.log($(this));
            console.log($(this).serialize());
            $.post($(this).attr('action'), $(this).serialize(), function(res) {
                reload(res);
                return;
            }, 'json');
        });
    }
}
