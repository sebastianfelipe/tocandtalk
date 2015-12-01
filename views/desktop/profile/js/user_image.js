$(document).ready(function(){

	$('.usr_image').css("background-image", "url(desktop/shared/img/user_image_example.jpg)");
	//$('.usr_image_background').css("background-image", "url(desktop/shared/img/user_image_example.jpg)");

	/*
	$('#usr_image_background').blurjs({
        source: '.usr_image_background',
        radius: 60,
        overlay: 'rgba(0, 0, 0, .3)'
    });
	*/
    /*
	var newImg = new Image();

    newImg.src = "desktop/shared/img/user_image_example.jpg";
    var height = newImg.height;
    var width = newImg.width;


    new_height = (520 * height) / width;

    if (new_height < 250) {
    	new_width = (250 * width) / height;

    	var dif = new_width - width;

    	$('.usr_image_background').css("left", "-" + dif + "px");

    } else {
    	var dif = new_height - height;

    	$('.usr_image_background').css("top", "-" + dif + "px");
    }
    */

    $('#usr_image_background').backgroundBlur({
	    imageURL : "desktop/shared/img/user_image_example.jpg",
	    blurAmount : 30,
	    imageClass : 'tinted-bg-blur'
	});
});