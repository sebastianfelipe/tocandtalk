/* Nota: La función start_load() muestra la pantalla
 * de búsqueda de usuarios y la función end_load() la quita.
 */
var World = {
    interval: null,
    start: function() {
        var interval = null;
        this.interval = interval;
        var counter = 0;
        var $world = $('#world');
        clearInterval(this.interval);
    
        this.interval = setInterval(function(){
            if (counter != -360) {
                counter -= 0.1;

                $world.css({
                    MozTransform: 'rotate(-' + -counter + 'deg)',
                    WebkitTransform: 'rotate(' + -counter + 'deg)',
                    transform: 'rotate(' + -counter + 'deg)'
                });
            }
        }, 10);
        return;
    },
    stop: function() {
        clearInterval(this.interval);
        return;
    }
}

var Point = {
    interval: null,
    start: function() {
        var interval = null;
        this.interval = interval;
        clearInterval(this.interval);
        
        var state = 0;
        var $point1 = $("#load_point1");
        var $point2 = $("#load_point2");
        var $point3 = $("#load_point3");
        
        this.interval = setInterval(function(){
            if (state == 0) {
                state = 1;
                $point1.css("color", "rgba(11,165,185,1)");
                $point2.css("color", "rgba(11,165,185,1)");
                $point3.css("color", "rgba(11,165,185,1)");

            } else if (state == 1) {
                state = 2;
                $point1.css("color", "rgba(244,244,244,1)");
                
            } else if (state == 2) {
                state = 3;
                $point2.css("color", "rgba(244,244,244,1)");
                
            } else {
                state = 0;
                $point3.css("color", "rgba(244,244,244,1)");
            }
        }, 300);
        return;
    },
    stop: function() {
        clearInterval(this.interval);
        console.log("Carga completada!");
        return;
    }
}

function position_content() {
    var win_h = $(window).height();
    var win_w = $(window).width();
    
    var margin_logo = win_h * 140 / 657;
    var margin_world = win_h - 220;
    
    $("#load_logo").css("margin-top", margin_logo + "px");
    
    if (win_w <= 1230) {
        $("#world").css("left", -(1230 - win_w)/2 + "px");
    } else {
        $("#world").css("left", "auto");
    }
    
    if (win_h <= 420) {
        $("#world_container")
            .css("position", "fixed")
            .css("margin-top", "200px");
    } else {
        $("#world_container")
            .css("position", "absolute")
            .css("margin-top", margin_world + "px");
    }
            
    return;
}

function show_control() {
    $("#buttons_container_below, #b_dialog_mic_none, #b_dialog_video_none")
        .css("z-index", "99");
    $("#usr_img").css("display", "none");
    $("#button_next").css("display", "none");
    
    //$(".button_none").css("display", "inline-block");
    
    $("#b_dialog_container").width( 501 - 323 + $("#buttons_ctr_cont").width() );
    
    $("#local-video").css("z-index", "93");
    
    position_dialogs_det();
    
    // $("#controls_bar").css("background", "rgba(11,164,185,0.45)");
    return;
}

function restore_control() {
    $("#buttons_container_below")
        .css("z-index", "80");
    $("#usr_img").css("display", "inline-block");
    $("#button_next").css("display", "inline-block");
    //$(".button_none").css("display", "none");
    
    $("#b_dialog_container").width(501);
    $("#local-video").css("z-index", "10");
    
    position_dialogs_det();
    return;
}

function start_load() {
    ChatNotification.hide();
    
    if ( !$("#load_screen").is(":visible") ) $("#load_screen").fadeIn(150);
    
    World.start();
    Point.start();
    
    show_control();
    return;
}

function end_load() {
    restore_control();
    ChatNotification.hide();
    
    $("#load_screen").fadeOut(150);
    
    World.stop();
    Point.stop();
    
    return;
}

function enable_buttons_media() {
    if ( !!refs.localStream.getVideoTracks()[0].enabled ) {
        $("#b_icon_video_off").css("display", "none");
        $("#b_icon_video_none").css("display", "none");
        $("#b_icon_video").css("display", "inline-block");
    } else {
        $("#b_icon_video_none").css("display", "inline-block");
        $("#b_icon_video_off").css("display", "none");
        $("#b_icon_video").css("display", "none");
    }

    if ( !!refs.localStream.getAudioTracks()[0].enabled ) {
        $("#b_icon_mic_off").css("display", "none");
        $("#b_icon_mic_none").css("display", "none");
        $("#b_icon_mic").css("display", "inline-block");
    } else {
        $("#b_icon_mic_none").css("display", "inline-block");
        $("#b_icon_mic_off").css("display", "none");
        $("#b_icon_mic").css("display", "none");
    }
    
    return;
}

function disable_buttons_media(video, audio) {
    if (!video) {
        $("#b_icon_video_none").css("display", "inline-block");
        $("#b_icon_video_off").css("display", "none");
        $("#b_icon_video").css("display", "none");
    }
    if (!audio) {    
        $("#b_icon_mic_none").css("display", "inline-block");
        $("#b_icon_mic_off").css("display", "none");
        $("#b_icon_mic").css("display", "none");
    }
    return;
}