/*  Ajusta la barra principal según el tamaño de la ventana.
    Tamaño máximo: 1066px
    Tamaño mínimo: 280px
    */
$(document).ready(function(){

	function resizeBar() {
        var win_width = $(window).width();
        var name_width = $('#bar_user_name').width();

        if (win_width < 600) {
            $('#bar_tab_container').css("display", "none");
            $('#bar_tab_container_icon').css("display", "inline-block");
        } else {
            $('#bar_tab_container').css("display", "inline-block");
            $('#bar_tab_container_icon').css("display", "none");
        }

        if (win_width < 400) {
            $('#bar_logo').css("display", "none");
            $('#bar_logo_solo').css("display", "inline-block");

            $('#bar_tab_container_icon').css("margin-left", "62px");
        } else {
            $('#bar_logo').css("display", "inline-block");
            $('#bar_logo_solo').css("display", "none");

            $('#bar_tab_container_icon').css("margin-left", "178px");
        }

        if ((name_width >= (win_width - 410)) && (win_width < 1066)) {
            $('#bar_user_name').css("display", "none");
        } else {
            $('#bar_user_name').css("display", "inline-block");
        }

        if (win_width < 280) {

        	$('#user_menu').css("right", "30px");
            $('#user_menu_arrow').css("right", "28px");
            
            $('#bar_content').css("overflow-x", "auto");
            $('#bar_content').width(280);
            $('.bar_section_user').width(280);
            $('#bar_user_name_container').width(280);

            $('#bar_user_show').width(80);
            $('#bar_user_show').css("margin-left", "480px");

        } else if (win_width < 1066) {

        	$('#user_menu').css("right", "3px");
            $('#user_menu_arrow').css("right", "30px");

            $('#bar_content').width(win_width);
            $('.bar_section_user').width(win_width);
            $('#bar_user_name_container').width(win_width);


            if (name_width >= (win_width - 550)) {
                $('#bar_user_name').css("display", "none");
            } else {
                $('#bar_user_name').css("display", "inline-block");
            }

            if ($('#bar_user_show').width() == 80) {
                $('#bar_user_show').width(name_width + 80);
            }

            if ($('#bar_user_name').is(":visible")) {
                $('#bar_user_show').css("margin-left", (win_width - name_width - 80) + "px");
                
            } else {
                $('#bar_user_show').width(80);
                $('#bar_user_show').css("margin-left", (win_width - 80) + "px");
            }

        } else {
            var menu_right = (win_width - 1066)/2;

        	$('#user_menu').css("right", menu_right + "px");
            $('#user_menu_arrow').css("right", 30 + menu_right + "px");

            $('#bar_content').width(1066);
            $('.bar_section_user').width(1066);
            $('#bar_user_name_container').width(1066);

            //if ($('#bar_user_show').width() == 80) {
            //    $('#bar_user_show').width(name_width + 80);
            //}

            $('#bar_user_show').css("margin-left", (986 - name_width) + "px");

        }
    }
    
    resizeBar();
    $(window).resize(function() { resizeBar() });
});