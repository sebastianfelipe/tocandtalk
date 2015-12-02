/*
	spoken_languages
	interest_languages
	sex
	last_name
	first_name
	native_language
	_email
	_username
	_id
*/
$(document).ready(function(){

	$.each(languages, function (i, item) {
		$('.s_languages').append($('<option>', {
			value: item.name,
			text : item.name 
		}));
	});


	/* Idiomas que hablo */


	if (user['spoken_languages'].length > 0)
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
			form = $('<form>', {action: "/profile/remove_spoken_language", method: "post"});
			form.append($('<input>', {name: "remove_spoken_language", value: s_lang[key], hidden: true}));
			form.append($('<p>', {text: s_lang[key]}));
			form.append($('<input>', {type: "submit", value: "Eliminar"}));
			$('#str_lang_spoken_list_edit').append(form);
		}
	}
	/* Idiomas que me interesan */

	if (user['interest_languages'].length > 0)
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
			form = $('<form>', {action: "/profile/remove_interest_language", method: "post"});
			form.append($('<input>', {name: "remove_interest_language", value: i_lang[key], hidden: true}));
			form.append($('<p>', {text: i_lang[key]}));
			form.append($('<input>', {type: "submit", value: "Eliminar"}));
			$('#str_lang_interest_list_edit').append(form);
		}
	}
});