$(document).ready(function(){

	// Muestra el menú de usuario al hacer click en #bar-user-show
	$('#bar-user-show').click(function() { 
		if($('#user-menu').is(":visible")) {
	        $('#user-menu').fadeOut(300);
	  
	    } else {
	    	$('#user-menu').fadeIn(200);
	    }
	});

	// Animar ítems del menú de usuario
	$("#user-menu-element1")
		.mouseenter(function() {
			$("#user-menu-element-sel1").fadeIn(100);
		})
		.mouseleave(function() {
			$("#user-menu-element-sel1").fadeOut(150);
	});

	$("#user-menu-element2")
		.mouseenter(function() {
			$("#user-menu-element-sel2").fadeIn(100);
		})
		.mouseleave(function() {
			$("#user-menu-element-sel2").fadeOut(150);
	});

	$("#user-menu-element3")
		.mouseenter(function() {
			$("#user-menu-element-sel3").fadeIn(100);
		})
		.mouseleave(function() {
			$("#user-menu-element-sel3").fadeOut(150);
	});

});