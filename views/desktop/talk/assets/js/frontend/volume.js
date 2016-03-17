var volume_value = 100;

/* Función set_volume:
 *   Define el volumen del vídeo remoto y el ícono de volumen.
 * Parám.: value: (Int) Valor del volumen. Mínimo 1 y máximo 100.
 *                El valor 0 activa el mute.
 * Retorno: Null
 */
function set_volume(value) {
    if (value > 100) { value = 100 }
    else if (value < 0) {value = 0}
    
    if (value == 0) {
        // Mute
        $(".icon_volume_off").css("display", "inline-block");
        $(".icon_volume_up").css("display", "none");
        $(".icon_volume_down").css("display", "none");
        $(".icon_volume_mute").css("display", "none");     
    }
    else {
        volume_value = value;
        
        $(".icon_volume_off").css("display", "none");
        
        if (value <= 20) { 
            $(".icon_volume_up").css("display", "none");
            $(".icon_volume_down").css("display", "none");
            $(".icon_volume_mute").css("display", "inline-block");
        } 
        else if (value <= 65) {
            $(".icon_volume_up").css("display", "none");
            $(".icon_volume_down").css("display", "inline-block");
            $(".icon_volume_mute").css("display", "none");
        }
        else {
            $(".icon_volume_up").css("display", "inline-block");
            $(".icon_volume_down").css("display", "none");
            $(".icon_volume_mute").css("display", "none");
        }
    }
    
    var video = document.getElementById("remote-video");
    video.volume = value / 100;
    return;
}

$(document).ready(function () {
    
    /* Función margin_volume_ctr:
     *   Determina la posición del control del volumen en la pantalla.
     * Parám.: Nada
     * Retorno: Null
     */
    function margin_volume_ctr() {
        var win_w = $(window).width();
        var margin_vol = (win_w - 311) / 2;
        $("#volume_control").css("left", margin_vol + "px");
        return;
    }
    
    /* Función set_volume_slide:
     *   Determina el valor volumen en el slide.
     */
    function set_volume_slide(ui, slider, tooltip) {
        var value  = slider.slider('value');

        tooltip.text(ui.value); // Muestra valor del volumen en el tooltip
        set_volume(value);
    }
    
    /* Función volume_slide:
     *   Muestra el slider de volumen.
     */
    function volume_slide() {
        var slider  = $('#slider'),
            tooltip = $('.tooltip');

        tooltip.text("100");

        // Llamar al slider
        slider.slider({
            range: "min",
            min: 0,
            value: 100,

            start: function(event,ui) {
                // tooltip.fadeIn('fast');
            },
            
            // Cuando el slider es deslizado
            slide: function(event, ui) {
                set_volume_slide(ui, slider, tooltip);
            },
            
            // Cuando se modifica el slider sin deslizar
            change: function(event, ui) {
                set_volume_slide(ui, slider, tooltip);
            },

            stop: function(event,ui) {
                //tooltip.fadeOut('fast');
            },
        });
    }
    
    margin_volume_ctr();
    $(window).resize(function() { margin_volume_ctr() });
    
    volume_slide();
    
    set_volume(100);
    
    // Activar Mute
    $(".vol_ctr").click(function() { 
	   $(".icon_volume_up").css("display", "none");
       $(".icon_volume_off").css("display", "inline-block");
       set_volume(0);
	});
    
    // Desactivar Mute
    $("#vol_ctr_off").click(function() { 
	   $(".icon_volume_off").css("display", "none");
       $(".icon_volume_up").css("display", "inline-block");
       set_volume(volume_value);
	});
    
});

$(document).click(function(event) {
    if($("#volume_control").is(":visible")) {
        if(($(event.target).index($("#slider")) == -1) && ($(event.target).index($("#volume_control")) == -1) && ($(event.target).parent().index($("#volume_control")) == -1) && ($(event.target).index($("#button_vol")) == -1)) {
            $("#volume_control").fadeOut(200);
            $("#b_d_arrow_vol").fadeOut(200);
        }
    }
});