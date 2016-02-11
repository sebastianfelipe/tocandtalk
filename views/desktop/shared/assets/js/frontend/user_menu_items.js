$(document).ready(function(){

	// Muestra el menú de usuario al hacer click en #bar_user_show
	$('#bar_user_show').click(function() { 
		if($('#user_menu').is(":visible")) {
	        $('#user_menu').fadeOut(300);
	  
	    } else {
	    	$('#user_menu').fadeIn(200);
	    }
	});

	// Animar ítems del menú de usuario
	$("#user_menu_element1")
		.mouseenter(function() {
			$("#user_menu_element_sel1").fadeIn(100);
		})
		.mouseleave(function() {
			$("#user_menu_element_sel1").fadeOut(150);
	});

	$("#user_menu_element2")
		.mouseenter(function() {
			$("#user_menu_element_sel2").fadeIn(100);
		})
		.mouseleave(function() {
			$("#user_menu_element_sel2").fadeOut(150);
	});

	$("#user_menu_element3")
		.mouseenter(function() {
			$("#user_menu_element_sel3").fadeIn(100);
		})
		.mouseleave(function() {
			$("#user_menu_element_sel3").fadeOut(150);
	});

});