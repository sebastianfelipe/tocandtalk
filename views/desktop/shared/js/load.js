$(document).ready(function () {
	console.log('in');
	if (user)
	{
		/* Nombre de Usuario */
		var first_name = capitalizeFirstLetterName(user.first_name);
		var last_name = capitalizeFirstLetterName(user.last_name);
		var name = first_name + " " + last_name;
		
		$('.str_name_user_complete').text(first_name + " " + last_name);
		$('.str_name_user').text(name);

		if ($('#bar_user_name').width() > 180) {
			$('#bar_user_name').css("margin-top", "5px");
			$('#bar_user_name').css("font-size", "14px");
			$('.str_name_user').html(first_name + "<br>" + last_name);
		}
	}
	
});