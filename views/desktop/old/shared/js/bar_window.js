/*  Ajusta la barra principal según el tamaño de la ventana.
    Tamaño máximo: 1066px
    Tamaño mínimo: 280px
    */
$(document).ready(function(){

	function resizeBar() {
        var win_width = $(window).width();
        var name_width = $('#bar-user-name').width();

        if (win_width < 600) {
            $('#bar-tab-container').css("display", "none");
            $('#bar-tab-container-icon').css("display", "inline-block");
        } else {
            $('#bar-tab-container').css("display", "inline-block");
            $('#bar-tab-container-icon').css("display", "none");
        }

        if (win_width < 400) {
            $('#bar-logo').css("display", "none");
            $('#bar-logo-solo').css("display", "inline-block");

            $('#bar-tab-container-icon').css("margin-left", "62px");
        } else {
            $('#bar-logo').css("display", "inline-block");
            $('#bar-logo-solo').css("display", "none");

            $('#bar-tab-container-icon').css("margin-left", "178px");
        }

        if ((name_width >= (win_width - 410)) && (win_width < 1066)) {
            $('#bar-user-name').css("display", "none");
        } else {
            $('#bar-user-name').css("display", "inline-block");
        }

        if (win_width < 280) {

        	$('#user-menu').css("right", "30px");
            $('#user-menu-arrow').css("right", "28px");
            
            $('#bar-content')
                .css("overflow-x", "auto")
                .width(280);

            $('.bar-section-user').width(280);
            $('#bar-user-name-container').width(280);

            $('#bar-user-show')
                .width(80)
                .css("margin-left", "480px");

        } else if (win_width < 1066) {

        	$('#user-menu').css("right", "3px");
            $('#user-menu-arrow').css("right", "30px");

            $('#bar-content').width(win_width);
            $('.bar-section-user').width(win_width);
            $('#bar-user-name-container').width(win_width);

            if (name_width >= (win_width - 550)) {
                $('#bar-user-name').css("display", "none");
            } else {
                $('#bar-user-name').css("display", "inline-block");
            }

            if ($('#bar-user-show').width() == 80) {
                $('#bar-user-show').width(name_width + 80);
            }

            if ($('#bar-user-name').is(":visible")) {
                $('#bar-user-show').css("margin-left", (win_width - name_width - 80) + "px");
                
            } else {
                $('#bar-user-show')
                    .width(80)
                    .css("margin-left", (win_width - 80) + "px");
            }

        } else {
            var menu_right = (win_width - 1066)/2;

        	$('#user-menu').css("right", menu_right + "px");
            $('#user-menu-arrow').css("right", 30 + menu_right + "px");

            $('#bar-content').width(1066);
            $('.bar-section-user').width(1066);
            $('#bar-user-name-container').width(1066);

            //if ($('#bar-user-show').width() == 80) {
            //    $('#bar-user-show').width(name_width + 80);
            //}

            $('#bar-user-show').css("margin-left", (986 - name_width) + "px");

        }
    }
    
    resizeBar();
    $(window).resize(function() { resizeBar() });
});