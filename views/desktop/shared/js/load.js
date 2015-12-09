$(document).ready(function () {
	if (user)
	{
		/* Nombre de Usuario */
		var first_name = capitalize(user.first_name);
		var last_name = capitalize(user.last_name);
		var full_name = first_name + " " + last_name;
		//var first_name = capitalizeFirstLetterName(user.first_name);
		//var last_name = capitalizeFirstLetterName(user.last_name);

		console.log(user.first_name);
		$('.str_name_user_complete').text(full_name);
		$('.str_name_user').text(first_name);

		if ($('#bar_user_name').width() > 180) {
			$('#bar_user_name').css("margin-top", "5px");
			$('#bar_user_name').css("font-size", "14px");
			$('.str_name_user').html(first_name + "<br>" + last_name);
		}
	}
});