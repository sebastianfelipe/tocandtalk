/*	Quita el menú de usuario al hacer click en
	cualquier parte de la ventana.
	*/
$(document).click(function(event) { 
	if(($(event.target).parents().index($('#user_menu')) == -1) && ($(event.target).parents().index($('#bar')) == -1)) {
	    if($('#user_menu').is(":visible")) {
	        $('#user_menu').fadeOut(300);
	    }
	}        
})