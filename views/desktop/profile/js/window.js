/*  Ajusta la barra principal según el tamaño de la ventana.
    Tamaño máximo: 1066px
    */
$(document).ready(function() {

	function resizeContent() {
        var win_width = $(window).width();

        if (win_width < 1066) {

            var h_section1 = $('#profile_section1').height();

            $('#profile_section2').css("margin-left", "0px");
            $('#profile_section2').css("margin-top", h_section1 + "px");
            $('#profile_content').width(530);

        } else {

            $('#profile_section2').css("margin-left", "536px");
            $('#profile_section2').css("margin-top", "0px");
            $('#profile_content').width(1066);
        }  
    }
    
    resizeContent();
    $(window).resize(function() { resizeContent() });
        
});