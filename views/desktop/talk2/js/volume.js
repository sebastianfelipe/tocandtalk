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
    
    margin_volume_ctr();
    $(window).resize(function() { margin_volume_ctr() });
    
    $(".vol_ctr").click(function() { 
	   $(".icon_volume_up").css("display", "none");
       $(".icon_volume_off").css("display", "inline-block");
	});
    
    $("#vol_ctr_off").click(function() { 
	   $(".icon_volume_off").css("display", "none");
       $(".icon_volume_up").css("display", "inline-block");
	});
    
});

$(document).click(function(event) {
    if($("#volume_control").is(":visible")) {
        if(($(event.target).index($("#volume_control")) == -1) && ($(event.target).parent().index($("#volume_control")) == -1) && ($(event.target).index($("#button_vol")) == -1)) {
            $("#volume_control").fadeOut(200);
            $("#b_d_arrow_vol").fadeOut(200);
        }
    }
});