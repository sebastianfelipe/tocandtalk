$(document).click(function(event) { 
	if(($(event.target).parents().index($('#user_menu')) == -1) & ($(event.target).parents().index($('#bar')) == -1)) {
	    if($('#user_menu').is(":visible")) {
	        $('#user_menu').fadeOut(300);
	    }
	}        
})