function chat_position() {
    if ( $("#p_msg_container").height() <= $(".p_msg_list").outerHeight() ) {
        $("#p_msg_container").addClass("content_scroll_m");
        $(".p_msg_list").css("position", "relative");
        $(".content_scroll_m").mCustomScrollbar({ theme: "minimal" });
        
    } else {
        $("#p_msg_container").removeClass("content_scroll_m");
        $(".p_msg_list").css("position", "absolute");
    }
    return;
}

function chat_bottom_scroll() {
    //var height = $(".p_msg_list").height();
    //$("#p_msg_container").animate({scrollTop: height});
    
    $("#p_msg_container").mCustomScrollbar("scrollTo","bottom",{
        scrollEasing:"easeOut"
    });
}

$(window).load(function() {				
    $.mCustomScrollbar.defaults.scrollButtons.enable=false;
    $.mCustomScrollbar.defaults.axis="y";
});