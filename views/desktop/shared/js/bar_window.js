$(document).ready(function(){

	function resizeBar() {
        var win_width = $(window).width();
        var name_width = $('#bar_user_name').width();

        if (win_width < 560) {
        	$('#user_menu').css("right", "3px");
            
            $('#bar_content').css("overflow-x", "auto");
            $('#bar_content').width(560);
            $('.bar_section_user').width(560);
            $('#bar_user_name_container').width(560);

            if (name_width >= (win_width - 550)) {
                $('#bar_user_name').css("display", "none");
            } else {
                $('#bar_user_name').css("display", "inline-block");
            }

            $('#bar_user_show').width(80);
            $('#bar_user_show').css("margin-left", "480px");


        } else if (win_width < 1066) {
        	$('#user_menu').css("right", "3px");

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

            $('#bar_content').width(1066);
            $('.bar_section_user').width(1066);
            $('#bar_user_name_container').width(1066);

            $('#bar_user_name').css("display", "inline-block");

            if ($('#bar_user_show').width() == 80) {
                $('#bar_user_show').width(name_width + 80);
            }

            $('#bar_user_show').css("margin-left", (986 - name_width) + "px");

        }
    }

   
    resizeBar();
    $(window).resize(function() { resizeBar() });
});