$(document).ready(function(){

	$('.usr_image').css("background-image", "url(desktop/shared/img/user_image_example.jpg)");

    $('#usr_image_background').backgroundBlur({
	    imageURL : "desktop/shared/img/user_image_example.jpg",
	    blurAmount : 30,
	    imageClass : 'tinted-bg-blur'
	});
});