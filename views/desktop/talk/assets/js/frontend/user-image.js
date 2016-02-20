$(document).ready(function(){
    // Imagen de usuario
	$('#usr_img').css("background-image", "url(desktop/shared/assets/img/user-image-example1.jpg)");
    $('#p_prof_img_usr').css("background-image", "url(desktop/shared/assets/img/user-image-example1.jpg)");
    
    
    $('#p_prof_img_cover_background').backgroundBlur({
	    imageURL : "desktop/shared/assets/img/user-image-example1.jpg",
	    blurAmount : 30,
	    imageClass : 'tinted-bg-blur'
	});

});