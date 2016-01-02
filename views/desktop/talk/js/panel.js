$(document).ready(function(){
    
    // Mostrar u ocultar panel
    $("#usr_img").click(function() {
        if ($("#panel").is(":visible")) {
            $("#panel").fadeOut(160);
            $("#panel_arrow").fadeOut(160);
        } else {
            $("#panel").fadeIn(150);
            $("#panel_arrow").fadeIn(150);
            
            if ($("#panel_cont_chat").is(":visible")) ChatNotification.hide();
            load_messages();
            chat_scroll_bottom();
        }
	});
    
    // Determina el contenido activo en el panel.
    var TabStatus = {
        tab_msg: null,
        
        init: function() {
            this.tab_msg = true;
        },
        
        // Cambiar a pestaña de Chat
        set_tab_msg: function() {
            this.tab_msg = true;
        },
        
        // Cambiar a pestaña de Perfil
        set_tab_prof: function() {
            this.tab_msg = false;
        },
        
        // Retorna True si la pestaña
        // de Chat está activa
        is_tab_msg: function() {
            return this.tab_msg;
        },
        
        // Retorna True si la pestaña
        // de Perfil está activa
        is_tab_prof: function() {
            return !this.tab_msg;
        }
    }
    
    TabStatus.init();
    
    // Mostrar chat
    $("#p_tab_msg").click(function() {
        if (TabStatus.is_tab_prof()) {
            TabStatus.set_tab_msg();
            
            $("#p_tab_msg_sel").css("display", "inline-block");
            $("#p_tab_prof_sel").fadeOut(200);
            
            $("#p_tab_prof").css("cursor", "pointer");
            $("#p_tab_msg").css("cursor", "default");
            
            $("#panel_cont_chat").fadeIn(70);
            $("#panel_cont_profile").fadeOut(70);
            
            ChatNotification.hide();
            load_messages();
            chat_scroll_bottom();
        }
        
    });
    
    // Mostrar el perfil de usuario
    $("#p_tab_prof").click(function() {
        if (TabStatus.is_tab_msg()) {
            TabStatus.set_tab_prof();
            
            $("#p_tab_msg_sel").fadeOut(200);
            $("#p_tab_prof_sel").css("display", "inline-block");
            
            $("#p_tab_prof").css("cursor", "default");
            $("#p_tab_msg").css("cursor", "pointer");
            
            $("#panel_cont_profile").fadeIn(70);
            $("#panel_cont_chat").fadeOut(70);
        }
        
    });
    
    // Tabs:
    $("#p_tab_prof")
        .mouseenter(function() {
            if (TabStatus.is_tab_msg()) {
			     $("#p_tab_prof_sel").fadeIn(250);
            }
		})
		.mouseleave(function() {
            if (TabStatus.is_tab_msg()) {
			     $("#p_tab_prof_sel").fadeOut(300);
            }
	});
    
    $("#p_tab_msg")
        .mouseenter(function() {
            if (TabStatus.is_tab_prof()) {
			     $("#p_tab_msg_sel").fadeIn(250);
            }
		})
		.mouseleave(function() {
            if (TabStatus.is_tab_prof()) {
			     $("#p_tab_msg_sel").fadeOut(300);
            }
	});

});