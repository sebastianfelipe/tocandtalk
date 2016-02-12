$(document).ready(function(){

	// Nombre de usuario
	$("#iUsername").focus(function() {
		/* $("#info_username").css("display", "inline"); */
		$("#infoUsername").fadeIn(400);
	});

	$("#iUsername").blur(function() {
		/* $("#info_username").css("display", "none"); */
		$("#infoUsername").fadeOut(400);
	});

	// Correo electrónico
	$("#iEmail").focus(function() {
		$("#infoEmail").fadeIn(400);
	});

	$("#iEmail").blur(function() {
		$("#infoEmail").fadeOut(400);
	});

	// Contraseña
	$("#iPassword").focus(function() {
		$("#infoPassword").fadeIn(400);
	});

	$("#iPassword").blur(function() {
		$("#infoPassword").fadeOut(400);
	});
	
}); 


