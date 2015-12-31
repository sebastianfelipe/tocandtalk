/* Función position_dialogs_det:
    *  Posiciona los diálogos en la pantalla.
    *  Parám.: Nada.
    *  Retorno: Null.
    */
function position_dialogs_det() {
    var win_w = $(window).width();
    var diag1 = 121;
    var diag2 = 179;
    
    if ( $("#load_screen").is(":visible") ) {
        diag1 += 32;
        diag2 += 32;
    }
    
    margin_dialog(diag1, win_w, "#b_dialog_mic_none", false);
    margin_dialog(diag2, win_w, "#b_dialog_video_none", false);
    
    return;
}

/* Función margin_dialog:
    *  Determina la posición de los diálogos de los botones.
    *  Parám.: ico_margin: (Int/Float) Margen del icono
    *          width_container: (Int/Float) Ancho del contenedor.
    *          id_dialog:  (String: "#<id>") ID del Div del diálogo.
    *          is_arrow:   (Boolean) True si se trata de la flecha
    *                      del globo de diálogo.
    *  Retono: Null.
    */
function margin_dialog(ico_margin, width_container, id_dialog, is_arrow) {	
    var m = ico_margin + (width_container - 311) / 2;
    var margin = 0;
    
    if (is_arrow) {
        margin = 31 + m;
            
    } else {
        var w = $(id_dialog).width();
        
        // (501-311)/2 = 95
        // 54/2 = 27
        margin = 27 + m - w / 2;
    }
        
    $(id_dialog).css("margin-left", margin + "px");
    return;
}
    
$(document).ready(function () {
        
    /* Función position_dialogs:
     *  Posiciona los diálogos en la pantalla.
     *  Parám.: Nada.
     *  Retorno: Null.
     */
    function position_dialogs() {
        var container_w = $("#b_dialog_container").width();
        
        margin_dialog(0, container_w, "#b_d_arrow_vol", true);
        margin_dialog(0, container_w, "#b_dialog_vol", false);
        
        margin_dialog(58, container_w, "#b_d_arrow_fullscr", true);
        margin_dialog(58, container_w, "#b_d_arrow_fullscr_exit", true);
        margin_dialog(58, container_w, "#b_dialog_fullscr", false);
        margin_dialog(58, container_w, "#b_dialog_fullscr_exit", false);
        
        margin_dialog(121, container_w, "#b_d_arrow_mic", true);
        margin_dialog(121, container_w, "#b_d_arrow_mic_off", true);
        margin_dialog(121, container_w, "#b_dialog_mic", false);
        margin_dialog(121, container_w, "#b_dialog_mic_off", false);
        
        margin_dialog(179, container_w, "#b_d_arrow_video", true);
        margin_dialog(179, container_w, "#b_d_arrow_video_off", true);
        margin_dialog(179, container_w, "#b_dialog_video", false);
        margin_dialog(179, container_w, "#b_dialog_video_off", false);
        
        margin_dialog(253, container_w, "#b_d_arrow_next", true);
        margin_dialog(253, container_w, "#b_dialog_next", false);
        
        return;
    }
    
    position_dialogs();
    position_dialogs_det();
    $(window).resize(function() { position_dialogs_det() });
    
    // Mostrar u ocultar diálogos
    
     $("#button_vol")
		.mouseenter(function() {
            if (!$("#volume_control").is(":visible")) {
                $("#b_d_arrow_vol").fadeIn(100);
                $("#b_dialog_vol").fadeIn(100);
            }
		})
		.mouseleave(function() {
            if (!$("#volume_control").is(":visible")) {
                $("#b_d_arrow_vol").fadeOut(160);
                $("#b_dialog_vol").fadeOut(160);
            }
	    });
    
    $("#b_icon_fullscr")
		.mouseenter(function() {
			$("#b_dialog_fullscr").fadeIn(100);
            $("#b_d_arrow_fullscr").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_fullscr").fadeOut(160);
            $("#b_d_arrow_fullscr").fadeOut(160);
	    });
    
    $("#b_icon_fullscr_exit")
		.mouseenter(function() {
			$("#b_dialog_fullscr_exit").fadeIn(100);
            $("#b_d_arrow_fullscr_exit").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_fullscr_exit").fadeOut(160);
            $("#b_d_arrow_fullscr_exit").fadeOut(160);
	    });
        
    $("#b_icon_mic")
		.mouseenter(function() {
			$("#b_dialog_mic").fadeIn(100);
            $("#b_d_arrow_mic").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_mic").fadeOut(160);
            $("#b_d_arrow_mic").fadeOut(160);
	    });
       
    $("#b_icon_mic_off")
		.mouseenter(function() {
			$("#b_dialog_mic_off").fadeIn(100);
            $("#b_d_arrow_mic_off").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_mic_off").fadeOut(160);
            $("#b_d_arrow_mic_off").fadeOut(160);
	    });
        
    $("#b_icon_mic")
		.mouseenter(function() {
			$("#b_dialog_mic").fadeIn(100);
            $("#b_d_arrow_mic").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_mic").fadeOut(160);
            $("#b_d_arrow_mic").fadeOut(160);
	    });
       
    $("#b_icon_mic_none")
		.mouseenter(function() {
			$("#b_dialog_mic_none").fadeIn(100);
            $("#b_d_arrow_mic").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_mic_none").fadeOut(160);
            $("#b_d_arrow_mic").fadeOut(160);
	    });

	$("#b_icon_video")
		.mouseenter(function() {
			$("#b_dialog_video").fadeIn(100);
            $("#b_d_arrow_video").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_video").fadeOut(160);
            $("#b_d_arrow_video").fadeOut(160);
	    });
        
    $("#b_icon_video_off")
		.mouseenter(function() {
			$("#b_dialog_video_off").fadeIn(100);
            $("#b_d_arrow_video_off").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_video_off").fadeOut(160);
            $("#b_d_arrow_video_off").fadeOut(160);
	    });
        
    $("#b_icon_video_none")
		.mouseenter(function() {
			$("#b_dialog_video_none").fadeIn(100);
            $("#b_d_arrow_video").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_video_none").fadeOut(160);
            $("#b_d_arrow_video").fadeOut(160);
	    });
    
	$("#search")
		.mouseenter(function() {
			$("#b_dialog_next").fadeIn(100);
            $("#b_d_arrow_next").fadeIn(100);
		})
		.mouseleave(function() {
			$("#b_dialog_next").fadeOut(160);
            $("#b_d_arrow_next").fadeOut(160);
	    });

});
