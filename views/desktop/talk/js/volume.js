var volume_value = 100;

function set_volume(value) {
    if (value > 100) { value = 100 }
    else if (value < 0) {value = 1}
    
    if (value == 0) {
        $(".icon_volume_off").css("display", "inline-block");
        
        $(".icon_volume_up").css("display", "none");
        $(".icon_volume_down").css("display", "none");
        $(".icon_volume_mute").css("display", "none");
         
    } else {
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
    
    function margin_volume_ctr() {
        var win_w = $(window).width();
        //var vol_contr_w = $("#volume_control").width();
        //var vol_arrow_w = $("#volume_arrow").width();
        
        var margin_vol = (win_w - 311) / 2;
        //var margin_arrow = (win_w - 311 - vol_arrow_w) / 2 + 37;
        
        $("#volume_control").css("left", margin_vol + "px");
        //$("#volume_arrow").css("margin-left", margin_arrow + "px");
        
        return;
    }

    function set_volume_slide(ui, slider, tooltip) {
        var value  = slider.slider('value');

        tooltip.text(ui.value);  //Adjust the tooltip accordingly
        set_volume(value);
    }
    
    function volume_slide() {

        //Store frequently elements in variables
        var slider  = $('#slider'),
            tooltip = $('.tooltip');

        //Hide the Tooltip at first
        //tooltip.hide();
        tooltip.text("100");

        //Call the Slider
        slider.slider({
            //Config
            range: "min",
            min: 1,
            value: 100,

            start: function(event,ui) {
                //tooltip.fadeIn('fast');
            },
            
            //Slider Event
            slide: function(event, ui) { //When the slider is sliding
                set_volume_slide(ui, slider, tooltip);
            },
            
            change: function(event, ui) { //When the slider is sliding
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