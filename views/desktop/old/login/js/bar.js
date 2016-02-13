$(document).ready(function(){

	var scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
    	$(".bar-background").css('display', 'none');
        $("#bar-logo-inv").css('display', 'none');

    } else {
        $(".bar-background").css('display', 'inline-block');
        $("#bar-logo-inv").css('display', 'inline-block');
    }

	$(window).on("scroll", function() {
	    var scrollPos = $(window).scrollTop();
	    if (scrollPos <= 0) {
	    	$(".bar-background").fadeOut(300);
            $("#bar-logo-inv").css('display', 'none');

	    } else {
	        $(".bar-background").fadeIn(300);
            $("#bar-logo-inv").css('display', 'inline-block');
	    }
	});

});