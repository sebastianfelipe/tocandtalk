var ChatNotification = {
    contMsg: "0",
    
    show: function()
    {
        this.contMsg += 1;
        $("#chat_notification").css("display", "inline-block");
        $("#chat_notification").text(this.contMsg);
        
        var notif_w = $("#chat_notification").width();
        var notif_l = notif_w;
        
        if ( 10 - this.contMsg > 0 )
        {
            notif_l = 96 - notif_w;
        }
        else
        {
            notif_l = 96 + notif_w / 4 - notif_w; 
        } 
        
        $("#chat_notification").css("left", notif_l + "px");
        return;
    },
    
    hide: function()
    {
        this.contMsg = 0;
        $("#chat_notification").css("display", "none");
        $("#chat_notification").text(0);
        $("#chat_notification").css("left", "86px");
        return;
    },
    
    new_msg: function()
    {
        if ( $("#panel").css("display") == "none" || $("#panel_cont_chat").css("display") == "none" )
        {
            this.show();
        }
        else
        {
            this.hide();
        }
        return;
    }
}

/* Función chat_position:
 *   Mantiene el las burbujas de chat en la parte inferior del
 *   panel cuando la lista de burbujas no es "scrolleable".
 * Parám.: Nada.
 * Retorno: Null.
 */
function chat_position()
{
    if ( $(".p_msg_list").outerHeight() - $("#p_msg_container").height() >= 0 )
    {
        $("#p_msg_container").addClass("content_scroll_m");
        $(".p_msg_list").css("position", "relative");
        $(".content_scroll_m").mCustomScrollbar({ theme: "minimal" });    
    }
    else
    {
        $("#p_msg_container").removeClass("content_scroll_m");
        $(".p_msg_list").css("position", "absolute");
    }
    return;
}

/* Función chat_scroll_bottom:
 *   Hace un scroll en la ventana de chat
 *   hacia el final de la lista de mensajes.
 *   NOTA: Usar siempre al enviar mensajes.
 * Parám.: Nada.
 * Retorno: Null.
 */
function chat_scroll_bottom()
{
    $(".content_scroll_m").mCustomScrollbar("scrollTo","bottom",{ scrollEasing:"easeOut" });
    return;
}

/*
function chat_keep_scroll_bottom()
{
    var content_height = $(".p_msg_list").height();
    var position_scroll = $("#p_msg_container").scrollTop();
    
    if ( position_scroll - content_height * 0.75 >= 0 )
    {
        $(".content_scroll_m").mCustomScrollbar("scrollTo","bottom",{ scrollEasing:"easeOut" });
    }
    return;
}
*/

function chat_visible() {
    if ( $("#panel").is(":visible") && $("#panel_cont_chat").is(":visible") ) { return true; }
    return false;
}

function load_messages() {
    angular.element($('#TalkController')).scope().loadMessages();
    return;
}

$(window).load(function() {				
    $.mCustomScrollbar.defaults.scrollButtons.enable=false;
    $.mCustomScrollbar.defaults.axis="y";
    
    $("#p_prof_conteiner").mCustomScrollbar({ theme: "minimal" });
});