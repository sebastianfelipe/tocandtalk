$(document).ready(function ()
{
    /* Función resizeVideo:
     *  Reescala el vídeo remoto según el tamaño de la ventana.
     *  Parám.: Nada.
     *  Retorno: Null.
     */
    function resizeVideo()
    {
        var video_w = $("#remote-video").width();
        var video_h = $("#remote-video").height();
        var win_w = $(window).width();
        var win_h = $(window).height();
        
        // Alto del video al reescalar el video al ancho de la ventana
        var new_video_h = (win_w * video_h) / video_w;
        var dif_h = new_video_h - win_h;
        
        if (dif_h >= 0)
        {
            $("#remote-video").css({
                "width" : "100%",
                "height": "auto",
                "left"  : "0px",
                "top"   : -dif_h / 2 + "px"
            });  
        }
        else
        {
            var dif_w = (win_h * video_w) / video_h - win_w;
            
            $("#remote-video").css({
                "width" : "auto",
                "height": "100%",
                "top"   : "0px",
                "left"  : -dif_w / 2 + "px"
            });
        }
        
        return;
    }
    
    /* Función resizeWin:
     *  Reescala el contenido de la ventana según su tamaño.
     *  Parám.: Nada.
     *  Retorno: Null.
     */
    function resizeWin()
    {
        var win_w = $(window).width();
        var win_h = $(window).height();
        
        if (win_w <= 850)
        {
            $("#local-video").width(140);            
        }
        else
        {
            $("#local-video").width(220);
        }
        
        if (win_h <= 370 || win_w <= 550)
        {
            $("#buttons_container_below").css("position", "absolute");
            $("#video_s").css("position", "absolute");
            $("#load_screen").css("position", "absolute");
        }
        else
        {
            $("#buttons_container_below").css("position", "fixed");
            $("#video_s").css("position", "fixed");
            $("#load_screen").css("position", "fixed");
        }
        
        if (win_w <= 550)
        {
             $("#buttons_container_below").width(550);
             $("#buttons_container_above")
                .css("position", "absolute")
                .width(550);            
            $("#video_s").width(550);
            $("#local-video").css({
                "right": "auto",
                "left" : "400px"
            });
            $("#load_screen").width(550);
        }
        else
        {
            $("#buttons_container_below").css("width", "100%");
            $("#buttons_container_above").css({
                "width"   : "100%",
                "position": "fixed"
            });
            $("#video_s").css("width", "100%");  
            $("#local-video").css({
                "left" : "auto",
                "right": "10px"
            });
            $("#load_screen").css("width", "100%");        
        }
        
        if (win_h <= 370)
        {
            var marg_b_cont = 370 - 22 - $("#buttons_container_below").height();
            var marg_l_v = 370 - 12 - $("#local-video").height();
            $("#buttons_container_below").css({
                "bottom": "auto",
                "top"   : marg_b_cont + "px"
            });
            $("#panel")
                .height(175)
                .css("bottom", "auto");
            $("#panel_arrow").css({
                "bottom": "auto",
                "top"   : "260px"
            });
            $("#video_s")
                .height(370);
            $("#local-video").css({
                "bottom": "auto",
                "top"   : marg_l_v + "px"
            });
            $("#load_screen").height(370);
                
        }
        else
        {
            $("#buttons_container_below").css({
                "top"   : "auto",
                "bottom": "0px"
            });
            $("#panel").css({
                "height": "auto",
                "bottom": "110px"
            });
            $("#panel_arrow").css({
                "top"   : "auto",
                "bottom": "85px"
            });                
            $("#video_s").css("height", "100%");
            $("#local-video").css({
                "top"   : "auto",
                "bottom": "12px"
            });
            $("#load_screen").css("height", "100%");
        }
        
        return;
    }
    
    //resizeVideo();
    if ( $(window).width() <= 550 || $(window).height() <= 370 ) resizeWin();

    $(window).resize(function() {
        resizeVideo();
        resizeWin();
    });
});