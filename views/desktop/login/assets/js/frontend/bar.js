$(document).ready(function(){

	var scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
    	$(".bar_background").css('display', 'none');
        $("#bar_logo_inv").css('display', 'none');

    } else {
        $(".bar_background").css('display', 'inline-block');
        $("#bar_logo_inv").css('display', 'inline-block');
    }

	$(window).on("scroll", function() {
	    var scrollPos = $(window).scrollTop();
	    if (scrollPos <= 0) {
	    	$(".bar_background").fadeOut(300);
            $("#bar_logo_inv").css('display', 'none');

	    } else {
	        $(".bar_background").fadeIn(300);
            $("#bar_logo_inv").css('display', 'inline-block');
	    }
	});

});