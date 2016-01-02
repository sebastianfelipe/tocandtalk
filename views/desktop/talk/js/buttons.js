function successCallback(stream) {
    $("#b_icon_video_off").css("display", "none");
    $("#b_icon_video_none").css("display", "none");
    $("#b_icon_video").css("display", "inline-block");
}

$(document).ready(function () {
    function local_stream(action) {
        var e_video = true;
        var e_audio = true;
        if ( $("#b_icon_mic_off").is(":visible") ) e_audio = false;
        if ( $("#b_icon_video_off").is(":visible") ) e_video = false;
          
        navigator.mediaDevices = navigator.mediaDevices || ((navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia) ? {
        getUserMedia: function(c) {
            return new Promise(function(y, n) {
            (navigator.mozGetUserMedia ||
                navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
        } : null);
        
        var constraints = { audio: e_audio, video: e_video };
        
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                refs.localStream = stream;
                refs.localVideo.attr('src', window.URL.createObjectURL(stream));
                
                enable_buttons_media();
                
                if (action == 1) {
                    $("#b_icon_video_none").css("display", "none");
                    $("#b_icon_video_off").css("display", "none");
                    $("#b_icon_video").css("display", "inline-block");
                }
                
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            });
            
        return;
    }
    
    function detect_fullscreen() {
        if ( window.fullScreen || 
             document.mozFullscreenEnabled || 
             document.webkitIsFullScreen || 
             document.msFullscreenEnabled ) {
            
            $("#b_icon_fullscr").css("display", "none");
            $("#b_icon_fullscr_exit").css("display", "inline-block");
        } else {
            $("#b_icon_fullscr_exit").css("display", "none");
            $("#b_icon_fullscr").css("display", "inline-block");
        }
        return;
    }
    
    $("#b_icon_video").css("display", "none");
    $("#b_icon_video_off").css("display", "none");
    $("#b_icon_video_none").css("display", "inline-block");
    
    $("#b_icon_mic").css("display", "none");
    $("#b_icon_mic_off").css("display", "none");
    $("#b_icon_mic_none").css("display", "inline-block");
    
    detect_fullscreen();
    
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
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            $("#b_icon_fullscr").css("display", "none");
            $("#b_icon_fullscr_exit").css("display", "inline-block");
        }
	});
    
    // Salir de pantalla completa  
    $("#b_icon_fullscr_exit").click(function() { 
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        $("#b_icon_fullscr_exit").css("display", "none");
        $("#b_icon_fullscr").css("display", "inline-block");
	});
    
    $(window).resize(function() {  
        detect_fullscreen();
    });
    
    // Deshabilitar micrófono
    $("#b_icon_mic").click(function() {
        try {    
            //refs.localStream.getAudioTracks()[0].stop();
            if ( !!refs.localStream.getAudioTracks()[0].enabled ) {
                refs.localStream.getAudioTracks()[0].enabled = !refs.localStream.getAudioTracks()[0].enabled;
                
                $("#b_icon_mic_none").css("display", "none");
                $("#b_icon_mic").css("display", "none");
                $("#b_icon_mic_off").css("display", "inline-block");
            } else {
                $("#b_icon_mic_none").css("display", "none");
                $("#b_icon_mic_off").css("display", "none");
                $("#b_icon_mic").css("display", "inline-block");
            }
            
        } catch(err) {
            disable_buttons_media(true, false);
        }
	});
    
    // Habilitar micrófono
    $("#b_icon_mic_off").click(function() {
        try {
            //disable_buttons_media(true, false);
            //local_stream();
            if ( !refs.localStream.getAudioTracks()[0].enabled ) {
                refs.localStream.getAudioTracks()[0].enabled = !refs.localStream.getAudioTracks()[0].enabled;
                
                $("#b_icon_mic_none").css("display", "none");
                $("#b_icon_mic_off").css("display", "none");
                $("#b_icon_mic").css("display", "inline-block");
            } else {
                $("#b_icon_mic_none").css("display", "none");
                $("#b_icon_mic").css("display", "none");
                $("#b_icon_mic_off").css("display", "inline-block");
            }
            
        } catch(err) {
            disable_buttons_media(true, false);
        }
	});
    
    // Deshabilitar Webcam
    $("#b_icon_video").click(function() { 
        $("#b_icon_video").css("display", "none");
        $("#b_icon_video_none").css("display", "none");
        $("#b_icon_video_off").css("display", "inline-block");
        
        try {
            refs.localStream.getVideoTracks()[0].stop();
            //$("#local-video").fadeOut(200);
        } catch(err) {
            $("#b_icon_video_off").css("display", "none");
            $("#b_icon_video").css("display", "inline-block");
            //$("#local-video").css("display", "inline-block");
        }
    });
        
    // Habilitar Webcam
    $("#b_icon_video_off").click(function() {
        
        //$("#local-video").fadeIn(200);
        
        try {
            disable_buttons_media(false, true);
            local_stream(1);
            
        } catch(err) {
            $("#b_icon_video_none").css("display", "none");
            $("#b_icon_video").css("display", "none");
            $("#b_icon_video_off").css("display", "inline-block");
            //$("#local-video").css("display", "none");
        }
	});
    
    // Búsqueda de usuarios
    $("#search").click(function() {
        start_load();
	});
    
});