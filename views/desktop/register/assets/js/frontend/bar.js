$(document).ready(function(){

	var scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
    	$(".bar-background").css('display', 'none');

    } else {
        $(".bar-background").css('display', 'inline-block');
    }

	$(window).on("scroll", function() {
	    var scrollPos = $(window).scrollTop();
	    if (scrollPos <= 0) {
	    	$(".bar-background").fadeOut(300);

	    } else {
	        $(".bar-background").fadeIn(300);
	    }
	});

});