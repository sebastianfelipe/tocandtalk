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

	/* Idiomas que me interesan */

	if (user['interest_languages'].length == 0) {

		$('#str_button_edit_lang_int').css("display", "none");
		$('#str_button_add_lang_int').css("display", "inline-block");

		$('.lang_empity').css("display", "block");

	} else {

		var i_lang = user['interest_languages'];
		var i_lang_str = "";
		var i_lang_edit_str = "";
		var i_lang_length = user['interest_languages'].length;

		for (i = 0; i < user['interest_languages'].length; i++) {
			i_lang_str += i_lang[0];
			i_lang_edit_str += i_lang[0];

			i_lang_edit_str += ' <a href="/profile"><div class="str">(Eliminar)</div></a>';

			if (i != i_lang_length - 1) {
				i_lang_str += "<br>";
				i_lang_edit_str += "<br>";
			}
		}

		$('#str_lang_interest_list').css("display", "block");
		$('#str_lang_interest_list').text(i_lang_str);
		$('#str_lang_list_edit').text(i_lang_edit_str);
	}

	/* Idiomas que manejo */

	if (user['spoken_languages'].length > 0) {
		var s_lang = user['spoken_languages'];
		var s_lang_str = "";
		var s_lang_edit_str = "";
		var s_lang_length = user['spoken_languages'].length;

		for (i = 0; i < user['spoken_languages'].length; i++) {
			s_lang_str += "<br>";
			s_lang_str += s_lang[0];

			s_lang_edit_str += "<br>";
			s_lang_edit_str += s_lang[0];
			s_lang_edit_str += '<form action="/profile/remove_spoken_language" method="post"><input type="submit" id="test" class="str">(Eliminar)</input></form>';
		}

		$('#str_lang_spoken_list').css("display", "block");
		$('#str_lang_spoken_list').html(s_lang_str);
		
		$('#str_lang_spoken_list_edit').html(s_lang_edit_str);

	} else {



	}

});