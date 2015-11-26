$(document).ready(function(){

	$('#bar_user_show').click(function() { 
		if($('#user_menu').is(":visible")) {
	        $('#user_menu').fadeOut(300);
	  
	    } else {
	    	$('#user_menu').fadeIn(300);
	    }
	});

	$("#user_menu_element1")
		.mouseenter(function() {
			$("#user_menu_element_sel1").fadeIn(300);
		})
		.mouseleave(function() {
			$("#user_menu_element_sel1").fadeOut(300);
	});

	$("#user_menu_element2")
		.mouseenter(function() {
			$("#user_menu_element_sel2").fadeIn(300);
		})
		.mouseleave(function() {
			$("#user_menu_element_sel2").fadeOut(300);
	});

	$("#user_menu_element3")
		.mouseenter(function() {
			$("#user_menu_element_sel3").fadeIn(300);
		})
		.mouseleave(function() {
			$("#user_menu_element_sel3").fadeOut(300);
	});

});