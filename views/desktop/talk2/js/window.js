$(document).ready(function ()
{
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
            $("#remote-video")
                .css("width", "100%")
                .css("height", "auto")
                .css("left", "0px")
                .css("top", -dif_h / 2 + "px");  
        }
        else
        {
            var dif_w = (win_h * video_w) / video_h - win_w;
            
            $("#remote-video")
                .css("width", "auto")
                .css("height", "100%")
                .css("top", "0px")
                .css("left", -dif_w / 2 + "px");
        }
        
        return;
    }
    
    resizeVideo();
    $(window).resize(function() { resizeVideo() });
});