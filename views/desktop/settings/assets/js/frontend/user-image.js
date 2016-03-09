$(document).ready(function(){

	$('.usr-image').css("background-image", "url(desktop/shared/assets/img/user-image-example.jpg)");

    $('#usr-image-background').backgroundBlur({
	    imageURL : "desktop/shared/assets/img/user-image-example.jpg",
	    blurAmount : 30,
	    imageClass : 'tinted-bg-blur'
	});
});