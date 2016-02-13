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
		$('.str_name-user_complete').text(full_name);
		$('.str_name-user').text(first_name);

		if ($('#bar-user-name').width() > 180) {
			$('#bar-user-name')
				.css("margin-top", "5px")
				.css("font-size", "14px");
			$('.str_name-user').html(first_name + "<br>" + last_name);
		}
	}
});