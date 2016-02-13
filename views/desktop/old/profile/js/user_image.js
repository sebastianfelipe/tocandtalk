$(document).ready(function(){

	$('.usr-image').css("background-image", "url(desktop/shared/img/user_image_example.jpg)");

    $('#usr-image-background').backgroundBlur({
	    imageURL : "desktop/shared/img/user_image_example.jpg",
	    blurAmount : 30,
	    imageClass : 'tinted-bg-blur'
	});
});