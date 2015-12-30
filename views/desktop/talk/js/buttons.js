$(document).ready(function () {
    
    // Volumen
    $("#button_vol").click(function() {
        if (!$("#volume_control").is(":visible")) {
            $("#b_dialog_vol").css("display", "none");
            $("#volume_control").css("display", "inline-block");
            $("#b_d_arrow_vol").css("display", "inline-block");
        } else {
            $("#b_dialog_vol").css("display", "none");
            $("#volume_control").fadeOut(200);
            $("#b_d_arrow_vol").fadeOut(200);
        }
	});
    
    // Activar pantalla completa
    $("#b_icon_fullscr").click(function() { 
	   $("#b_icon_fullscr").css("display", "none");
       $("#b_icon_fullscr_exit").css("display", "inline-block");
	});
    
    // Salir de pantalla completa  
    $("#b_icon_fullscr_exit").click(function() { 
	   $("#b_icon_fullscr_exit").css("display", "none");
       $("#b_icon_fullscr").css("display", "inline-block");
	});
    
    // Habilitar micrófono
    $("#b_icon_mic").click(function() { 
	   $("#b_icon_mic").css("display", "none");
       $("#b_icon_mic_off").css("display", "inline-block");
	});
    
    // Deshabiitar micrófono
    $("#b_icon_mic_off").click(function() { 
	   $("#b_icon_mic_off").css("display", "none");
       $("#b_icon_mic").css("display", "inline-block");
	});
    
    // Habilitar Webcam
    $("#b_icon_video").click(function() { 
	   $("#b_icon_video").css("display", "none");
       $("#b_icon_video_off").css("display", "inline-block");
	});
    
    // Deshabilitar Webcam
    $("#b_icon_video_off").click(function() { 
	   $("#b_icon_video_off").css("display", "none");
       $("#b_icon_video").css("display", "inline-block");
	});
    
    // Búsqueda de usuarios
    $("#search").click(function() { 
	   start_load();
	});
    
});