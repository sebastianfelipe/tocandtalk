$(document).ready(function(){

	// Nombre de usuario
	$("#input_username").focus(function() {
		/* $("#info_username").css("display", "inline"); */
		$("#info_username").fadeIn(400);
	});

	$("#input_username").blur(function() {
		/* $("#info_username").css("display", "none"); */
		$("#info_username").fadeOut(400);
	});

	// Correo electrónico
	$("#input_email").focus(function() {
		$("#info_email").fadeIn(400);
	});

	$("#input_email").blur(function() {
		$("#info_email").fadeOut(400);
	});

	// Contraseña
	$("#input_password").focus(function() {
		$("#info_password").fadeIn(400);
	});

	$("#input_password").blur(function() {
		$("#info_password").fadeOut(400);
	});



}); 


