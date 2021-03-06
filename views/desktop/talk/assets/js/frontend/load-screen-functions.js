// Nota: La función start_load() muestra la pantalla
// de búsqueda de usuarios y la función end_load() la quita.

// Mundo giratorio
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

// Puntos de carga
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

/* Función position_content:
 *   Modifica la posición de los elementos en la pantalla de carga.
 * Retorno: Null.
 */
function position_content() {
    var win_h = $(window).height();
    var win_w = $(window).width();
    
    var margin_logo = win_h * 140 / 657;
    var margin_world = win_h - 220;
    
    $("#load_logo").css("margin-top", margin_logo + "px");
    
    if (win_w <= 1230) {
        $("#world").css("left", -(1230 - win_w)/2 + "px");
    }
    else {
        $("#world").css("left", "auto");
    }
    
    if (win_h <= 420) {
        $("#world_container")
            .css("position", "fixed")
            .css("margin-top", "200px");
    }
    else {
        $("#world_container")
            .css("position", "absolute")
            .css("margin-top", margin_world + "px");
    }   
    return;
}

/* Función show_control:
 *   Muestra el control en la pantalla de carga.
 * Retorno: Null.
 */
function show_control() {
    $("#buttons_container_below, #b_dialog_mic_none, #b_dialog_video_none")
        .css("z-index", "99");
    $("#usr_img").css("display", "none");
    $("#button_next").css("display", "none");
    $("#b_dialog_container").width( 501 - 323 + $("#buttons_ctr_cont").width() );
    $("#local-video").css("z-index", "93");
    
    position_dialogs_det();
    return;
}

/* Función restore_control:
 *   Restaura el control al quitar la pantalla de carga.
 * Retorno: Null.
 */
function restore_control() {
    $("#buttons_container_below")
        .css("z-index", "80");
    $("#usr_img").css("display", "inline-block");
    $("#button_next").css("display", "inline-block");
    $("#b_dialog_container").width(501);
    $("#local-video").css("z-index", "10");
    
    position_dialogs_det();
    return;
}

/* Función start_load:
 *   Muestra la pantalla de carga.
 * Retorno: Null.
 */
function start_load() {
    ChatNotification.hide();
    
    if ( !$("#load_screen").is(":visible") ) $("#load_screen").fadeIn(150);
    
    World.start();
    Point.start();
    
    show_control();
    return;
}

/* Función end_load:
 *   Quita la pantalla de carga.
 * Retorno: Null.
 */
function end_load() {
    restore_control();
    ChatNotification.hide();
    
    $("#load_screen").fadeOut(150);
    
    World.stop();
    Point.stop();
    
    return;
}

/* Función enable_buttons_media:
 *   Activa el control de cámara o micrófono si éstos están disponible.
 * Retorno: Null.
 */
function enable_buttons_media() {
    if (refs.conn.localStream)
    {
        if (refs.conn.localStream.getVideoTracks)
        {
            if ( refs.conn.localStream.getVideoTracks()[0].enabled ) {
                $("#b_icon_video_off").css("display", "none");
                $("#b_icon_video_none").css("display", "none");
                $("#b_icon_video").css("display", "inline-block");
            }
            else {
                $("#b_icon_video_none").css("display", "inline-block");
                $("#b_icon_video_off").css("display", "none");
                $("#b_icon_video").css("display", "none");
            }
        }

        if (refs.conn.localStream.getAudioTracks)
        {
            if ( refs.conn.localStream.getAudioTracks()[0].enabled ) {
                $("#b_icon_mic_off").css("display", "none");
                $("#b_icon_mic_none").css("display", "none");
                $("#b_icon_mic").css("display", "inline-block");
            }
            else {
                $("#b_icon_mic_none").css("display", "inline-block");
                $("#b_icon_mic_off").css("display", "none");
                $("#b_icon_mic").css("display", "none");
            }
        }
    }
    
    return;
}

/* Función disable_buttons_media:
 *   Desactiva el control de cámara o micrófono.
 * Parám.: video: (Boolean) True si la cámara está disponible, false para desactivar control.
 *         audio: (Boolean) True si el micrófono está disponible, false para desactivar control.
 * Retorno: Null.
 */
//function disable_buttons_media(video, audio) {
function disable_buttons_media() {
    if (refs.conn.localStream)
    {
        if (refs.conn.localStream.getVideoTracks)
        {
            if (!refs.conn.localStream.getVideoTracks()[0].enabled) {
                $("#b_icon_video_none").css("display", "inline-block");
                $("#b_icon_video_off").css("display", "none");
                $("#b_icon_video").css("display", "none");
            }
        }

        if (refs.conn.localStream.getAudioTracks)
        {
            if (!refs.conn.localStream.getAudioTracks()[0].enabled) {    
                $("#b_icon_mic_none").css("display", "inline-block");
                $("#b_icon_mic_off").css("display", "none");
                $("#b_icon_mic").css("display", "none");
            }
        }
    }

    return;
}

function panel_profile_cover(name) {
    var h = height_text(name, '16px FiraSansLight', 214);
    var h_base = 128;
    
    $("#p_prof_img_cover_background").height(h_base + h);
    $("#p_prof_img_cover_black").height(h_base + h);
    $("#p_prof_img_cover").height(h_base - 20 + h);
    
    return;
}