$(document).ready(function(){
	document.title = "Toc&Talk! - Ingresar";

	$('.str_button_register').text(
		"Regístrate"
	);

	$('.str_title_login').text(
		"Ingresar"
	);

	$('#iUsername').attr("placeholder",
		"Nombre de usuario o Email"
	);

	$('#iPassword').attr("placeholder",
		"Contraseña"
	);

	$('#bLogin').val(
		"Ingresar"
	);

	$('.str_login_1').text(
		"¿No tienes una cuenta?"
	);

	/* Errores */

	$('.str_error_1').text(
		"Nombre de usuario y/o contraseña incorrecta."
	);

	$('.str_error_2').text(
		"Las casillas no son iguales"
	);



});