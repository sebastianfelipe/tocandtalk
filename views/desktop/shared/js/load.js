$(document).ready(function () {
	console.log('in');
	if (user)
	{
		var name =  capitalizeFirstLetterName(user.first_name) + " " + capitalizeFirstLetterName(user.last_name);
		$('.str_name_user').text(name);
	}
});